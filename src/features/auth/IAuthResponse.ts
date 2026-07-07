import { UserRole } from "./UserRole";

export interface IAuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: UserRole; 
  accessToken: string;
  refreshToken: string;
}