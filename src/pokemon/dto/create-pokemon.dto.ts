import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  //? Aqui debo crear la propiedades que debe tener el dto para ser mandado como un
  //?body con todas sus caracteristicas

  //? la primera propiedad es el numero "no" del pokemon,y debe ser un número y debe ser entero "isInt"
  //?Tambien positivo, isPositive y de valor mínimo del Pokemon debe ser 1
  //   @IsNumber() //No se necesita porque es redundadnte ya que entero implica que es un número
  @IsInt() //Obliga que el núero sea un entero
  @IsPositive() //Obliga que el núnero sea positivo
  @Min(1) //Me obliga  que el numero mínimo es 1
  no: number;

  //?La segunda proiedd el el nombre del pokemon "name" y debe ser de tipo string(isString)
  // ?y de longitud mínima de 1 letra "MinLength"
  @IsString() // Obliga que sea un string
  @MinLength(1) //Obliga que el nombre tenga al menos 1 carácter
  name: string;
}
