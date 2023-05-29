import { Component, OnInit } from '@angular/core';
import { TestsService } from "../shared/tests.service";
import { Observable } from "rxjs";
import { Test } from "../shared/interfaces";

interface PageItem {
    value: number | string;
    isActive: boolean;
}

@Component({
    selector: 'app-tests-page',
    templateUrl: './tests-page.component.html',
    styleUrls: ['./tests-page.component.scss']
})
export class TestsPageComponent implements OnInit {
    protected readonly Number = Number;

    tests$: Observable<Test[]>;
    tests: Test[];
    searchStr: string = '';
    currentPage: number = 1;
    itemsPerPage: number = 3;
    totalPages: number;
    filteredTests: Test[] = [];

    constructor(
        private testsService: TestsService
    ) {}

    ngOnInit(): void {
        this.tests$ = this.testsService.getAll();
        this.loadTests();
    }

    loadTests() {
        this.testsService.getAll().subscribe((tests) => {
            this.tests = tests;
            this.filteredTests = this.getFilteredTests();
            this.updatePagination();
        });
    }

    getFilteredTests() {
        if (this.searchStr.trim() !== '') {
            return this.tests.filter((test) =>
                test.title.toLowerCase().includes(this.searchStr.toLowerCase())
            );
        } else {
            return this.tests;
        }
    }

    onSearchInputChange() {
        if (this.searchStr === '') {
            this.filteredTests = this.tests;
            this.changePage('goTo', 1);
        } else {
            this.filteredTests = this.getFilteredTests();
        }
        this.updatePagination();
    }

    updatePagination() {
        this.totalPages = Math.ceil(this.filteredTests.length / this.itemsPerPage);
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages
        } else if (this.currentPage === 0) {
            this.currentPage = 1;
        }
    }

    paginate() {
        return this.filteredTests.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    }
    changePage(action: string, page: number) {
        if (action === 'previous' && this.currentPage > 1) {
            this.currentPage--;
        } else if (action === 'next' && this.currentPage < this.totalPages) {
            this.currentPage++;
        } else if (action === 'goTo' && page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    getPagesToShow(): PageItem[] {
        const pages: PageItem[] = [];

        if (this.totalPages <= 6) {
            for (let i = 2; i < this.totalPages; i++) {
                pages.push({ value: i, isActive: this.currentPage === i });
            }
        } else {
            const startPage = this.currentPage <= 3 ? 2 : this.currentPage - 1;
            const endPage = this.currentPage >= this.totalPages - 2 ? this.totalPages - 1 : this.currentPage + 1;

            if (startPage > 2) pages.push({ value: '...', isActive: false });

            for (let i = startPage; i <= endPage; i++) {
                pages.push({ value: i, isActive: this.currentPage === i });
            }
            if (endPage < this.totalPages - 1) pages.push({ value: '...', isActive: false });
        }
        return pages;
    }
}
