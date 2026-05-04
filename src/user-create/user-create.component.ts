import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { IUser } from '../interfaces/IUser';
import { IUserForm } from '../interfaces/IUserForm';

@Component({
  selector: 'app-user-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  
  @Output() userSubmit: EventEmitter<IUser> = new EventEmitter<IUser>();
  
  private fb: FormBuilder = inject(FormBuilder);
  
  createUserForm: FormGroup<IUserForm> = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    address: this.fb.group({
      city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      street: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      suite: new FormControl('', [Validators.maxLength(50)]),
      zipcode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      geo: this.fb.group({
        lat: new FormControl('', [Validators.required]),
        lng: new FormControl('', [Validators.required]),
      }),
    }),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]),
    website: new FormControl('', [Validators.maxLength(100)]),
    company: this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      catchPhrase: new FormControl('', [Validators.maxLength(200)]),
      bs: new FormControl('', [Validators.maxLength(100)]),
    }),
  });

  onSubmit(): void {
    const newUser: IUser = {...this.createUserForm.value, id: Date.now()};
    this.userSubmit.emit(newUser);
    this.createUserForm.reset();
  }

}
