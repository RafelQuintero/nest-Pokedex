import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from '../common/dto/pagination.dto';

//*4.-  Observams que cuando se ejecua una de la api me esta anteponiendo en el parametro del contorlador la pabra "api"
@Controller('pokemon')
export class PokemonController {
  //? Inicializamos  con el constructor para poder utilizar pokemonSrvice
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  //@HttpCode(HttpStatus.OK) //? decorador para personalizar el error el estatus de error 200 que es correcto.
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    //HAgamos una impresion en consola
    console.log(paginationDto);

    return this.pokemonService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':term') //?Cambiaremos el parametro id por term ya que se pude hacer la a
  // ?ctualizacion se haga por el nro del pokemon o por el id
  update(
    @Param('term') term: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id') //?Quiero mantener el id  como el parametro porque asi es como quiero hacer mi backen
  //? ya que se quiere construir los CuostonPipes para verifiar que el id es de pokemon.
  //? lo que se va hacer es crear   una carpeta llamada common creando el nuevo módulo, dentro folder commen quee esta
  // ?el modulo se creará otra carpeta "pipes" y dentro de esta un archivo
  // ? llamado "parse-mongo-id.pipe.ts".  creando el ParseMongoIdPipe que será el filtropara chequear
  // ?  el id que venag como parametro sea un id de mongo.
  //?utilizamos el cCLI de nesjs  y poderlo utilzarlo en otros tipos de provaider..
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
