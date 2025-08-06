//todo: Voy a implementar un clase adactadora, en este caso http-adapter para que se pueda utizar
//todo: en cualquier otros servicio. El nombre sera:

export interface HttpAdapter {
  //todo: Toda clas HttpAdapte va a tene que realizar la peticion get() recibe en su argumento
  // todo: el "url" del tipo "string" devuelve: una Promesa y es del tipo <T> y no genrico "any".
  get<T>(url: string): Promise<T>;
}

//TODO: En la carpeta de aapters voy a crear con "CLI"
// todo: o lo hago en forma manual, un archivo que se llame axios.adapter.ts
