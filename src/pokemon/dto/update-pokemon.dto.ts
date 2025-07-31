import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

//*1.-  TODO: Nose creo export class UpdatePokemonDto  sino que se exteedio extends PartialType(CreatePokemonDto) {}
//* esdecri va a tener todas la propiedades del CreatePokemonDto con la uinca condicon que todas son opcionale "?"
//* a meno que se especipfique que son obligatorio

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
