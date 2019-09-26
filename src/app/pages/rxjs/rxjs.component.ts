import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    let contador = 1;
    let obs = new Observable( observer => {
      let intervalo = setInterval( () => {
        contador++;
        observer.next(contador);

        if (contador === 3) {
          clearInterval( intervalo );
          observer.complete();
        } else {
          observer.error();
        }

      }, 1000);
    });

    
    obs.subscribe( numero => console.log('Subs ', numero),
                   error => console.log('Error', error),
                   () => console.log("El observador termina")
                   );

  }

  ngOnInit() {
  }

}
