import {
    BadRequestException,
    ConflictException, Injectable,
    InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comments } from './entities/comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments) private commentRepository: Repository<Comments>,
  ) {}

  async findCommentByTopicId(topicId: number) {
    try {
      const result = await this.commentRepository.findOneBy({
        deleted: false,
        topicId,
      });
      return result?.deleted ? null : result;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async create(data: CreateCommentDto) {
    if (await this.findCommentByTopicId(data.topicId)) {
      throw new ConflictException('Comment alrealdy exist');
    } else {
      try {
        const res = await this.commentRepository.save(data);
        return res;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
