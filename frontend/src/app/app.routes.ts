import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostDetailComponent } from './components/post-details/post-detail.component'; // 👈 new
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'post-list', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostDetailComponent }, // 👈 View post + comments
  { path: 'create', component: PostFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
];
