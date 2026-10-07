import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {

  user = {
    name: 'Alex',
    age: 20
  };

  changeName(): void {
    this.user = {
      ...this.user,
      name: 'Eugene'
    };
  };

}

// В методе changeName() мы мутируем существующий объект: this.user.name = 'Eugene'. 
// Ссылка на объект user остаётся прежней, поэтому Angular не фиксирует изменение и не перерисовывает ChildComponent.