import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* 3.- Aqui pude pone una  ruta global  con la palablra  "api/v2" para que la tome todos los controladores de mi api
  app.setGlobalPrefix('api/v2');
  //* con slo hacer la instrucccion amterior coloca automaticamente el api al api seleccionada.

  //? 15.- Hacemos una valdacion global(está a nivel de aplicacón) de los Pipe para que este se pueda utilizar en cualquier lugar del proyecto
  app.useGlobalPipes(
    new ValidationPipe({
      //Recurde importa VliadtionPïpe
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //transforma tipo (  un srting :"1", en un número)
      transformOptions: {
        enableImplicitConversion: true, //habilita laconversion en foma implicita
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
