//* Aqui especificare el dto;  como va lucir mi query  tal como se hizo con el body
// * por medio de una clase.

import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  //?Aui colocare las carcreisticas que tendrá el @query();
  // ? que es el limite (limit) y la cantidad incial (offset)
  @IsOptional()
  @IsPositive()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsPositive()
  offset?: number;
}
