import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async createUser(
    username: string,
    email: string,
    passwordHash: string,
  ): Promise<User> {
    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      email,
      passwordHash,
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

  async getUsers(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.getUserById(id);

    return this.userRepo.update(id, updateUserDto);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);

    await this.userRepo.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }
}
