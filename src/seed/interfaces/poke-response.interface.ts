//? Porque quiero una interface y no una clase. Es porque quiero solo ponerle el tipo "PokeResponse"
// ?a la repuesta get ya que no voy hacer manipukacione con esa data.

//?  La Inerface se creo de la siguinete amnera:

//?.- Se copio los 680 pokemns con el comado copy de pastman , cuando se ejecto un get con la url:
//? localhost:3000/api/v2/seed
//?.- ejecute el comannd palette (ctrl+shifp+p) y busco la instrucción Paste JSON code
//?.-  Me pide que le de un nombre: "PokeResponse"
//?.- Le doy enter y me escribe en forma automática este archivo. como se ve lineas; 10 al 20

export interface PokeResponse {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}
