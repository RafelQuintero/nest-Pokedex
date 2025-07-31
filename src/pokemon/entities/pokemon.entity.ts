//*2.- //* Recordar que los entities es la representacion de los datos que estamos grabando en la base de datos  "DB" ,
// * pude verse como una abla que estamos trabajado en una  tabla

//* 7. Como estaremos trabajado en Mongoose DB.  Para  registro o documentos, se pude ver
// *  como  llenaramos (insertados) en una (tabla), los dB;  que en mongoDB, es una coleccion de objetos
// * que tendremos  que se son  almacnado en mongoDB

//*Las edentidades (Entiys) que es una clase,  hace una referencia como nostros
// * queremos como se va a grabar en la DB, los registros en la base de datos

//* Cada una  de la instancia de la class Pokemon  es un registro de Base de Dato
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; //*8. Se debe importar de la libreria mongoose

//* 11.- Se le indica  que la clse pokemon  que es un documento y
// *se especifica como sufijo  a la cLase  Pokemon la palabra : extends Docoment
//* Recurde importar Documnent de "mongoose".
//* para que agregue  todas las funcionalidades respectivas, como; nombres, métodos, etc. para poder trabajs de una manera facio

//*12.- debo indicarle que es un schema y se hace por medio del decorador @Schema()

@Schema()
export class Pokemon extends Document {
  //* 8.- Quiero que este entitys tenga todas las caracteristicas de un pokemon:
  //* Nombre de pokemo: name,
  //* El número  que le correspnde ese pokemon  que es único , y
  //* El id: id , pero este id no debe ser númerico , sino el que genera monggodb, que es único.
  //*pero este no se especifica en el entity ya que este se genera automaticamente al hacer el registro.

  //* 9. id: string ,  mongoose me lo da en forma automática

  //*10.  debo agregerle un decorado para que me agregue método a cada propiedad.
  @Prop({
    unique: true, //*9.1.- Que sea Unico

    index: true, //* 9.2.- Que sea único, el numero de pagina donde esta este pokemon

    required: true, //* <-- Muy importante, nose pude guardar vacio
  })
  name: string; //* Etse es el nombre de pokemony debe ser único

  @Prop({
    unique: true, //*9.1.- Que sea Unico

    index: true, //* 9.2.- Que sea único, el numero de pagina donde esta este pokemon

    required: true, //* <-- Muy importante, no se pude guardar vacio:pero se coloco en el dto
  })
  no: number; //* es el número asinado dal pokemon y debe ser único.
}

//*debo exportar el schema  que va lucir como la clase "Pokemon" , que le va a decir como va a ser definida la base de datos para su registro
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
//?TODO: debo espcificar que este es el schema de la base de datos y debe tener comunicacion con monggose en su  DB .

//TODO:  13.- Nota: Ahoar debo hacer  una conexción  con la base de datos
//Todo:  para que el PokemonSchema para que se pueda utlizar.
