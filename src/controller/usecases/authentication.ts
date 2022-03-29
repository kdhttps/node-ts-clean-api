import {
  TAuthenticationParams,
  TAuthenticationResult,
  IAuthentication
} from '@/domain/usecases'
import { ILoadAccountByEmail } from '@/controller/protocols'
import { IHashComparer } from '@/controller/protocols/cryptography/i-hash-comparer'

export class Authentication implements IAuthentication {
  constructor(
    private readonly loadAccountByEmail: ILoadAccountByEmail,
    private readonly hashComparer: IHashComparer
  ) {}

  async auth(
    authParams: TAuthenticationParams
  ): Promise<TAuthenticationResult> {
    const account = await this.loadAccountByEmail.get(authParams.email)
    if (account) {
      const isPasswordValid = await this.hashComparer.compare(
        account.password,
        authParams.password
      )

      if (isPasswordValid) {
        return { accessToken: 'test' }
      }
    }

    return null as any
  }
}
