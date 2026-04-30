import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  imports: [],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {
  
  @Output() filterChange = new EventEmitter<string | null>();

  constructor() {
    this.unsubscribe = this.userName.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        takeUntilDestroyed(),
        tap((item: string | null) => this.filterChange.emit(item)),
      )
    .subscribe();
  }
  
  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

  private unsubscribe: Subscription;
  userName = new FormControl<string | null>('');
  
}
