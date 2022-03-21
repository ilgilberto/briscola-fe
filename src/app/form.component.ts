import { Component, OnInit } from '@angular/core';
import { Message } from './domain/Message';
import { BriscolaService } from './services/BriscolaService';


declare const $: any;

@Component({
  selector: 'message-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  title = 'briscola-fe';
  model = new Message("","","");
  
  constructor(public service : BriscolaService) {}

  ngOnInit(): void {
   
   
  }

  onSubmit(event:any) {  event.preventDefault();
    $('.special li').html("<img src='assets/images/waiting.gif' style='width:12vw'>");
    this.service.insertMessage(this.model).subscribe(x => {
       if (x.body !=null) {
         var n:number = x.body;
         $('.special li').html("Messaggio registrato con codice <b>"+n+"</b>");
       }
    })
  }


}
