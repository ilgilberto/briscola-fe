import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, Observable,  of,  retry, throwError } from 'rxjs';
import { Status } from '../domain/Status';
import { Message } from '../domain/Message';


@Injectable()
export class AudioService {

  private carte = new Audio();
  private start = new Audio();
  private end = new Audio();
  private ok = new Audio();
  private ko = new Audio();
  private nulla = new Audio();

  constructor() {
    this.carte.src = 'assets/sounds/carte.mp3';
    this.carte.load();

    this.start.src = 'assets/sounds/letsgo.mp3';
    this.start.load();
    
    this.end.src = 'assets/sounds/end.mp3';
    this.end.load();

    this.ok.src = 'assets/sounds/Congratulation.mp3';
    this.ok.load();

    this.ko.src = 'assets/sounds/annamo-bene.mp3';
    this.ko.load();

    this.nulla.src = 'assets/sounds/e-sti-cazzl.mp3';
    this.nulla.load();

  }

 
  playCarte(check:boolean): void {
    if (check) {
    this.silence();
    this.carte.play();
    }
  }

  playStart(check:boolean): void {
    if (check) {
    this.silence();
    this.start.play();
    }
  }

  playEnd(check:boolean): void {
    if (check) {
    this.silence();
    this.end.play();
    }
  }

  playOK(check:boolean): void {
    if (check) {
    this.silence();
    this.ok.play();
    }
  }

  playKO(check:boolean): void {
    if (check) {
    this.silence();
    this.ko.play();
    }
  }

  playNessunVincitore(check:boolean): void {
    if (check) {
    this.silence();
    this.nulla.play();
    }
  }

  private silence() {
    this.carte.pause();
    this.carte.currentTime = 0;
    this.start.pause();
    this.start.currentTime = 0;
    this.end.pause();
    this.end.currentTime = 0;
    this.ok.pause();
    this.ok.currentTime = 0;
    this.ko.pause();
    this.ko.currentTime = 0;
    this.nulla.pause();
    this.nulla.currentTime = 0;
  }

}
