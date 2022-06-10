import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]>{
    const url = `${ this.apiUrl }/name/${ termino }`
    // Podemos hacerlo asi, donde se maneja el observable enviando un arreglo vacio en caso de no encontrar nada
    //return this.http.get(url)
    //        .pipe(
    //          catchError( err => of([]))
    //        );
    // o se puede dejar normal y atajar la respuesta para validarla en el servicio
    return this.http.get<Country[]>(url);
  }

  buscarCapital(termino: string): Observable<Country[]>{
    const url = `${ this.apiUrl }/capital/${ termino }`
    return this.http.get<Country[]>(url);
  }

  getPaisPorAlpha(id: string): Observable<Country[]>{
    const url = `${ this.apiUrl }/alpha/${ id }`
    return this.http.get<Country[]>(url);
  }

}
