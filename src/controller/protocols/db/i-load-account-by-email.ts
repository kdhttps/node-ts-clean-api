export interface ILoadAccountByEmail {
  get: (email: string) => Promise<TLoadAccountByEmailResult>
}

export interface TLoadAccountByEmailResult {
  id: string
  email: string
  password: string
}
