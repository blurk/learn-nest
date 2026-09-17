export class User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;

  constructor(id: string, username: string, email: string, createdAt: Date) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.createdAt = createdAt;
  }
}
