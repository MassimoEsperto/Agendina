import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <div class="page">
              <router-outlet></router-outlet>
              </div>
              <my-footer></my-footer>`

})
export class AppComponent {
  
}
