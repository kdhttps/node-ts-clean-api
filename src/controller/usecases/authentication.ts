import { TAuthenticationParams, TAuthenticationResult, IAuthentication } from '@/domain/usecases'
import { ILoadAccountByEmail } from '@/controller/protocols'

export class Authentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmail: ILoadAccountByEmail
  ) {}

  async auth (authParams: TAuthenticationParams): Promise<TAuthenticationResult> {
    await this.loadAccountByEmail.get(authParams.email)
    return { accessToken: 'test' }
  }
}
