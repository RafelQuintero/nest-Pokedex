import { Injectable } from '@nestjs/common';
//import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  //*Borramos todos y creamos un  nuevo método

  //* Inyectamos en el constructor el model de pokemon para poder utilzarlo por mediode una instancia.
  constructor(
    //*aqui hacmeos la inyeccion dl modelo vamos que lo tememos que tomar de pokemon.service.ts

    @InjectModel(Pokemon.name) //*el argumeto es el nombre "name" del pokemon que queremos crear.
    private readonly pokemonModel: Model<Pokemon>, //pokemonModel es nuetra variable que permite interactuar con DB
    // Hace que no se pueda reasignar la referncia al modelo.("es única").

    //¡ inyectemos el AxiosAdapte  en el constructor para instanciarlo/otulizarlo
    private readonly Http: AxiosAdapter,
  ) {}

  //?3.- Instalemeo axios en nuestro servicio. debe ser claramente visible en declararlo como:

  //TODO: Supimo la line 24 con un comentario y la coloco en el archivo:" axios.adapte.ts"
  // private readonly axios: AxiosInstance = axios; //?Con esto estamos diciendo
  // ? que es una instancia de axios, me esta diciendo que es una dependencia de mi servicio axios
  //? ahora podemos utilizar el this para utilizarlo.

  async executeSeed() {
    //console.log(fetch); //*1.-  Como esta informacion me aparece en la terminal me idica que a version de node es >=18
    //*indicando que puedo hacepeticones "fech"

    //todo:  codigo para borrar la base de de datos
    // todo: cada vez que se inicia par eliminar error de insercion;recuerde agrera await ya que va a DB
    await this.pokemonModel.deleteMany();

    //?2.- Vamos HAcer unata peticion  http paero sin utikzar fech,
    // ? utilizando  la librería de axios, cargemoslo en la terminal
    //? yarn add axios para instalarlo
    //? obteno la respuesta(resp) ; de esa respuesta me interesa sacar la data
    //todo. Puedo cambar el codigo 43-44 que sera comentado,
    // todo: Nota; tomo la data directamente porque prviamente la desectructure en  l clase AxiosAapter.
    const data = await this.Http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
      // const { data } = await this.axios.get<PokeResponse>(
      //   'https://pokeapi.co/api/v2/pokemon?limit=10', //? Es el backen que es
      // ?el que está haciendo la peticion  al poleapi.co para trersela al cliente.
      //? para construir mi semilla(SEED). Registros en la base de datos.
      //?Cambiemo la cantidad 650  a obtener por uno solo
    );
    //todo: voy hacer incersiones multiple de polemos en DB
    //todo, Creamos un arreglo para colcoar las multiples inserciones nuevas
    //todo: llamdo pokemonToInsert
    //? creo un arreglo para hacerla insercio,luciendo del la manera {name:string, no:number} y es un arreglo []
    const pokemonToInsert: { name: string; no: number }[] = [];
    //todo ______

    //? Previamente quiero hacer el tipado de datos que obtengo pokeapi.co
    //? Esto se hace creando una interface con su respectivo folder y achivo.
    //? Que estará dentro de el folder "seed"

    //?Quiero extraer el nro. "no" del pokemon, pero este esta dentro de un  url : por ejemplo: (linea 29)
    //?  "name": "bulbasaur",
    //?   "url": "https://pokeapi.co/api/v2/pokemon/1/"

    //?procedimiento para extraer el "no" del url:

    data.results.forEach(async ({ name, url }) => {
      //? Le digo a metodo forEach()   por medio de una funcion
      // ? flecha que me de la data, pero en vez de pedir la data , desectructuro
      // ? y que me  recorra cada uno de  del name y url
      // ?  Le digo que me los muestre en consola el name y la url de la data, desectructurada.
      console.log({ name, url });

      //? Ahora  podemos obtenwe el nro "no" del porkemon a partir de lo anterior expuesto,

      const segment = url.split('/');
      //?cortemos por segemtos la informacion https del pokemon:
      // ? https://pokeapi.co/api/v2/pokemon?limit=1

      console.log(segment); //? qui estoy mostrando por consola
      // ?la url segmentada (separada depues de cada /).

      const no: number = +segment[segment.length - 2]; //* despues del = lo que obtengo de la url es un string
      //*deb combertirlo el un numero clocado un + despues del = en la lina 55,

      //! Insertando los 10 pokemon en la base de datos
      // const pokemon = await this.pokemonModel.create({ name, no }); //?el parametro de create
      // ? es lo que vamso a insertar que sera; (mane, no)
      //? y no el createPokemonDto, que es el body, que está en otro mudulo por eso sale error.
      pokemonToInsert.push({ name, no });
      // console.log({ name, no }); //?mostremos por consola el "name" y el "no"

      //Todo, Insertemoslo en la base de datos "DB" de mongo llamada el documento pokemon.
      this.pokemonModel.insertMany(pokemonToInsert);
    });

    return 'Seed Exeucted'; //Ahora lo que retorna
    // es Seed que tomó la data de pokeapi.co y lo inserto en la base de datos de mongoDB

    // data.results ;como argimento
    // //? de la repuesta regresamos la data que lo hicimos con la desectruracion de la respueta
  }
}

//TODO:Nota: Queremos implementar una clase adactador LLamada HttpAdacter para poder
// TODO: crear y ella  el codigo requeridos, con proposito si  por casualidad me cambia a Axios
//TODO: en la instrucio del la lina 22.
//TODO: por fetch, o cualquier otro, pora hacer peticines hhtp.
//TODO: LO que s debe hacere crear mi propia implemntacio para axios.
//TODO: si este cambia  solo trengo que cambiar esta imolenatacion que es una clase llamada HttpAdacter.
//TODO: lo crearé dentro del folder "common" para implemntar un custom Prvaider. ya que el provair lo puedo inyectar
//TODO: Rcuerde que lo provider tienes que estar definidos en el Módulo
