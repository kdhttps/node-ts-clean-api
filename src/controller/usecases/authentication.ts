import { TAuthenticationParams, TAuthenticationResult, IAuthentication } from '@/domain/usecases/i-authentication'
import { ILoadAccountByEmail } from '@/controller/protocols/db/i-load-account-by-email'

export class Authentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmail: ILoadAccountByEmail
  ) {}

  async auth (authParams: TAuthenticationParams): Promise<TAuthenticationResult> {
    await this.loadAccountByEmail.get(authParams.email)
    return { accessToken: 'test' }
  }
}
