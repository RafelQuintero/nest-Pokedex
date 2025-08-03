import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  //*Borramos todos y creamos un  nuevo método

  //?3.- Instalemeo axios en nuestro servicio. debe ser claramente visible en declararlo como:

  private readonly axios: AxiosInstance = axios; //?Con esto estamos diciendo
  // ? que es una instancia de axios, me esta diciendo que es una dependencia de mi servicio axios
  //? ahora podemos utilizar el this para utilizarlo.

  async executeSeed() {
    //console.log(fetch); //*1.-  Como esta informacion me aparece en la terminal me iducac que a version de node es >=18
    //*indicando que puedo hacepeticones "fech"

    //?2.- Vamos HAcer unata peticion  http paero sin utikzar fech,
    // ? utilizando  la librería de axios, cargemoslo en la terminal
    //? yarn add axios para instalarlo
    //? obteno la respuesta(resp) ; de esa respuesta me interesa sacar la data
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10', //? Es el backen que es
      // ?el que está haciendo la peticion  al poleapi.co para trersela al cliente.
      //? para construir mi semilla(SEED). Registros en la base de datos.
      //?Cambiemo la cantidad 650  a obtener por uno solo
    );

    //? Previamente quiero hacer el tipado de datos que obtengo pokeapi.co
    //? Esto se hace creando una interface con su respectivo folder y achivo.
    //? Que estará dentro de el folder "seed"

    //?Quiero extraer el nro. "no" del pokemon, pero este esta dentro de un  url : por ejemplo: (linea 29)
    //?  "name": "bulbasaur",
    //?   "url": "https://pokeapi.co/api/v2/pokemon/1/"

    //?procedimiento para extraer el "no" del url:

    data.results.forEach(({ name, url }) => {
      //? Le digo a metodo forEach()   por medio de una funcion
      // ? flecha que me de la data, pero en vez de pedir la data , desectructuro
      // ? y que me  recorra cada uno de  del name y url
      // ?  Le digo que me los muestre en consola el name y la url de la data, desectructurada.
      console.log({ name, url });

      //? Ahora  podemos obtenwe el nro "no" del porkemon a partir de lo anterior expuesto,

      const segment = url.split('/');
      //?cortemos por segemtos la informacion https del pokemon:
      // ? https://pokeapi.co/api/v2/pokemon?limit=1

      console.log(segment);

      const no: number = +segment[segment.length - 2]; //* despue del = lo que obtengo de la url es un string
      //*deb combertirlo el un numero clocado un + despues del = en la lina 55,

      console.log({ name, no }); //?mostremos por consola el "name" y el "no"
    });

    return data.results; //? de la repuesta regresamos la data que lo hicimos con la desectruracion de la respueta
    // ?/ 'Seed executed';
  }
}
