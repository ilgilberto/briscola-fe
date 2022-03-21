import { Mano } from "./Mano";

	export class Status {

        constructor(
            public cartaBriscola: string,
            public ultimaCartaGiocataComputer: string,
            public turno: number,
            public punteggio1: number,
            public punteggio2: number,
            public carteNelMazzo: number,
            public mano:Mano = new Mano([],[],'',0,0)
        ) {  }
      

      }