import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {HomePageComponent} from './home-page/home-page.component';
import {TestsPageComponent} from './tests-page/tests-page.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {TestComponent} from "./shared/components/test/test.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            {path: '', redirectTo: '/', pathMatch: 'full'},
            {path: '', component: HomePageComponent},
            {path: 'tests', component: TestsPageComponent},
            {path: 'about', component: AboutComponent},
            {path: 'test/:id', component: TestComponent}
        ]
    },
    {
        path: 'admin', loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
