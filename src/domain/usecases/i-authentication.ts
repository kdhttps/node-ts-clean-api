export interface IAuthentication {
  auth: (authParams: AuthenticationParams) => Promise<AuthenticationResult>
}

export interface AuthenticationParams {
  email: string
  password: string
}

export interface AuthenticationResult {
  accessToken: string
}
