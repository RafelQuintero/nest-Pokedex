//* joi me servirá para validar objeto paara que luzca como los defina en un schema
import * as Joi from 'joi'; //se estaá importando todo el paqute  de joi para que funcione
// Ahora creamos un validecionSchema , para que tenga las propiedades que estoy esperando que luzca el objeto que yo QUIERO..

export const JoinValidationSchema = Joi.object({
  //+ aQUI CONSTRUYO EJ OBJETO PARA QUE LUZCA eXACTAMENTO COMO YO QUIERO QUE LUZCA. DE LAS VARIABLES DE ENTORNO
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3005),
  DEFAULT_LIMIT: Joi.number().default(6),
});
//? en donde uso este JoinValicationSchema?  LO especificamos en app.modulo.ts   y lo coloco en:
//? ConfigModule.forroot({ ..., validationSchema:JoiValidatonSchema, })
