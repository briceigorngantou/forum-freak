import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAllCategory(): Promise<Category[]> {
    try {
      const category = await this.categoryRepository.find({
        where: {
          deleted: false,
        },
      });
      return category;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findCategoryById(id: number) {
    try {
      const result = await this.categoryRepository.findOneBy({
        id,
        deleted: false,
      });
      return result?.deleted ? null : result;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async findCategoryByName(name: string) {
    try {
      const result = await this.categoryRepository.findOneBy({
        deleted: false,
        name,
      });
      return result?.deleted ? null : result;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async create(data: CreateCategoryDto) {
    if (await this.findCategoryByName(data.name)) {
      throw new ConflictException('Category alrealdy exist');
    } else {
      try {
        const res = await this.categoryRepository.save(data);
        return res;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async update(id: number, dto: Partial<UpdateCategoryDto>): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOneOrFail({
        where: { id },
      });
      if (category && !category.deleted) {
        await this.categoryRepository.update({ id }, { ...dto });
        for (const [key, value] of Object.entries(dto)) {
          category[key] = value;
        }
        return category;
      } else {
        throw new ForbiddenException('Ressource not found');
      }
    } catch (e) {
      if ((e?.message as string).includes('Category'))
        throw new ForbiddenException('category not found');
      throw new InternalServerErrorException(e);
    }
  }

  async delete(id: number) {
    if (await this.findCategoryById(id)) {
      try {
        const result = await this.categoryRepository.update(
          { id: id },
          { deleted: true },
        );
        if (result) return { data: 'Successfully delete' };
      } catch (error) {
        throw new InternalServerErrorException('Something went wrong', error);
      }
    } else {
      throw new NotFoundException('category not found');
    }
  }
}
