import {UtilsService} from "../admin/shared/services/utils.service";

export interface User {
    email: string
    password: string
    returnSecureToken?: boolean
}


export interface FbAuthResponse {
    idToken: string
    expiresIn: string
}

export class Option {
    constructor(
        public text: string = '',
        public answer: boolean = false,
        public userAnswer: boolean = false
    ) {}
}

export class Question {
    constructor(
        public id: string = UtilsService.generateUniqueId(),
        public question: string = '',
        public code: string = '',
        public options: Option[] = [
            new Option(),
            new Option()
        ]
    ) {}
}

export class Test {
    constructor(
        public title: string = '',
        public code: string = '',
        public description: string = '',
        public testFilter: string = '',
        public questions: Question[] = [
            new Question()
        ]
    ) {}

    id?: string
}

export interface FbCreateResponse {
    name: string
}
