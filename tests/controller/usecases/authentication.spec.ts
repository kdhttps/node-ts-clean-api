import { TAuthenticationParams } from '@/domain/usecases/i-authentication'
import { Authentication } from '@/controller/usecases'
import { throwError } from '@/tests/domain/test-helpers'
import { LoadAccountByEmailSpy } from '@/tests/controller/mocks'

const makeSUT = (): any => {
  const authParams: TAuthenticationParams = {
    email: 'valid@email.com',
    password: '123'
  }
  const loadAccountByEmail = new LoadAccountByEmailSpy()
  const sut = new Authentication(loadAccountByEmail)

  return {
    sut,
    loadAccountByEmail,
    authParams
  }
}

describe('Authentication usecase', () => {
  test('Should call LoadAccountByEmail repository with correct email', async () => {
    const { sut, authParams, loadAccountByEmail } = makeSUT()
    await sut.auth(authParams)
    expect(loadAccountByEmail.email).toBe(authParams.email)
  })

  test('Should throw if LoadAccountByEmail repository throws', async () => {
    const { sut, authParams, loadAccountByEmail } = makeSUT()
    jest.spyOn(loadAccountByEmail, 'get').mockImplementationOnce(throwError)
    await expect(sut.auth(authParams)).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmail repository returns null', async () => {
    const { sut, authParams, loadAccountByEmail } = makeSUT()
    loadAccountByEmail.result = null
    const token = await sut.auth(authParams)
    expect(token).toBeNull()
  })

  test('Should return null if LoadAccountByEmail repository returns undefined', async () => {
    const { sut, authParams, loadAccountByEmail } = makeSUT()
    loadAccountByEmail.result = undefined
    const token = await sut.auth(authParams)
    expect(token).toBeNull()
  })
})
