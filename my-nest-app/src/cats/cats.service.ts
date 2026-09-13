import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class CatsService {
  constructor() {}

  create(dto: CreateCatDto) {
    if (dto.age < 0) {
      throw new BadRequestException('Age cannot be negative');
    }

    return dto;
  }
}
