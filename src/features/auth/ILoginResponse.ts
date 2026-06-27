import { IAuth } from "./iauth";

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IAuth;
}