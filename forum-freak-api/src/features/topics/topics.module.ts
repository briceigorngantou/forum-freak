import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topics } from './entities/topics.entity';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

@Module({
  imports:[TypeOrmModule.forFeature([Topics]),
  PassportModule.register({
    defaultStrategy: 'jwt',
  })],
  controllers: [TopicsController],
  providers: [TopicsService]
})
export class TopicsModule {}
