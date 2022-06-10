import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  @Input() placeholder!: string;
  termino: string = '';
  hayError: boolean = false;
  public paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  buscarx(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
        console.log(paises);
        this.paises = paises;
      },
      error: (err) => {
        this.hayError = true;
        this.paises = [];
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

  }
}
