<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
yarn insltall

```

3. Tener Nest CLI unstalado en forma global

```
      npm i -g @nestjs/cli

```

4. Levatar la bae de dato "DB"

   ....

   docker-compose up -d

   ...

5.- Clonar el archivo **env.template** y renombrar la copia **.env**

...

6.- Llenar las variable de entorno definidas en el `.env`

7.- Inicailizar el proyecto en dev:

      ...

       yarn start:dev

       ...

8. Recosntruir la base de datos con la semilla

   ...
   http://localhost:3000/api/v2/seed

   ...

   89.- SI no tenemos ningun pokemon que se ejecute la intrucción anterior, simpre que estemos en desarrollo
   ...

## Stack usado

- MongoDB
- Nest

#Prodution Build
1.-Crear el archivo `.env.prod`
2.-Llenar las variable de entorno de produccion
3.- Construir la nueva imagen

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build

```

Notas:
Hacer un deploy manualmente forzado

Heroku redeploy sin cambios:

```
git commit --allow-empty -m #Tigger Heroku deploy"
git push heroku <master|main>

```
