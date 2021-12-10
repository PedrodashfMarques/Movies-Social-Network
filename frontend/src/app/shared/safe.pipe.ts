import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private mySanitizer: DomSanitizer){}

  transform(url) {
    return this.mySanitizer.bypassSecurityTrustResourceUrl(url);
  }

}