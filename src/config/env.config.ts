//todo: el archivo de configuracion de las varible de entorno).

//todo: Crearemos una funcion que me mapeará las variables de entorno y que la exportaremos para ser utilizada

export const EnvConfiguartion = () => ({
  // { } Esto significa que estoy regresamdo  un objeto que tienen las poriedade enviroment , mongodb, port y defaultlimit
  enviroment: process.env.MODE_ENV || 'dev', //?Esta variable de entorno nos dira si estamos en produccon o en desarrollo.
  mongodb: process.env.MONGODB, //? Esta es la varianel de entorno de la direccion URL de la base de mongo.
  port: process.env.PORT || 3002,
  defaultlimit: process.env.DEFAULT_LIMIT || 7,
});
//? Lo que se esta mapaeado la variables de entorno a un objeto de varible de entorno,

//todo: Esta funcion valida las variable de entornopor lo que se debe utilzar para tal efecto.
