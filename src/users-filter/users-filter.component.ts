import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  
  @Output() filterChange = new EventEmitter<string | null>();

  userName: FormControl<string | null> = new FormControl<string | null>('');

  constructor() {
    this.userName.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap((item: string | null) => {
          const filteredItem = item?.trim() || null;
          this.filterChange.emit(filteredItem);
        }),
        takeUntilDestroyed()
      )
    .subscribe();
  }
  
}
