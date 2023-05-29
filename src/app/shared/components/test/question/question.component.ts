import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from "../../../interfaces";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Output() userAnswersEmitter = new EventEmitter();
  answerForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  get options(): FormArray {
    return this.answerForm.get('options') as FormArray;
  }

  initForm(): void {
    this.answerForm = this.fb.group({
      options: this.fb.array([]),
    });

    this.question.options.forEach(option => {
      this.options.push(this.fb.group({
        text: option.text,
        answer: option.answer,
        userAnswer: option.userAnswer
      }));
    });
  }

  saveAnswer() {
    const userAnswers: Question = {
      ...this.question, ...{options: this.options.value}
    }
    this.userAnswersEmitter.emit(userAnswers);
  }
}
