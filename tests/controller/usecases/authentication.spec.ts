import { TAuthenticationParams } from '@/domain/usecases/i-authentication'
import { ILoadAccountByEmail, TLoadAccountByEmailResult } from '@/controller/protocols/db/i-load-account-by-email'
import { Authentication } from '@/controller/usecases'
import { throwError } from '@/tests/domain/test-helpers'

class LoadAccountByEmailSpy implements ILoadAccountByEmail {
  email: string = ''
  result: TLoadAccountByEmailResult = {
    id: '123',
    email: 'valid@email.com',
    password: 'valid@123'
  }

  async get (email: string): Promise<TLoadAccountByEmailResult> {
    this.email = email
    return this.result
  }
}

describe('Authentication usecase', () => {
  test('Should call LoadAccountByEmail repository with correct email', async () => {
    const authParams: TAuthenticationParams = {
      email: 'valid@email.com',
      password: '123'
    }
    const loadAccountbyEmail = new LoadAccountByEmailSpy()
    const sut = new Authentication(loadAccountbyEmail)
    await sut.auth(authParams)
    expect(loadAccountbyEmail.email).toBe(authParams.email)
  })

  test('Should throw if LoadAccountByEmail repository throws', async () => {
    const authParams: TAuthenticationParams = {
      email: 'valid@email.com',
      password: '123'
    }
    const loadAccountbyEmail = new LoadAccountByEmailSpy()
    jest.spyOn(loadAccountbyEmail, 'get').mockImplementationOnce(throwError)
    const sut = new Authentication(loadAccountbyEmail)
    await expect(sut.auth(authParams)).rejects.toThrow()
  })
})
