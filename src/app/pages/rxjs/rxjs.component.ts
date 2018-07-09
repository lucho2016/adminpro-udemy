import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor() {
    this.subscription = this.regresaObservable()
      .retry()
      .subscribe(
      numero => console.log( 'Subs ', numero ),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!!')
    );
  }

  ngOnInit() {
  }

  // se ejecuta cuando se termina el ciclo de vida de una página
  ngOnDestroy() {

    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( observer => {
      let contador = 0;

      let intervalo = setInterval ( () => {
         contador += 1;

         let salida = {
           valor: contador
         };

         observer.next( salida );

          //  if ( contador === 3) {
          //    clearInterval( intervalo );
          //    observer.complete();
          //  }

          //  if ( contador === 2) {
          //    clearInterval( intervalo );
          //    observer.error('Auxilio');
          //  }

        }, 500 );
     })
      .retry(2)
      .map( (resp: any) => {
        return resp.valor;
      })
      .filter( (valor, index) => {

        if ((valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      });


  }

}
