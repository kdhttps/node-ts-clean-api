interface IAuthentication {
  auth: (authParams: AuthenticationParams) => Promise<AuthenticationResult>
}

interface ILoadAccountByEmail {
  get: (email: string) => Promise<LoadAccountByEmailResult>
}

interface LoadAccountByEmailResult {
  id: string
  email: string
  password: string
}

interface AuthenticationParams {
  email: string
  password: string
}

interface AuthenticationResult {
  accessToken: string
}

class Authentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmail: ILoadAccountByEmail
  ) {}

  async auth (authParams: AuthenticationParams): Promise<AuthenticationResult> {
    await this.loadAccountByEmail.get(authParams.email)
    return { accessToken: 'test' }
  }
}

class LoadAccountByEmailSpy implements ILoadAccountByEmail {
  email: string = ''
  result: LoadAccountByEmailResult = {
    id: '123',
    email: 'valid@email.com',
    password: 'valid@123'
  }

  async get (email: string): Promise<LoadAccountByEmailResult> {
    this.email = email
    return this.result
  }
}

describe('Authentication usecase', () => {
  test('Should call LoadAccountByEmail repository with correct email', async () => {
    const authParams: AuthenticationParams = {
      email: 'valid@email.com',
      password: '123'
    }
    const loadAccountbyEmail = new LoadAccountByEmailSpy()
    const sut = new Authentication(loadAccountbyEmail)
    await sut.auth(authParams)
    expect(loadAccountbyEmail.email).toBe(authParams.email)
  })
})
