import { Component, Input } from '@angular/core';

@Component({
  selector: 'top-menu',
  template: `<nav class="nav main-nav {{containerClass}}">
                    <a class="nav-link" href="/features">features</a>
                    <a class="nav-link" href="#">documentation</a>
                    <a class="nav-link" href="#">support</a>
                  </nav>`,
})
export class TopMenuComponent {
  @Input() containerClass: string;
  constructor() { }
  /**
   * @description 
   * @memberof TopMenuComponent
   */
  public ngOnInit() { }
}

