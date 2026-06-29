import { IAuthUser } from "./IAuthUser";

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: IAuthUser;
}