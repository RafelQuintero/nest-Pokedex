//todo: archivo de configuracion de las varible de entorno.

//todo: Crearemos una funcion que me mapeará (copiará) las variables de entorno y que la exportaremos para ser utilizada,
// todo:  ya qye dentro de esta funcion  lo que tengo un br¿jeto con las variable de entorno.
//todo: y desde esta funcion las uilizare.

export const EnvConfiguartion = () => ({
  // { } Esto significa que estoy regresamdo  un objeto que tienen las proiedad de este: enviroment , mongodb, port y defaultlimit
  enviroment: process.env.MODE_ENV || 'dev', //?Esta variable de entorno nos dira si estamos en produccon o en desarrollo.
  mongodb: process.env.MONGODB, //? Esta es la varianel de entorno de la direccion URL de la base de mongo.
  port: process.env.PORT || 3002,
  defaultLimit: +process.env.DEFAULT_LIMIT! || 7, //le estoy indicando que sea un número "+", ya que el url envia es in string
});
//? Lo que se esta mapaeado son las variables de entorno por medio de  un objeto donde estan las varibles de entornos,

//todo: Esta funcion valida las variable de entornopor lo que se debe utilzar para tal efecto.

//TODO: La cofiguarion de arrba se  utiliza  en el modulo dentro de nestjs
//todo; nunca  está llegando a las  varible de entorno de node linea  25 de main.ts  si esta expresado  el puerto
// todo: como "process.env.PORT" susituyendo el valos 3000 , cuando esta no es declaarada en le archivo .env

//! La configuarción de arriba se está usando en modulo dentro de nestjs,
//!pero si se le quita en la variables de entorno el puerto " e .env ",  esta configauacion  "EnvConfiguartion " n llegar a .env
//!Por lo que hbra de tenrer presente, cuando ejectemos el codigo para que no apraezca este tipo de error.
//cubriremos este tipo de error. y suplir esta configiración, istalaremos un paquete de tercero llado join
