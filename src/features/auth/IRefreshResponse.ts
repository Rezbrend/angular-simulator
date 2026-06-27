import { IAuth } from "./iauth";

export interface IRefreshResponse {
  accessToken: string;
  refreshToken?: string;
  user?: IAuth;
}