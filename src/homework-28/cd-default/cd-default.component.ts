import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, inject } from '@angular/core';

@Component({
  selector: 'app-cd-default',
  imports: [],
  templateUrl: './cd-default.component.html',
  styleUrl: './cd-default.component.scss',
})
export class CdDefaultComponent implements DoCheck {
  
  count = 0;
  private http: HttpClient = inject(HttpClient);

  ngDoCheck() {
    console.warn('Change Detection');
  };

  changeCountClick() {
    this.count++;
  };
  
  // Значение поменялось автоматически, ngDoCheck() 1 раз, ChangeDetectorRef не понадобился

  changeCountSetTimeout() {
    setTimeout(() => {
      this.count++;
    }, 100);
  };
  
  // Значение поменялось с паузой, ngDoCheck() 2 раз, ChangeDetectorRef не понадобился

  changeCountPromise() {
    Promise.resolve().then(() => {
      this.count++;
    });
  };
  
  // Значение поменялось автоматически, ngDoCheck() 1 раз, ChangeDetectorRef не понадобился

  changeCountHttpClient() {
    this.http.get('https://jsonplaceholder.typicode.com/posts/1').subscribe(() => {
      this.count++;
    });
  };
  
  // Значение поменялось автоматически пару секунд, ngDoCheck() 2 раз, ChangeDetectorRef не понадобился

  changeCountSetInterval() {
    setInterval(() => {
      this.count++;
    }, 1000);
  };
  
  // Значение поменялось автоматически, ngDoCheck() 10 раз, ChangeDetectorRef не понадобился

  changeCountCombo() {
    this.count++;
    setTimeout(() => { this.count++; }, 100);
    Promise.resolve().then(() => { this.count++; });
  };
  
  // значения появились по очереди значения 200 и 300, но не было события клик значения 100, видимо оно было секунду, а потом перезаписалось на 200.
  // ngDoCheck() 3 раза, ChangeDetectorRef не понадобился
  
}
