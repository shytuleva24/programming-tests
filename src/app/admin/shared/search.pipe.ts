import { Pipe, PipeTransform } from '@angular/core';
import {Test} from "../../shared/interfaces";

@Pipe({
  name: 'searchTests'
})
export class SearchPipe implements PipeTransform {

  transform(tests: Test[], search = ''): Test[] {
    if (!search.trim()) {
      return tests;
    }

    return tests.filter(test => {
      return test.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}
