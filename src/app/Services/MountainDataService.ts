import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MountainDataService {

    constructor(private http: HttpClient) {
    }

    getInitialData(): Observable<any> {
        return this.http.get<any>('http://localhost:7071/api/initial')
            .pipe(catchError(this.handleError<any>('getInitialData', {})))
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}