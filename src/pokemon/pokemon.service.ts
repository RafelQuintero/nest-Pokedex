import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'; //Decorador que indica que esta clase puede ser intectada como servicio
// en otors partes de la aplicacion.
import { isValidObjectId, Model } from 'mongoose'; //Es La clase de mongoose que representa un modelo de la base de datos, te dá métodos
// como: (find,save,findById.etc.).
import { CreatePokemonDto } from './dto/create-pokemon.dto'; //Clase con validaciones para la data que se recibe desde el cliente.
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity'; //Nuetra clase/esquema definida previamente.
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  //? Marca la clase como proveedor (provider), para que NestJS pueda crear una instancia de ella
  // ?y usarla en cualquier lugar donde se requiera.
  //?Haciendo  una Inyeccion de depemdencia en el constroctor para poder
  // ? inicalizarlo que cualquier parte por lo que se hace por medio del constructor.

  constructor(
    //?InjectModel(Pokemon.name):  Inyecta el modelo de Mongoose para la colección pokemons.

    @InjectModel(Pokemon.name) //*el argumeto es el nombre "name" del pokemon que queremos crear.
    private readonly pokemonModel: Model<Pokemon>, //pokemonModel es nuetra variable que permite interactuar con DB // Hace que no se pueda reasignar la referncia al modelo.("es única")
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    //
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase(); //?estoy diciendole
    //?que el nomnre sea siempre en minuscúla siempre y cuamdo no sea readonly ("sea Unico")
    // ? y lo guarda de nuevo,

    //utlizaremos el "cratePokemonDto" para insertarlo en la base de estado ya questo es
    // el body  del pokemon que se quire  grabar en la base de datos "DB".
    //? Hagamos lun try catch para manejar el error si tarta de registrar un pokemon que ya existe.
    try {
      //* Ingresemos informacion en DB.
      const pokemon = await this.pokemonModel.create(createPokemonDto); //el parametro de create es el createPokemonDto, que es el body
      return pokemon; //que es el DTO que se mando en el body//createPokemonDto;

      //TODO:? Tambien podemos utilizar las siguiente 2 intrucciones,sutituyendo lineas 35 y 36
      // TODO:? para  crer y guardar un nuevo pokemon.
      //TODO:?  const pokemon = new this.pokemonModel(createPkemonDto);
      //TODO:? return pokemon.save();

      //'This action adds a new pokemon';
    } catch (error) {
      this.handExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    //*Aqui queremos hacer paginaciones pra ver los registro si son muchos
    const { limit = 10, offset = 0 } = paginationDto; //?si no se especifica en query
    // ?estos son lo valres por defecto
    const thePokmens = await this.pokemonModel
      .find()
      .limit(limit) //? Me indica cuantos elementos va mostrar
      .skip(offset) //?Me inidca desde que elemento ("(offset+1")) va mostrar ("limit").
      .sort({
        //?los pokwmon seran ordenado por el número empezando por en numero 1, 2 ,3 ....
        no: 1,
      })
      .select('-__v'); //* eliminamos esto codigo que me genera mongoDB

    console.log({ thePokmens: thePokmens });
    if (thePokmens.length === 0) {
      throw new BadRequestException(`Do not Pokemons in DB`);
    }

    return thePokmens; //`This action returns all pokemon`;
  }

  //*
  async findOne(term: string) {
    //? term se refiere la númer que le corresponde de el pokemon, ma no es el id
    let pokemon: Pokemon | null = null; //* Le indico que pue ser null pokemon para evadir el error de typescript
    //* que me está diciendo que pokmeon puede que no exista ("undefine") en la DB.

    //? Verificamos que el "term" que viene del url  es  el nro. ("no"), que le corresponde al pokemon
    if (!isNaN(+term)) {
      //? La instruccion "isNaN(+term)" el +term se convirtio al ,
      //? al agregarle  isNaN(+term) l convierto a un string , al hacer la negacion !isNaN(+term) digo
      //? digo que es un número. .Resumiendo: se esto  !isNaN(+term) es un número haz algo.
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    //?chequemos si es el id de mongo del pokemon y si noconsigui un pokemon :Resumen: el term es el id mongodb del
    //?que es el que se envio el la api de la url
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    //* Busquemoslo por nombre del pokemon si es que no se a encontrado.
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
      //?Aclaratoria: Si en  url que se mandaa; el  termino "term" se refiere al nombre del pokemn, tolocaleLowerCase()
      // ?es que todo el nombre est{e escrito en minúscula. y
      // ?.trim() le indicqo que me elimine estapcios atras y adeknte de nombre de okemon
    }
    //*Verificamos que el pokemon no exista en DB de mongo
    if (!pokemon) {
      throw new BadRequestException(
        `Pokemon con el identificador "${term}" no fue encontrado en DB de mongo`,
      );
    }

    return pokemon; //`This action returns a #${term} pokemon`; //pokemon; ;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    //* Utilizo el  findOme() que  ya está creado para locaizar un pokemon ,
    //* este chequerá; si es un nro ,o un  id de mongo o si es un nombre
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name)
      //?Pregunto si viene el nombre  para la actualiacion

      updatePokemonDto.name = updatePokemonDto.name.toLowerCase(); //* Comvierta el nombre en minuscula
    // *y vuevalo a guardar en la actualizacion,}

    try {
      //?Ahora guardemos  el pokemon con los nuevos datos "updatePokemonDto" en la DB

      await pokemon.updateOne(updatePokemonDto);
      //* Para poder mostrar la acualizacion : exparso el pokemon como un objeto (...pohemom.JSON),
      // *luego exparso la informacon que se quiere actualizar (...updatPokemon)
      // * y este ultimos se sobreescribe en el primero
      return { ...pokemon.toJSON(), ...updatePokemonDto };
      // `This action updates a #${term} pokemon`;
    } catch (error) {
      //?Mostramos el error de código que es: 1000
      //? y el nro  "no" que ya existe :con error.keyvalue.
      this.handExceptions(error);
    }
  }

  async remove(id: string) {
    //se comento para hacer un  CuostenPiper
    // //? Uitlicemos un metodo findOne()que esta dentro de esta clase, el cual el me cheque si es
    // // ?  un "no",o es un "name", o si es el "id2 de mongo" para hallar el pokemon que queremos remover  .
    // //*haremos  comentario a las lineas 125 al 131 y en rturn colocaremos el id
    // const pokemon = await this.findOne(id);

    // try {
    //   await pokemon.deleteOne();
    // } catch (error) {
    //   this.handExceptions(error);
    // }
    //* const result = await this.pokemonModel.findByIdAndDelete(id);

    //*Quiero  tambien validar el id si existe en la base de datos de mongodb. pero con una sola consulata a esta DB.

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id }); //?com esta intrucción estoy haciendo una sola consulta.
    if (deletedCount === 0) {
      //* cuando deletedCount === 0 sabemos que no se elimino nigun registro por lo el id no exite en DB.
      throw new BadRequestException(`pokemon whit id: "${id}" not exit in DB`);
    }

    return `This action removes a #${id} pokemon`;
  }

  //?Crearemos n método para manejara los errore en todos  "cath", asi me queda mas limpio el código

  private handExceptions(error: any) {
    console.log(error);
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon  not exists in DB ${JSON.stringify(error.keyValue)}`,
      );
    }

    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon-Ckeck server logs`,
    );
  }
}
function limit(arg0: number) {
  throw new Error('Function not implemented.');
}
