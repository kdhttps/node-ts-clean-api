import { TAuthenticationParams, TAuthenticationResult, IAuthentication } from '@/domain/usecases'
import { ILoadAccountByEmail } from '@/controller/protocols'

export class Authentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmail: ILoadAccountByEmail
  ) {}

  async auth (authParams: TAuthenticationParams): Promise<TAuthenticationResult> {
    const account = await this.loadAccountByEmail.get(authParams.email)
    if (account == null || account === undefined) {
      return null as any
    }

    return { accessToken: 'test' }
  }
}
