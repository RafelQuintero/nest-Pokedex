import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  //*14.-  Aqui dentro debo hacer una definicion de módulo
  imports: [
    //todo: Debemos importar
    ConfigModule, //todo: para que pueda utilzar las variabes de entorno

    //* LO que se indica n el codigod e abjajo es la definicion de mi esquema

    MongooseModule.forFeature([
      {
        name: Pokemon.name, //* ESTE name es de la extension del Documnto de Pokemon.
        schema: PokemonSchema, //* Este es Schema que se creo y se exportó. y que sea impotado
      },
    ]),
  ],
  exports: [MongooseModule], //*Hemos exportado PokemonModule,
  // *que es el modelo del pokemon en Monggose, para ser utilizado en otra parte (en seed.module.ts)
})
export class PokemonModule {}
