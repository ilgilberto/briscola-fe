import { Component, OnInit, VERSION,Inject } from '@angular/core';
import { Status } from './domain/Status';
import { BriscolaService } from './services/BriscolaService';


declare const $: any;

enum TipoPartita {ComputerComputer,Giocatore1,Giocatore2,UmanoUmano};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  
  constructor(public service : BriscolaService) {}


ngOnInit(): void {
    this.execInit(); 
}

  tipoPartita! : TipoPartita;
  carta1!: string;
  carta2!: string;
  carta3!: string;

  mazzo!: string;
  briscola!: string;

  giocata1!: string;
  giocata2!: string;

  print!: string;

  wait:boolean = false;

  tastoContent!: string|null;
  tastoHandler: any;

  carteSelezionabili:boolean = false;

  public giocatore = [null,null];
  public tipologia = [null,null];

  public game  = new Status('','',0,0,0,0);;

  

iniziaIlGioco():void {
  
   if (this.checkConfigurazione()) {
     this.service.startGame().subscribe(z => {
       if (z.body != null) {
         this.game = z.body;
         this.briscola = this.game.cartaBriscola;
         this.mazzo = 'KK';
         this.execShift();
       }
      
      });
    
    
   }
   else {
     this.print = "Scegli tipo e nome dei due giocatori e poi premi il tasto per iniziare";
   }
}


private checkConfigurazione():boolean {
  const firstPlayer = $("#giocatore1").val();
  const firstType =  $("#tipo1").val();
  const secondPlayer = $("#giocatore2").val();
  const secondType =  $("#tipo2").val();

  if (firstType == secondType && firstType == 'c') {
      this.tipoPartita = TipoPartita.ComputerComputer;
  }
  else if (firstType == secondType && firstType == 'u') {
    this.tipoPartita = TipoPartita.UmanoUmano;
  }  else if (firstType == 'u') {
    this.tipoPartita = TipoPartita.Giocatore1;
  } else {
    this.tipoPartita = TipoPartita.Giocatore2;
  }

  this.giocatore = [firstPlayer,secondPlayer];
  this.tipologia = [firstType,secondType];
  return firstPlayer && firstType && secondPlayer && secondType;
}


execShift() {
 
  if (this.tipoPartita == TipoPartita.ComputerComputer) {
     this.showCarte();
  } else {
    var carte = [];
    if (this.game.turno == 1 || this.tipoPartita == TipoPartita.Giocatore1) {
       carte = this.game.mano.carteGiocatore1;
    } else {
      carte = this.game.mano.carteGiocatore2;
    }
    var n = carte.length;
    this.carta1 = ""; this.carta2 = ""; this.carta3 = "";
    if (n>0) {this.carta1 = 'KK'}
    if (n>1) {this.carta2 = 'KK'} 
    if (n>2) {this.carta3 = 'KK'} 
  }

  const turno = this.game.turno-1;
  if (this.game.mano.cartaSulTavolo == null) {
    this.giocata1 = '';
    this.giocata2 = '';
  }
  this.print = "Tocca a "+this.giocatore[turno];
  this.tastoContent = "Avanti";
  this.wait = false;
  if (this.tipologia[turno]  == 'u') {
  this.tastoHandler = this.shiftHuman;}
  else if (this.tipologia[turno]  == 'c') {
    this.tastoHandler = this.shiftComputer;}
}

shiftHuman() {
  this.showCarte();

  this.print = "Scegli una carta";
  this.tastoContent = null;
  this.carteSelezionabili = true;

}


public sceltaCarta(n:number) {
  this.carteSelezionabili = false;
  var carta = "";
  switch(n) {
     case 1: carta = this.carta1;this.carta1 = '';break;
     case 2: carta = this.carta2;this.carta2 = '';break;
     case 3: carta = this.carta3;this.carta3 = '';break;
  }
  var last:boolean = this.game.mano.cartaSulTavolo != null;
  this.service.giocaPersona(this.game.turno,carta).subscribe(z => {
    if (z.body != null) {
      this.game = z.body;
      this.completeShift(carta,last);}
    }, error => {
      if (error != null) {
      this.game != null;this.execInit();}});
  }


shiftComputer() {
  this.wait = true;
  var last:boolean = this.game.mano.cartaSulTavolo != null;
  var carte : string[];
  if (this.game.turno == 1) {
    carte = this.game.mano.carteGiocatore1;}
  else {
     carte = this.game.mano.carteGiocatore2;}
  this.service.giocaComputer(this.game.turno).subscribe(z => {
    if (z.body != null) {
      this.game = z.body;
      this.nascondiCartaGiocataComputer(carte);
      new Promise(f => setTimeout(() => {
        this.completeShift(this.game.ultimaCartaGiocataComputer,last);
      }, 500));
      }
    }, error => { 
       if (error != null) {
       this.game != null;this.execInit()}});
}

completeShift(carta:string,last:boolean) {
   
    if (last) {
         this.giocata2 = carta;
         var winner = this.game.mano.vincitore-1;
         if (this.game.turno == 0) {
           animate();
            this.wait = false;
            var vincitore = this.game.punteggio1>this.game.punteggio2 ? this.giocatore[0] : this.giocatore[1];
            this.print = 'Vince la partita '+vincitore;
            this.tastoContent = 'Gioca nuovamente';
            this.tastoHandler = this.iniziaIlGioco;
            return;
         }
         this.print = "Vince la mano "+this.giocatore[winner];
         this.tastoContent = "Avanti"
         this.tastoHandler = this.execShift;
         this.wait = false;
         if (this.game.carteNelMazzo == 0) {
           this.briscola = "";
           this.mazzo = "";
         }
    } else {
      this.giocata1 = carta;
      this.execShift();
    }

}

   private showCarte() {

    if (this.game.turno == 1) {
      this.carta1 = this.game.mano.carteGiocatore1[0];
      this.carta2 = this.game.mano.carteGiocatore1[1];
      this.carta3 = this.game.mano.carteGiocatore1[2];}
      else {
        this.carta1 = this.game.mano.carteGiocatore2[0];
        this.carta2 = this.game.mano.carteGiocatore2[1];
        this.carta3 = this.game.mano.carteGiocatore2[2];}

   }

   private nascondiCartaGiocataComputer(carte:string[]) {
       const cartaGiocata = this.game.ultimaCartaGiocataComputer;
       switch (carte.indexOf(cartaGiocata)) {
         case 0: this.carta1 =""; break;
         case 1: this.carta2 = "";break;
         case 2: this.carta3 = "";break;
         default: console.log("Errore carta "+cartaGiocata+ " non valida");
       }
       
 }
 private execInit() {
  this.carta1 = 'KK';
  this.carta2 = 'KK';
  this.carta3  = 'KK';

  this.mazzo = 'KK';
  this.briscola = 'KK';

  this.giocata1 = 'KK';
  this.giocata2 = 'KK';

  this.print = "Sei pronto per giocare ?";
  this.tastoContent = "Inizia la partita";
  this.tastoHandler = this.iniziaIlGioco;
  this.wait=false;
}

}


function animate() {
   
  $("#displaycontainer .inner" ).addClass( "vincitore", 1000, callbackAnim );
  $("#displaycontainerP .innerP" ).addClass( "vincitore", 1000, callbackAnim );
  
}

function callbackAnim() {
  setTimeout(function() {
    $("#displaycontainer .inner" ).removeClass( "vincitore" );
    $("#displaycontainerP .innerP" ).removeClass( "vincitore" );
  }, 2500 );
}








