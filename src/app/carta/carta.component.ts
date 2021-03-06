import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss']
})


export class CartaComponent  {
  @Input() id!: string;
  @Input() selectable: boolean=false;
  @Output() sel = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  select() {
    if (this.selectable) {
         this.sel.emit();
    }
  }

  isNaN(value:any) : boolean {
    return isNaN(value);
  }

  eval(value:string) : number {
    return eval(value);
  }

  mazzofactor() : number {
    if (window.matchMedia("(orientation: portrait)").matches) {
      return 0.06;
   }
    return 0.03;
  }

}