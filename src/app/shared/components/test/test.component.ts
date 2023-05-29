import {Component, OnInit} from '@angular/core';
import {map, Observable, of, switchMap} from "rxjs";
import {Question, Test} from "../../interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {TestsService} from "../../tests.service";
import {UtilsService} from "../../../admin/shared/services/utils.service";

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    test$: Observable<Test>;
    answerTest: Test;
    questions: Question[];
    showResults: boolean;
    selectedQuestionIndex: number;
    answeredQuestions: (boolean | null)[];
    trueCount: number = 0;
    falseCount: number = 0;
    wrongAnswers: string[] = []
    constructor(
        private route: ActivatedRoute,
        private testsService: TestsService
    ) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            map((params: Params) => params['id']),
            switchMap((id: string) => this.testsService.getById(id))
        ).subscribe((test: Test) => {
            this.test$ = of(test);
            this.answerTest = test;
            this.answeredQuestions = Array(test.questions.length).fill(null);
            this.questions = test.questions;
            this.selectedQuestionIndex = 0;
            this.showResults = false;
        });
    }

    goToQuestion(idx: number): void {
        if (this.answeredQuestions[idx] === null) {
            this.selectedQuestionIndex = idx;
        } else {
            this.selectedQuestionIndex = this.answeredQuestions.indexOf(null);
        }
    }

    updateQuestion(question: Question) {
        const questionIndex = UtilsService.getIndex(question.id, this.answerTest);
        const isCorrect = this.checkOptionsEquality(question);
        if (isCorrect) {
            this.trueCount++;
        } else {
            this.falseCount++;
            this.wrongAnswers.push(question.question);
        }
        this.answerTest.questions[questionIndex] = question;
        this.answeredQuestions[questionIndex] = isCorrect;
        if (this.answeredQuestions.every(value => value !== null)) {
            this.showResults = true;
        }
        this.goToQuestion(++this.selectedQuestionIndex);
    }


    checkOptionsEquality(question: Question): boolean {
        return question.options.every(option => option.answer == option.userAnswer);
    }

    protected readonly Math = Math;
}
