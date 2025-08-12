import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    PokemonModule, //?aqui importamos el modelo de pokemon el cual está
    // ? exportando el código linea 1 que es el Modelo.
    CommonModule,
  ], //? me va ofrecer los servicios de axios.
})
export class SeedModule {}

//! Ahora habamos la insercion de los 10 okemoses nos vamos al archivo seed.service.ts
