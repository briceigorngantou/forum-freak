import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comments } from './entities/comments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
