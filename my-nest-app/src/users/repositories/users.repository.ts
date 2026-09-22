import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly ormRepo: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const newUser = await this.ormRepo.save(user);
    return newUser;
  }

  async findById(id: string): Promise<User | null> {
    return this.ormRepo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.ormRepo.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.ormRepo.find();
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    await this.ormRepo.update(id, data);
    return (await this.findById(id))!;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
