import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl} from "@angular/forms";

import {Option, Question} from "../../../../shared/interfaces";
import {UtilsService} from "../../../shared/services/utils.service";

@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.scss']
})

export class QuestionFormComponent implements OnInit {
    @Input('question') updateQuestion: Question;
    @Input() idxQuestion: number;
    @Output() questionEmitter = new EventEmitter<Question>();
    @Output() removeEmitter = new EventEmitter<null>();

    readonly MIN_OPTIONS_COUNT = 3;
    currentQuestion: Question;
    questionForm: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
    }

    get formControls(): Record<string, AbstractControl> {
        return this.questionForm.controls;
    }

    ngOnInit(): void {
        this.initForm();
        this.currentQuestion = structuredClone(this.updateQuestion);
        this.questionForm.patchValue(this.updateQuestion);
    }

    initForm(): void {
        this.questionForm = this.fb.group({
            id: this.updateQuestion.id,
            question: [''],
            code: [''],
            options: [[
                {text: '', answer: false, userAnswer: false},
                {text: '', answer: false, userAnswer: false}
            ]],
        })
    }

    addOption(): void {
        this.formControls['options'].value.push(new Option());
    }

    removeOption(item: Option): void {
        this.formControls['options'].value.splice(this.formControls['options'].value.indexOf(item), 1);
    }

    removeQuestion(): void {
        this.removeEmitter.emit();
    }

    saveQuestion(): void {
        this.updateQuestion = {...this.updateQuestion, ...this.questionForm.value}
        // console.log(this.updateQuestion);
        this.currentQuestion = structuredClone(this.updateQuestion);
        this.questionEmitter.emit(this.updateQuestion);
    }

    isValidQuestion(): boolean {
        const formValue = this.questionForm.value;
        const isValid = formValue.question && formValue.options && Array.isArray(formValue.options) &&
            formValue.options.length >= 2 && formValue.options.some((option: Option) => option.answer) &&
            formValue.options.every((option: Option) => option.text.trim() !== '');
        const changeValid = UtilsService.isIdentical(this.currentQuestion, formValue);
        return isValid && !changeValid;
    }
}
