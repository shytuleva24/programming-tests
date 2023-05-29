import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {FbCreateResponse, Test} from "./interfaces";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class TestsService {
    constructor(private http: HttpClient) {}

    create(test: Test):Observable<Test> {
        return this.http.post<any>(`${environment.fbDbUrl}/tests.json`, test)
            .pipe(map((response: FbCreateResponse)=> {
                return {
                    ...test,
                    id: response.name
                }
            }));
    }

    getAll(): Observable<Test[]> {
        return this.http.get(`${environment.fbDbUrl}/tests.json`)
            .pipe(map((response: {[key: string]: any})=> {
                return Object
                    .keys(response)
                    .map( key => ({
                        ...response[key],
                        id: key,
                    }))
            }))
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>((`${environment.fbDbUrl}/tests/${id}.json`))
    }

    getById (id: string): Observable<Test> {
        return this.http.get<Test>(`${environment.fbDbUrl}/tests/${id}.json`)
            .pipe(map((test: Test) => {
                return {
                    ...test, id
                }
            }))
    }

    update (test: Test): Observable<Test> {
        return this.http.patch<Test>(`${environment.fbDbUrl}/tests/${test.id}.json`, test)
    }
}
