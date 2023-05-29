import { Injectable } from '@angular/core';
import {Test} from "../../../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  static isIdentical(myQuestion: any, formQuestionValue: any): boolean {
    if (myQuestion === null || myQuestion === undefined || formQuestionValue === null || formQuestionValue === undefined) {
      return myQuestion === formQuestionValue;
    }

    if (typeof myQuestion !== 'object' || typeof formQuestionValue !== 'object') {
      return myQuestion === formQuestionValue;
    }

    const myQuestionKeys = Object.keys(myQuestion);
    const formQuestionKeys = Object.keys(formQuestionValue);

    if (myQuestionKeys.length !== formQuestionKeys.length) {
      return false;
    }

    for (const key of myQuestionKeys) {
      if (!formQuestionKeys.includes(key) || !this.isIdentical(myQuestion[key], formQuestionValue[key])) {
        return false;
      }
    }

    return true;
  }


  static getIndex(id: string, test: Test): number {
    return test.questions.findIndex(question => question.id === id);
  }

  static generateUniqueId(): string {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2);
    return `${timestamp}_${random}`;
  }
}
