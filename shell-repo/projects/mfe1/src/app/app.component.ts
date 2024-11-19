import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DummyLoginComponent, DummyLoginService } from '@se-ng/dummy-login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DummyLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  ls = inject(DummyLoginService);
  title = 'mfe1';
}
