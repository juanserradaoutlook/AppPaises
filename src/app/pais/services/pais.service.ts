import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Clima } from '../interfaces/clima.interface';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  getPaisParamsHttp(){
    return new HttpParams().set('fields', 'name,capital,population,flags,cca2');
  }

  buscarPais(termino: string): Observable<Country[]>{
    const url = `${ this.apiUrl }/name/${ termino }`
    // Podemos hacerlo asi, donde se maneja el observable enviando un arreglo vacio en caso de no encontrar nada
    //return this.http.get(url)
    //        .pipe(
    //          catchError( err => of([]))
    //        );
    // o se puede dejar normal y atajar la respuesta para validarla en el servicio
    const params = new HttpParams() // SEGUNDA forma para buscar por Parametros, usamos el httpParams, crea un objeto que almacenara los pametros
      .set('fields', 'name,capital,population,flags,cca2') // el objetivo es buscar unos campos especificos, hara el resultado menos pesado
      //.set() -> aca puedo setear cuantos parametros desee para armar el objeto y pasarlo luego
    return this.http.get<Country[]>(url, { params }); // la propiedad que recibe se llama params, pero como asi tambien se llama la const entonces lo coloco solo una vez
  }

  buscarCapital(termino: string): Observable<Country[]>{ // PRIMERA forma para pasar parametros, es muy simple
    const url = `${ this.apiUrl }/capital/${ termino }?fields=name,capital,population,flags,cca2`
    return this.http.get<Country[]>(url);
  }

  getPaisPorAlpha(id: string): Observable<Country[]>{
    const url = `${ this.apiUrl }/alpha/${ id }`
    return this.http.get<Country[]>(url);
  }

  buscarPaisPorRegion(termino: string): Observable<Country[]>{ // Nos devuelve un observable de tipo Country y, es un array que contiene uno o varios objetos
    const url = `${ this.apiUrl }/region/${ termino }`;
    return this.http.get<Country[]>(url, { params: this.getPaisParamsHttp() }); // TERCERA forma, Aca vemos que la url no tiene options para configurar algunos parametros
  }

  buscarClima(termino: string): Observable<Clima>{ // Nos devuelve un observable de tipo Clima y, es un objeto
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json';
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {q: termino},
      headers: {
        'X-RapidAPI-Key': 'edbe4ec97fmsh1c169e374818823p133cb7jsn2ec462bddea3',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    }; 
    return this.http.get<any>(url, options); // CUARTA forma, Aca le pasamos la URL y el options con varios parametros configurados
  }

  buscarCovid(termino: string): Observable<Clima>{ // Nos devuelve un observable de tipo Clima y, es un objeto
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json';
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {country: termino},
      headers: {
        'X-RapidAPI-Key': 'edbe4ec97fmsh1c169e374818823p133cb7jsn2ec462bddea3',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      }
    };
    return this.http.get<Clima>(url, options); // otra igual a la CUARTA forma, Aca le pasamos la URL y el options con varios parametros configurados
  }

  buscarClima2(termino: string){
    const promise = new Promise<Clima | void>((resolve, reject) => {
      const url = 'https://weatherapi-com.p.rapidapi.com/current.json';
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: termino},
        headers: {
          'X-RapidAPI-Key': 'edbe4ec97fmsh1c169e374818823p133cb7jsn2ec462bddea3',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      }; 
      this.http.get<Clima>(url, options).subscribe({
        next: (res) => {
          console.log(res);
          resolve();
        },
        error: (err) => {
          console.log(err);
          reject();
        }
      });
    });
    return promise;
  }

}
