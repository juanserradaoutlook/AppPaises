import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button {
      margin-right: 5px;
    }
    `
  ]
})
export class PorRegionComponent {

  public regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  public regionActiva : string = '';
  termino: string = '';
  hayError: boolean = false;
  public paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  getClaseCSS(region: string): string{
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary';

  }

  activarRegion (region: string){
    if(region === this.regionActiva){ return;}
    this.regionActiva = region;
    this.hayError = false;
    this.termino = region;
    this.paises = [];
    this.paisService.buscarPaisPorRegion(this.termino).subscribe({
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
