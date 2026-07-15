import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { IUser } from '../interfaces/IUser';
import { BoldOnHoverDirective } from '../app/hover.directive';
import { BorderDirective } from '../app/border.directive';

type ModelFormGroup<T> = {
  [K in keyof T]: T[K] extends object ? FormGroup<ModelFormGroup<T[K]>> : FormControl<T[K]>;
};

@Component({
  selector: 'app-user-create',
  imports: [FormsModule, ReactiveFormsModule, BoldOnHoverDirective, BorderDirective],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  
  @Output() userSubmit: EventEmitter<IUser> = new EventEmitter<IUser>();
  
  fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  
  createUserForm: FormGroup<ModelFormGroup<IUser>> = new FormGroup({
    id: this.fb.control(Date.now()),
    name: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    username: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    phone: this.fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]),
    website: this.fb.control('', [Validators.maxLength(100)]),
    address: this.fb.group({
      city: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
      street: this.fb.control('', [Validators.required, Validators.maxLength(100)]),
      suite: this.fb.control(0, [Validators.maxLength(50)]),
      zipcode: this.fb.control(0, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      geo: this.fb.group({
        lat: this.fb.control(0, [Validators.required]),
        lng: this.fb.control(0, [Validators.required]),
      }),
    }),
    company: this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
      catchPhrase: this.fb.control('', [Validators.maxLength(200)]),
      bs: this.fb.control('', [Validators.maxLength(100)]),
    }),
  });

  onSubmit(): void {
    const newUser: IUser = { ...this.createUserForm.getRawValue() };
    this.userSubmit.emit(newUser);
    this.createUserForm.reset();
  }

}
