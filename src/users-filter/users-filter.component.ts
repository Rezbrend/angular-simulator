import { Component, Output, EventEmitter, inject, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ReactiveFormsModule]
})
export class UsersFilterComponent {
  
  @Output() filterChange: EventEmitter<string | null> = new EventEmitter<string | null>();
  
  destroyRef: DestroyRef = inject(DestroyRef);

  userName: FormControl<string | null> = new FormControl<string | null>('');

  constructor() {
    this.userName.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap((item: string | null) => {
          const filteredItem: string | null = item?.trim() || null;
          this.filterChange.emit(filteredItem);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
    .subscribe();
  }
  
}
