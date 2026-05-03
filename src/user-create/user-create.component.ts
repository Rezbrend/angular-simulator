import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  
  @Output() userSubmit = new EventEmitter<IUser>();
  
  createUserForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    username: new FormControl<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    email: new FormControl<string>('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    phone: new FormControl<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    website: new FormControl<string>('', [Validators.maxLength(100)]),
    address: new FormGroup({
      street: new FormControl<string>('', [Validators.required, Validators.maxLength(100)]),
      suite: new FormControl<string>('', [Validators.maxLength(50)]),
      city: new FormControl<string>('', [Validators.required, Validators.maxLength(50)]),
      zipcode: new FormControl<string>('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)])
    }),
    geo: new FormGroup({
      lat: new FormControl<string | number>('', Validators.required),
      lng: new FormControl<string | number>('', Validators.required)
    }),
    company: new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.maxLength(50)]),
      catchPhrase: new FormControl<string>('', [Validators.maxLength(200)]),
      bs: new FormControl<string>('', [Validators.maxLength(100)])
    })
  });

  onSubmit(): void {
    const newUser: IUser = { ...this.createUserForm.value, id: Date.now() };
    this.userSubmit.emit(newUser);
    this.createUserForm.reset();
    console.log(newUser);
  }

}
