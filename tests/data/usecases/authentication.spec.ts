interface IAuthentication {
  auth: (authParams: Authentication.Params) => Promise<Authentication.Result>
}

interface ILoadAccountByEmail {
  get: (email: string) => Promise<LoadAccountByEmail.Result>
}

namespace LoadAccountByEmail {
  export type Result = {
    id: string
    email: string
    password: string
  }
}

namespace Authentication {
  export type Params = {
    email: string
    password: string
  }

  export type Result = {
    accessToken: string
  }
}

class Authentication implements IAuthentication {
  constructor(
    private readonly loadAccountByEmail: ILoadAccountByEmail
  ) {}

  async auth(authParams: Authentication.Params): Promise<Authentication.Result> {
    const user = this.loadAccountByEmail.get(authParams.email)
    return { accessToken: "test" }
  }
}

class LoadAccountByEmailSpy implements ILoadAccountByEmail {
  email: string = ''
  result: LoadAccountByEmail.Result = {
    id: '123',
    email: 'valid@email.com',
    password: 'valid@123'
  }

  async get (email: string): Promise<LoadAccountByEmail.Result> {
    this.email = email
    return this.result
  }
}

describe('Authentication usecase', () => {
  test('Should call LoadAccountByEmail repository with correct email', async () => {
    const authParams: Authentication.Params = {
      email: "valid@email.com",
      password: "123"
    }
    const loadAccountbyEmail = new LoadAccountByEmailSpy()
    const sut = new Authentication(loadAccountbyEmail)
    await sut.auth(authParams)
    expect(loadAccountbyEmail.email).toBe(authParams.email)
  })
})
