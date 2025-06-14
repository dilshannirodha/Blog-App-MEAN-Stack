import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
