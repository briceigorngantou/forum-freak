import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Category]),
  PassportModule.register({
    defaultStrategy: 'jwt',
  })],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
