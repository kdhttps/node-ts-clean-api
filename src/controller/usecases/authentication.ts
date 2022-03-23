import { AuthenticationParams, AuthenticationResult, IAuthentication } from '@/domain/usecases/i-authentication'

export class Authentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmail: ILoadAccountByEmail
  ) {}

  async auth (authParams: AuthenticationParams): Promise<AuthenticationResult> {
    await this.loadAccountByEmail.get(authParams.email)
    return { accessToken: 'test' }
  }
}
