import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }
    .nav-link {
      color: var(--bs-link-color);
    }
    `
  ]
})
export class PorPaisComponent {

  @Input() placeholder!: string;
  termino: string = '';
  hayError: boolean = false;
  public paises: Country[] = [];
  public paisesSugeridos:Country[] = [];
  public mostrarDebounce: boolean = false;

  constructor(private paisService: PaisService) { }

  buscarx(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
        console.log(paises);
        this.paises = paises;
        this.mostrarDebounce = false;
      },
      error: (err) => {
        this.hayError = true;
        this.paises = [];
        this.paisesSugeridos = [];
        console.log(this.hayError);      
        console.log('Error...');
        console.error();
        console.info(err);   
      },
      complete: () => {
        console.info('complete');
      }
    });
  }

  sugerencias(termino: string){
    this.hayError = false;
    this.mostrarDebounce = true;
    this.termino = termino;
    this.paisService.buscarPais(termino).subscribe({
      next:(paises) => {
        this.paisesSugeridos = paises.splice(0, 5);
        console.log(this.paisesSugeridos);
    },
      error: (err) => {
        this.paisesSugeridos = [];
      }
    });

  }
}
