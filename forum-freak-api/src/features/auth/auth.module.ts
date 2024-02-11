import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY_AUTH_QRCODE,
      signOptions: { expiresIn: 10368000 },
    }),
    UsersModule,
  ],
  providers: [AuthService, UsersService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
