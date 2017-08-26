// angular
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as md5 from 'md5';
@Component({
  selector: 'avatar',
  template: `<img [src]="avatar" class="{{class}}">`
})
export class AvatarComponent implements OnInit {
  @Input() email : string;
  @Input() size: number = 16;
  @Input() class: string;
  fallback: string = 'mm';
  avatar: string;
  avatarBaseURL : string;
  private whislistURLS:any = ['localhost','127.0.0.1'];
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
   this.avatarBaseURL = window.location.hostname;
    if(this.whislistURLS.indexOf(this.avatarBaseURL) >=0){
      this.avatarBaseURL = 'https://fnhubqa.herokuapp.com';
    }
    this.avatarBaseURL = this.avatarBaseURL+ '/assets/img/avatar/'+this.getRandomArbitrary(1,6)+'.png';
    this.avatar = `//www.gravatar.com/avatar/${md5(this.email)}?s=${this.size}&d=${this.avatarBaseURL}`;
    console.log('AvatarComponent - email',this.email);
  }

  ngOnDestroy(): void {
  }

  private getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
