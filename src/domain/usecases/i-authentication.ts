export interface IAuthentication {
  auth: (authParams: TAuthenticationParams) => Promise<TAuthenticationResult>
}

export interface TAuthenticationParams {
  email: string
  password: string
}

export interface TAuthenticationResult {
  accessToken: string
}
