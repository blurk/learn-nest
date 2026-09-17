import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async createUser(username: string, email: string): Promise<User> {
    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      email,
      createdAt: new Date(),
    };

    return this.userRepo.createUser(newUser);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
