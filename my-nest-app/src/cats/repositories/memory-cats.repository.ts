import { CreateCatDto } from '../create-cat.dto';
import { CatEntity } from '../entities/cat.entity';

export class MemoryCatsRepository {
  private cats: CatEntity[] = [];
  constructor() {
    this.cats = [];
  }

  create(newCat: CreateCatDto) {
    this.cats.push(newCat);
    return this.cats.length;
  }

  findAll() {
    return this.cats;
  }
}
