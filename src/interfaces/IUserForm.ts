import { FormControl, FormGroup } from '@angular/forms';

export interface IUserForm {
  name: FormControl<string | null>;
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  address: FormGroup<{
    city: FormControl<string | null>;
    street: FormControl<string | null>;
    suite: FormControl<string | null>;
    zipcode: FormControl<string | null>;
    geo: FormGroup<{
      lat: FormControl<string | null>;
      lng: FormControl<string | null>;
    }>;
  }>;
  phone: FormControl<string | null>;
  website: FormControl<string | null>;
  company: FormGroup<{
    name: FormControl<string | null>;
    catchPhrase: FormControl<string | null>;
    bs: FormControl<string | null>;
  }>;
}