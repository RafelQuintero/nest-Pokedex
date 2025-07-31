import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  //*14.-  Aqui dentro debo hacer una definicion de módulo
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name, //* ESTE name es de la extension del Documnto de Pokemon.
        schema: PokemonSchema, //* Este es Schema que se creo y se exportó. y que sea impotado
      },
    ]),
  ],
})
export class PokemonModule {}
