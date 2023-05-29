import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthService} from "../shared/services/auth.service";
import {User} from "../../shared/interfaces";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    form: FormGroup;
    submitted = false;

    constructor(
        public auth: AuthService,
        private fb: FormBuilder,
        private router: Router
    ) { }

    get formControls(): Record<string, AbstractControl> {
        return this.form.controls;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(6)]]
        });
    }

    submit(): void {
        if (this.form.invalid) return;

        this.submitted = true;
        const user: User = {
            email: this.formControls['email'].value,
            password: this.formControls['password'].value,
        }

        this.auth.login(user).subscribe(()=> {
            this.router.navigate(['/admin', 'dashboard']);
            this.submitted = false;
        }, () => {
            this.submitted = false;
        })
    }
}
