import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {TestsPageComponent} from './tests-page/tests-page.component';
import {TestComponent} from './shared/components/test/test.component';
import {SharedModule} from "./shared/shared.module";
import {AboutComponent} from './about/about.component';
import {AuthInterceptor} from "./shared/auth.interceptor";
import {TestCardComponent} from './tests-page/test-card/test-card.component';
import {QuestionComponent} from "./shared/components/test/question/question.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminModule} from "./admin/admin.module";

const INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
}

@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        HomePageComponent,
        TestsPageComponent,
        TestComponent,
        AboutComponent,
        TestCardComponent,
        QuestionComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        AdminModule,
    ],
    providers: [INTERCEPTOR_PROVIDER],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
