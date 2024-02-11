import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/common/config/mail.module';
import { Users } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
