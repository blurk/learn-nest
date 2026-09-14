import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MemoryCatsRepository } from './repositories/memory-cats.repository';

@Module({
  controllers: [CatsController],
  providers: [CatsService, MemoryCatsRepository],
})
export class CatsModule {}
