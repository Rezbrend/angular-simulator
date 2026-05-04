import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  
  @Output() userSubmit: EventEmitter<IUser> = new EventEmitter<IUser>();
  
  private fb: FormBuilder = inject(FormBuilder);
  
  createUserForm: FormGroup = this.fb.group({
    id: [Date.now()],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: [0, [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],
    address: this.fb.group({
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: [0, [Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      zipcode: [0, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.fb.group({
        lat: [0, [Validators.required]],
        lng: [0, [Validators.required]],
      })
    }),

    company: this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]]
    })
  });

  onSubmit(): void {
    const newUser: IUser = { ...this.createUserForm.value, id: Date.now() };
    this.userSubmit.emit(newUser);
    this.createUserForm.reset();
  }

}
