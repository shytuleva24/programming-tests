import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {AuthGuard} from "./shared/services/auth.guard";


const routes: Routes = [
    {
        path: '', component: AdminLayoutComponent, children: [
            {path: 'login', component: LoginPageComponent},
            {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
            {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
            {path: 'test/:id/edit', component: CreatePageComponent, canActivate: [AuthGuard]},
            {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AdminRoutingModule { }
