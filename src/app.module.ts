import { join } from 'path'; //Ya viene con node no hay que instalarlo y bene de ir al inicio por er paquetes propi de nodejs
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose'; //VA ubicado aqui porue es un paquene de nestjs
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    //*5. Este modulo estatico se copio y se pego del manual de ayuda pdf
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    //* 5.1. Me creo la refenecia de la base de datos de mongoose
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'), //* 6. debo clocar como argumento el mismo
    // *url que coloque en tablePlus ('mongodb://localhost:27017/nest-pokemon') y el nombre de la db "nest-pokemon"
    PokemonModule, CommonModule,
  ],
})
export class AppModule {}
