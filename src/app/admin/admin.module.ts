import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {LoginPageComponent} from "./login-page/login-page.component";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {SharedModule} from "../shared/shared.module";
import {AuthGuard} from "./shared/services/auth.guard";
import {QuestionFormComponent} from "./create-page/components/question-form/question-form.component";
import {SearchPipe} from "./shared/search.pipe";
import {AlertComponent} from './shared/components/alert/alert.component';
import {AlertService} from "./shared/services/alert.service";

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePageComponent,
        QuestionFormComponent,
        SearchPipe,
        AlertComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        SharedModule,
    ],
    exports: [RouterModule, SearchPipe],
    providers: [AuthGuard, AlertService],
})
export class AdminModule {
}
