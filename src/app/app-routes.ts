import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ModuleWithProviders } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGaurdService } from './service/auth-gaurd.service';

export const appRoutes: Routes = [
    {
        path: '',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGaurdService]
    },
    {
        path: 'login',
        component: LoginComponent
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });