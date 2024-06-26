import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomePageComponent } from './pages/home/homePage.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'project/:id', component: ProjectPageComponent },
    { path: '**', component: PageNotFoundComponent }
];
