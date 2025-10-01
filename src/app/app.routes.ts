import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './services/guard/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
];
