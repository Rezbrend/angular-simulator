import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LoaderService } from '../loader.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  loaderService: LoaderService = inject(LoaderService);
  isLoading$: Observable<boolean> = this.loaderService.isLoading$;

}
