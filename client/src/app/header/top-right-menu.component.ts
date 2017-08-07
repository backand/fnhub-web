import { Component, Input } from '@angular/core';

@Component({
  selector: 'top-right-menu',
  template: `<ul class="nav  {{containerClass}} right-nav">
  <li class="nav-item">
    <a class="nav-link active" href="/auth/signup">signup</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/auth/signin">login</a>
  </li>
</ul>`,
})
export class TopRightMenuComponent {
  @Input() containerClass: string;
  constructor() { }
  /**
   * @description 
   * @memberof TopRightMenuComponent
   */
  public ngOnInit() { }
}

