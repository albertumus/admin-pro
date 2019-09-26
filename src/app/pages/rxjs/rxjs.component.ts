import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    

    this.subscription = this.regresarObservable().subscribe( 
      numero => console.log('Subs ', numero),
      error => console.log('Error', error),
      () => console.log("El observador termina")
      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log("Adios Subscribe");
    this.subscription.unsubscribe();

  }

  regresarObservable(): Observable<number> {
    let contador = 0;
    return new Observable( observer => {
      let intervalo = setInterval( () => {
        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // } 
        
        // if (contador === 2) {
        //   //clearInterval( intervalo );
        //   observer.error("Auxilio");
        // }
        

      }, 1000);
    }).pipe(
      map( resp =>  resp.valor ),
      filter( ( valor, index ) => {
        return valor % 2 === 1;
      })
    );

  }

}
