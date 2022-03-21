import { enableProdMode, VERSION } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare const $: any;

var angularVersion: string = 'Angular ' + VERSION.major;
$('#angularVersion').html("<b>"+angularVersion+"</b><img src='https://angular.io/assets/images/logos/angular/angular.svg' style='width:2vw;position:relative;top:.5vw'></img>");

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
