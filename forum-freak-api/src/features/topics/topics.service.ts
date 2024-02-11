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
import { CreateTopicsDto } from './dto/create-topic.dto';
import { UpdateTopicsDto } from './dto/update-topic.dto';
import { Topics } from './entities/topics.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topics) private topicRepository: Repository<Topics>,
  ) {}

  async getAllTopics(): Promise<Topics[]> {
    try {
      const topics = await this.topicRepository.find({
        where: {
          deleted: false,
        },
      });
      return topics;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findTopicById(id: number) {
    try {
      const result = await this.topicRepository.findOneBy({
        deleted: false,
        id,
      });
      return result?.deleted ? null : result;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async findTopicByTitle(title: string) {
    try {
      const result = await this.topicRepository.findOneBy({
        deleted: false,
        title,
      });
      return result?.deleted ? null : result;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async create(data: CreateTopicsDto) {
    if (await this.findTopicByTitle(data.title)) {
      throw new ConflictException('Topic alrealdy exist');
    } else {
      try {
        const res = await this.topicRepository.save(data);
        return res;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async update(id: number, dto: Partial<UpdateTopicsDto>): Promise<Topics> {
    try {
      const topic = await this.topicRepository.findOneOrFail({ where: { id } });
      if (topic && !topic.deleted) {
        await this.topicRepository.update({ id }, { ...dto });
        for (const [key, value] of Object.entries(dto)) {
          topic[key] = value;
        }
        return topic;
      } else {
        throw new ForbiddenException('Ressource not found');
      }
    } catch (e) {
      if ((e?.message as string).includes('Topic'))
        throw new ForbiddenException('topic not found');
      throw new InternalServerErrorException(e);
    }
  }

  async delete(id: number) {
    if (await this.findTopicById(id)) {
      try {
        const result = await this.topicRepository.update(
          { id: id },
          { deleted: true },
        );
        if (result) return { data: 'Successfully delete' };
      } catch (error) {
        throw new InternalServerErrorException('Something went wrong', error);
      }
    } else {
      throw new NotFoundException('topic not found');
    }
  }
}
