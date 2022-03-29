import {
  ILoadAccountByEmail,
  TLoadAccountByEmailResult
} from '@/controller/protocols/db/i-load-account-by-email'

export class LoadAccountByEmailSpy implements ILoadAccountByEmail {
  email: string = ''
  result: TLoadAccountByEmailResult = {
    id: '123',
    email: 'valid@email.com',
    password: 'valid@123'
  }

  async get(email: string): Promise<TLoadAccountByEmailResult> {
    this.email = email
    return this.result
  }
}
