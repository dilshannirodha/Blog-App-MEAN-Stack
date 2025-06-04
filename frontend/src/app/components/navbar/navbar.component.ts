import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  
})
export class NavbarComponent {
  logout() {
    localStorage.removeItem('token'); // or your auth key
    window.location.href = '/login'; // or use router.navigate(['/login']);
  }
}
