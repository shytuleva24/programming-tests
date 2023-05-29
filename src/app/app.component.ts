import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  jsQuiz = [
    {
      question: "Какое значение будет выведено в консоль?",
      code: "console.log(typeof(undefined));",
      options: {
        a: "undefined",
        b: "null",
        c: "object",
        d: "NaN"
      },
      answer: "a"
    },
    {
      question: "Как объявить переменную в JavaScript?",
      options: {
        a: "var myVar;",
        b: "let myVar;",
        c: "const myVar;",
        d: "все вышеперечисленные способы верны"
      },
      answer: "d"
    },
    {
      question: "Какая функция используется для добавления элемента в конец массива?",
      options: {
        a: "push()",
        b: "pop()",
        c: "shift()",
        d: "unshift()"
      },
      answer: "a"
    },
    {
      question: "Какое значение будет выведено в консоль?",
      code: "var a = 5;\nconsole.log(a++ + ++a);",
      options: {
        a: "11",
        b: "12",
        c: "13",
        d: "14"
      },
      answer: "c"
    },
    {
      question: "Какое значение будет выведено в консоль?",
      code: "console.log(typeof(NaN));",
      options: {
        a: "number",
        b: "string",
        c: "object",
        d: "NaN"
      },
      answer: "a"
    },
    {
      question: "Какой метод используется для удаления элемента из массива по индексу?",
      options: {
        a: "slice()",
        b: "splice()",
        c: "concat()",
        d: "join()"
      },
      answer: "b"
    },
    {
      question: "Что будет выведено в консоль?",
      code: "function myFunc(a, b) {\n  return a + b;\n}\nconsole.log(myFunc(2,3,4));",
      options: {
        a: "5",
        b: "9",
        c: "undefined",
        d: "TypeError"
      },
      answer: "a"
    },
    {
      question: "Как объявить объект в JavaScript?",
      options: {
        a: "var myObj = {};",
        b: "var myObj = new Object();",
        c: "var myObj = { key: 'value' };",
        d: "все вышеперечисленные способы верны"
      },
      answer: "d"
    },
    {
      question: "Какой метод используется для приведения строки к числу?",
      options: {
        a: "toNumber()",
        b: "parseInt()",
        c: "parseFloat()",
        d: "toInt()"
      },
      answer: "b"
    },
    {
      question: "Какое значение будет выведено в консоль?",
      code: "var x = 1;\nfunction myFunc() {\n  console.log(x);\n  var x = 2;\n}\nmyFunc();",
      options: {
        a: "1",
        b: "2",
        c: "undefined",
        d: "ReferenceError"
      },
      answer: "c"
    },
    {
      question: "Какой будет результат выполнения следующего кода: \nconsole.log('1' + 2 + 3);",
      options: {
        a: "123",
        b: "6",
        c: "12",
        d: "Неопределенное значение"
      },
      answer: "a"
    },
    {
      question: "Что выведет следующий код: \nconsole.log(typeof([1,2,3]));",
      options: {
        a: "array",
        b: "object",
        c: "undefined",
        d: "number"
      },
      answer: "b"
    },
    {
      question: "Каким оператором можно проверить является ли одна строка подстрокой другой?",
      options: {
        a: "==",
        b: "=",
        c: "===",
        d: "indexOf"
      },
      answer: "d"
    },
    {
      question: "Что будет выведено в консоль при выполнении следующего кода: \nconsole.log('2' * '2');",
      options: {
        a: "4",
        b: "'4'",
        c: "NaN",
        d: "undefined"
      },
      answer: "a"
    },
    {
      question: "Какой метод используется для удаления последнего элемента из массива?",
      options: {
        a: "shift()",
        b: "unshift()",
        c: "pop()",
        d: "push()"
      },
      answer: "c"
    },
    {
      question: "Что будет выведено в консоль при выполнении следующего кода: \nvar a = 2;\nconsole.log(a == window.a);",
      options: {
        a: "true",
        b: "false",
        c: "undefined",
        d: "NaN"
      },
      answer: "b"
    },
    {
      question: "Какой метод используется для объединения двух массивов?",
      options: {
        a: "splice()",
        b: "slice()",
        c: "concat()",
        d: "join()"
      },
      answer: "c"
    },
    {
      question: "Какой метод используется для поиска первого вхождения элемента в массиве?",
      options: {
        a: "find()",
        b: "includes()",
        c: "indexOf()",
        d: "search()"
      },
      answer: "c"
    },
    {
      question: "Какой тип данных в JavaScript используется для хранения даты и времени?",
      options: {
        a: "Date",
        b: "Time",
        c: "DateTime",
        d: "Timestamp"
      },
      answer: "a"
    },
    {
      question: "Какой метод используется для приведения строки к дробному числу?",
      options: {
        a: "toNumber()",
        b: "parseInt()",
        c: "parseFloat()",
        d: "toInt()"
      },
      answer: "c"
    },
    {
      question: "Какие основные типы данных существуют в JavaScript?",
      options: {
        a: "Числа, строки, булевы значения, объекты, массивы, функции",
        b: "Числа, строки, булевы значения, объекты, undefined, null",
        c: "Числа, строки, булевы значения, объекты, null, NaN",
        d: "Числа, строки, булевы значения, объекты, undefined, NaN"
      },
      answer: "b"
    },
    {
      question: "Что такое замыкание (closure) в JavaScript?",
      options: {
        a: "Замыкание это способность функции сохранять доступ к переменным, определенным вне ее собственной области видимости",
        b: "Замыкание это способность функции изменять переменные, определенные вне ее собственной области видимости",
        c: "Замыкание это способность функции работать с переменными, определенными в других функциях",
        d: "Замыкание это способность функции вызывать саму себя рекурсивно"
      },
      answer: "a"
    },
    {
      question: "Какой символ используется для обращения к свойству объекта в JavaScript?",
      options: {
        a: ".",
        b: "-",
        c: "_",
        d: ":"
      },
      answer: "a"
    },
    {
      question: "Какое значение будет выведено в консоль?",
      code: "console.log(0.1 + 0.2 === 0.3);",
      options: {
        a: "true",
        b: "false"
      },
      answer: "b"
    },
    {
      question: "Что такое IIFE (Immediately Invoked Function Expression) в JavaScript?",
      options: {
        a: "IIFE это функция, которая вызывается автоматически сразу после своего определения",
        b: "IIFE это функция, которая вызывается только при наличии определенных условий",
        c: "IIFE это функция, которая используется для создания объектов",
        d: "IIFE это функция, которая используется для объявления классов"
      },
      answer: "a"
    },
    {
      question: "Какой метод используется для проверки, содержит ли массив определенный элемент?",
      options: {
        a: "includes()",
        b: "indexOf()",
        c: "slice()",
        d: "concat()"
      },
      answer: "a"
    },
    {
      question: "Какой цикл используется для перебора свойств объекта?",
      options: {
        a: "for...in",
        b: "for...of",
        c: "while",
        d: "do...while"
      },
      answer: "a"
    }
  ]  
}
