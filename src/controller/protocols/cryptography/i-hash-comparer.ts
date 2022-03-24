export interface IHashComparer {
  compare: (password: string, hashedPassword: string) => Promise<boolean>
}
