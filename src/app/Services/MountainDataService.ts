import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InitialData } from '../Models/InitialData';

@Injectable({
    providedIn: 'root'
})
export class MountainDataService {

    constructor(private http: HttpClient) {
    }

    getInitialData(): Observable<InitialData> {
        return this.http.get<InitialData>('http://localhost:7071/api/initial')
            .pipe(catchError(this.handleError<InitialData>('getInitialData')))
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}