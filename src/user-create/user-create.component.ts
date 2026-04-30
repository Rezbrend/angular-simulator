import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user-create',
  imports: [ FormsModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  
  @Output() userSubmitted = new EventEmitter<any>();
  
  createUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    username: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]),
    website: new FormControl('', [Validators.maxLength(100)]),

    address: new FormGroup({
      street: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      suite: new FormControl('', [Validators.maxLength(50)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      zipcode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      geo: new FormGroup({
        lat: new FormControl('', Validators.required),
        lng: new FormControl('', Validators.required)
      })
    }),

    company: new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      catchPhrase: new FormControl('', [Validators.maxLength(200)]),
      bs: new FormControl('', [Validators.maxLength(100)])
    })
  });

  onSubmit(): void {
    if (this.createUserForm.valid) {
      const newUser: IUser = { ...this.createUserForm.value, id: Date.now() };
      this.userSubmitted.emit(newUser);
      this.createUserForm.reset();
      console.log(newUser)
    }
  }

}
