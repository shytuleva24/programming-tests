import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, switchMap} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {TestsService} from "../../shared/tests.service";
import {Question, Test} from "../../shared/interfaces";
import {UtilsService} from "../shared/services/utils.service";
import {AlertService} from "../shared/services/alert.service";

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss']
})

export class CreatePageComponent implements OnInit, OnDestroy {
    testForm: FormGroup;
    submitted: boolean = false;
    updatedTest: Test = new Test();
    currentTest: Test = new Test();
    updateSubscription: Subscription;

    constructor(
        private testsService: TestsService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alert: AlertService
    ) {
    }

    get formControls(): Record<string, AbstractControl> {
        return this.testForm.controls;
    }

    ngOnInit(): void {
        this.initForm();
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.testsService.getById(params['id']);
            })
        ).subscribe((test) => {
            if (test.id) {
                this.testForm.patchValue(test);
                this.updatedTest = test;
                this.currentTest = structuredClone(this.updatedTest);
            }
        })
    }

    initForm(): void {
        this.testForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            testFilter: ['', Validators.required]
        });
    }

    addQuestion(): void {
        this.updatedTest.questions.push(new Question());
    }

    removeQuestion(id: string): void {
        this.updatedTest.questions = this.updatedTest.questions.filter(question => question.id !== id);
    }

    updateQuestion(updateQuestion: Question): void {
        this.updatedTest.questions[UtilsService.getIndex(updateQuestion.id, this.updatedTest)] = updateQuestion;
    }

    submitTest(): void {
        if (this.testForm.invalid) {
            return;
        }
        this.submitted = true;
        this.updatedTest = {
            ...this.updatedTest,
            ...this.testForm.value
        };
        if (this.updatedTest.id) {
            this.updateSubscription = this.testsService.update(this.updatedTest).subscribe(() => {
                this.submitted = false;
                this.alert.success(`${this.updatedTest.title} оновлено`)
                this.router.navigate(['/admin', 'dashboard']);
            });
        } else {
            this.updateSubscription = this.testsService.create(this.updatedTest).subscribe(() => {
                this.submitted = false;
                this.alert.success(`${this.updatedTest.title} створено`)
                this.router.navigate(['/admin', 'dashboard']);
            });
        }
    }

    isValid(): boolean {
        this.updatedTest = {
            ...this.updatedTest,
            ...this.testForm.value
        };
        const isValidTest = this.testForm.valid
        const changeValid = UtilsService.isIdentical(this.currentTest, this.updatedTest);
        return !changeValid && isValidTest;
    }
    ngOnDestroy(): void {
        if(this.updateSubscription) this.updateSubscription.unsubscribe();
    }
}
