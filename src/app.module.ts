import { join } from 'path'; //Ya viene con node no hay que instalarlo y bene de ir al inicio por er paquetes propi de nodejs
import { Module } from '@nestjs/common';
//Todos laos paquetes de nest debeestar juntos ,para que sea unabuena practica de programacion.
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose'; //VA ubicado aqui porue es un paquene de nestjs
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguartion } from './config/env.config';

@Module({
  imports: [
    //Nota: simpre se debe pegar al inicio para que funcione correctmente.
    ConfigModule.forRoot({
      load: [EnvConfiguartion], //Agerva la fincion de validar las variable de entorno
    }),

    //*5. Este modulo estatico se copio y se pego; del manual de ayuda pdf
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    //* 5.1. Me creo la refenecia de la base de datos de mongoose
    MongooseModule.forRoot(process.env.MONGODB!), // El error que aparecia : process.env.MONGODB,
    //                                              antes de colocar "!" es de typescrpt , al colocarle "!"
    //                                               aseguramos que typscript la trate como un string, simre y cuando confie en mi
    //                                              que esor mo es un unidfine.
    //* 6. debo clocar como argumento el mismo
    // *url que coloque en tablePlus ('mongodb://localhost:27017/nest-pokemon') y el nombre de la db "nest-pokemon"
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
  //? 1.-  Comon esto es una clase podemos utilizar un constructor para instanciar algo

  constructor() {
    //?2.- Mostromos las varibles de entorno   por la terminal ,que son un bastantes pero no estan la especificadas en el archivo ".env".
    //console.log(process.env);  //Se quit para que no semostrara todas las variable de entorno ,incluyendo las que costrimos
    //3.- debo Hacer que las variables de entorno que se especificarón  las carge el proyecto.
    //esto se hace copiando un archivo de la guia de nestjs , donde dice varable de entorno.
    // haciendo la instalacion de una libreria. yarn add @nestjs/config
    //4.-  comoca donde esta  el array de imports [ConfigModule.forRoot()]
  }
}
