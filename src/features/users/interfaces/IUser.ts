export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
    street: string;
    suite: number;
    zipcode: number;
    geo: {
      lat: number;
      lng: number;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
