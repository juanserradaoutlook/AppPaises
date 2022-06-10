import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { observable, switchMap, tap } from 'rxjs';
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
  constructor(private activateRoute: ActivatedRoute, private paisService: PaisService) { }

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
          this.pais = pais[0];
        },
        
      });
  }

}
