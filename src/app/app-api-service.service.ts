import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const apiUrl =
  'http://lb-services-726770088.us-east-1.elb.amazonaws.com/employee/';

@Injectable({
  providedIn: 'root',
})
export class AppApiServiceService {
  private handleErrors(error: any): Observable<never> {
    console.error('Error al consumir la API:', error);
    return throwError('Error al consumir la API');
  }

  private performFetch(
    method: string,
    url: string,
    body?: any
  ): Observable<any> {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    return new Observable((observer) => {
      fetch(url, fetchOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error al consumir la API. Código de estado: ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log('Respuesta de la API:', data);
          observer.next(data);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    }).pipe(catchError(this.handleErrors));
  }

  getEmployees(): Observable<any[]> {
    return this.performFetch('GET', apiUrl);
  }

  getEmployee(id: number): Observable<any> {
    return this.performFetch('GET', `${apiUrl}${id}`);
  }

  postEmployee(employee: any): Observable<any> {
    return this.performFetch('POST', apiUrl, employee);
  }

  putEmployee(employee: any, id: number): Observable<any> {
    return this.performFetch('PUT', `${apiUrl}${id}`, employee);
  }
}
