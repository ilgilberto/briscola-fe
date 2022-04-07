import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form.component';
import { CartaComponent } from './carta/carta.component';
import { BriscolaService } from './services/BriscolaService';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AudioService } from './services/AudioService';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CartaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BriscolaService,HttpClientModule,AudioService],
  bootstrap: [AppComponent,FormComponent]
})
export class AppModule { }
