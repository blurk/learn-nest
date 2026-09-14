import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { MemoryCatsRepository } from './repositories/memory-cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catRepository: MemoryCatsRepository) {}

  create(dto: CreateCatDto) {
    if (dto.age < 0) {
      throw new BadRequestException('Age cannot be negative');
    }

    this.catRepository.create(dto);

    return dto;
  }

  findAll() {
    return this.catRepository.findAll();
  }
}
