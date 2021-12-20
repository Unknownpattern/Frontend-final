export class User {
  constructor(
    public email: string,
    public id: string,
    public token: string,
    public name: string,
    public isAdmin: boolean
  ) {}
}
