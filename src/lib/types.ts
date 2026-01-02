export interface IUser {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
  sub: string;
  access_token?: string;
}

export interface IAppState {
  isOnline: boolean;
  lastNewsUpdateTime: Date;
  lastNewsItemId: number;
}