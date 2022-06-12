import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { observable, switchMap, tap } from 'rxjs';
import { Clima } from '../../interfaces/clima.interface';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  public pais!: Country;
  public climaPais!: Clima;
  constructor(private activateRoute: ActivatedRoute, private paisService: PaisService ) { }

  ngOnInit(): void {
    //this.activateRoute.params.subscribe(
    //  ({id}) => {
    //    console.log(id);
    //    this.paisService.getPaisPorAlpha(id).subscribe(
    //      pais => {
    //        console.log(pais);
    //      });
    //  });

    //Usamos el this.activateRoute.params para leer los parametros que son enviados desde la ruta permitida (configurada en el routing),
    //esa ruta es el routerlink que esta en la tabla-pais (es el <a>Ver...</>),
    //con el .pipe vamos a leer el parametro,
    //con el switchMap vamos a generar un observable que contiene la respuesta del servicio que llamamos despues de la funcion flecha,
    //usamos la desestructuracion de parametros de tal forma que apuntamos directamente al id (parametro recibido) usandolo asi {id},
    //obviamente nos dara resp como respuesta, el cual es otro observable,
    //la cosa era no usar dos subscribe al mismo tiempo como esta arriba
    //el tap imprimira la respuesta, el observable obtenido por el switchMap
    this.activateRoute.params
      .pipe(
        switchMap( ({id})  => this.paisService.getPaisPorAlpha(id) ),
        tap(resp => console.log(resp))
      )
      .subscribe({
        next: (pais) => {
          console.log(pais);
          this.pais = pais[0]; // Pais nos devuelve un array y dentro esta un objeto, ahi esta la info, es por eso que leo o extraigo el primer elemento (unico) del arreglo

            this.paisService.buscarClima(this.pais.name.common).subscribe({
              next: (clima) => {
                console.log(clima);
                this.climaPais = clima; // Clima por el contrario nos devuelve un objeto de una vez
              },
              error: (err) => {
                console.log('Error al Localizar el Clima...');
                console.error();
                console.info(err);   
              },
              complete: () => {
                this.paisService.buscarClima2(this.pais.name.common)
                .then((val) => console.log(val))

                console.info('Clima Completado');
              }
            });
        },
        error: (err) => {
          console.log('Error al Localizar el Pais...');
          console.error();
          console.info(err);   
        },
        complete: () => { // No esta pasando por el complete del primer servicio, solo muestr el complete de Clima
          console.log('Pais COmpletado');
        }
      });
  }

}
