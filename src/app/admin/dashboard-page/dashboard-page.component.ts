import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {Test} from "../../shared/interfaces";
import {TestsService} from "../../shared/tests.service";
import {AlertService} from "../shared/services/alert.service";
import {UtilsService} from "../shared/services/utils.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit, OnDestroy {
  tests: Test[] = [];
  getTestsSubscribe: Subscription;
  removeTestSubscribe: Subscription;
  searchStr: string = '';

  constructor(
      private testsService: TestsService,
      private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.getTestsSubscribe = this.testsService.getAll().subscribe(tests => {
      this.tests = tests;
    })
  }

  remove(id: string | undefined): void {
    if (id) {
      this.removeTestSubscribe = this.testsService.remove(id).subscribe(() => {
        this.tests = this.tests.filter(test => test.id != id);
        this.alert.danger(`Тест видалено`);
      })
    }
  }

  ngOnDestroy(): void {
    if (this.getTestsSubscribe) this.getTestsSubscribe.unsubscribe();
    if (this.removeTestSubscribe) this.removeTestSubscribe.unsubscribe();
  }
}
