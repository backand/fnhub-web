// angular
import { Component, OnInit } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';

@Component({
  template: `home page<br/>
  Enjoy it! <p class="demo-text">Demo text</p>`,
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  res: string;
  constructor(private backand: BackandService) { }
  getList(): void {
    this.res = 'fetching objects...';
    this.backand.object.getList('users').then((res: any) => {
      this.res = `${res.data.length} objects fetched`;
      // console.log(res);
    });
  }
  ngOnInit(): void {
    this.backand.init({
      appName: 'funhub',
      anonymousToken: 'f10673bb-d12a-4245-8eca-312add606059'
    });
    this.getList();
  }
}
