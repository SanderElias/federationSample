import { Component, inject } from '@angular/core';
import { DummyLoginService } from './dummy-login.service';

@Component({
  selector: 'lib-dummy-login',
  standalone: true,
  imports: [],
  template: `{{ls.username()}}`,
  styles: ``
})
export class DummyLoginComponent {
  ls = inject(DummyLoginService);

}
