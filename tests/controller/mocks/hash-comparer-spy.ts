import { IHashComparer } from '@/controller/protocols'

export class HashComparerSpy implements IHashComparer {
  password: string = ''
  hashedPassword: string = ''
  isPasswordValid: boolean = true

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    this.password = password
    this.hashedPassword = hashedPassword
    return this.isPasswordValid
  }
}
