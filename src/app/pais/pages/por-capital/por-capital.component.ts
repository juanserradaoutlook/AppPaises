import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  public paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  buscarx(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarCapital(this.termino).subscribe({
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

 
}
