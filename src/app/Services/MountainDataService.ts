import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Classification } from '../Models/Classification';
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

    getClassification(id: string) {
        return this.http.get<Classification>(`http://localhost:7071/api/classifications/${id}`)
            .pipe(catchError(this.handleError<Classification>('getInitialData')))
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}