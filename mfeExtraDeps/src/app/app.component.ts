import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwapiService } from '@se-ng/swapi';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  swapi = inject(SwapiService);
  title = 'mfeExtraDeps';

  constructor() {
    // just do something with the service to make sure it's working
    this.swapi.getRandomPerson(1).subscribe(console.log);
  }
}
