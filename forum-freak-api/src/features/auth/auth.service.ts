import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async validateUser(pseudo: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { pseudo: pseudo },
    });

    const newPass = bcrypt.hashSync(password, process.env.SALT);
    if (user && newPass === user.password) {
      return user;
    } else {
      return null;
    }
  }

  async login(payload: LoginDto): Promise<any> {
    const userExist = await this.validateUser(payload.pseudo, payload.password);
    if (userExist) {
      const { ...user } = userExist;
      if (Object.keys(user).length === 0) {
        throw new UnauthorizedException({
          message: 'Invalid e-mail or password. Try again.',
        });
      } else {
        return {
          user: user,
          accessToken: this.jwtService.sign({
            authentificate: 'true',
            id: user?.id,
            email: user?.email,
            role: user?.role,
          }),
        };
      }
    } else {
      throw new UnauthorizedException({
        message: 'Invalid e-mail or password. Try again.',
      });
    }
  }
}
