import { MailerService } from '@nestjs-modules/mailer';
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
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './entities/users.entity';

import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
import Role from 'src/common/config/role.enum';
import { UpdateUsersDto } from './dto/update-users.dto';

dotenv.config();

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private mailService: MailerService,
  ) {}

  async getAllUsers(): Promise<Users[]> {
    try {
      const users = await this.userRepository.find({
        where: {
          role: Role.user,
          deleted: false,
        },
      });
      return users;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async sendMail(
    toEmail: string,
    subject: string,
    content: string,
    fileName?: string,
    filePath?: string,
  ): Promise<void> {
    try {
      if (fileName && filePath) {
        await this.mailService.sendMail({
          to: toEmail,
          from: process.env.EMAIL_USERNAME,
          subject: subject,
          text: content,
          attachments: [{ filename: fileName, path: filePath }],
        });
      } else {
        await this.mailService.sendMail({
          to: toEmail,
          from: process.env.EMAIL_USERNAME,
          subject: subject,
          text: content,
        });
      }
      return;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findUserById(id: number) {
    try {
      const result = await this.userRepository.findOneBy({
        deleted: false,
        id,
      });
      return result?.deleted ? null : result;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async findUserByPseudo(pseudo: string) {
    try {
      const result = await this.userRepository.findOneBy({
        deleted: false,
        pseudo,
      });
      return result?.deleted ? null : result;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async findUserByEmail(email: string) {
    try {
      const result = await this.userRepository.findOneBy({
        deleted: false,
        email,
      });
      return result?.deleted ? null : result;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async validateAccount(code: string) {
    try {
      const result = await this.userRepository.findOneBy({
        deleted: false,
        code,
      });
      if (result && result.activated) {
        throw new ConflictException('Your account already activated');
      } else if (result && !result.activated) {
        await this.userRepository.update(result.id, { activated: true });
        return 'Your account has been activated successfully';
      } else {
        throw new ForbiddenException('Invalid code validation');
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async sendEmailVerification(email: string, uri: string) {
    try {
      await this.sendMail(
        email,
        'Verification Account',
        `Please click of this link to verify your account:
        Link: ${uri}`,
      ).catch((e) => {
        return Promise.reject(
          new InternalServerErrorException(
            'An error occurred while sending the email',
          ),
        );
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async create(data: CreateUsersDto) {
    if (
      (await this.findUserByEmail(data.email)) ||
      (await this.findUserByPseudo(data.pseudo))
    ) {
      throw new ConflictException('User alrealdy exist');
    } else {
      try {
        data.password = bcrypt.hashSync(data.password, process.env.SALT);
        const dto = { ...data, code: crypto.randomBytes(20).toString('hex') };
        const res = await this.userRepository.save(dto);
        const url = `${process.env.HOST_APP}/auth/validateAccount/${res.code}`;
        await this.sendEmailVerification(res.email, url);
        return res;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async update(id: number, dto: Partial<UpdateUsersDto>): Promise<Users> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id, deleted: false },
      });
      if (user) {
        await this.userRepository.update({ id }, { ...dto });
        for (const [key, value] of Object.entries(dto)) {
          user[key] = value;
        }
        return user;
      } else {
        throw new ForbiddenException('Ressource not found');
      }
    } catch (e) {
      if ((e?.message as string).includes('User'))
        throw new ForbiddenException('user not found');
      throw new InternalServerErrorException(e);
    }
  }

  async delete(id: number) {
    if (await this.findUserById(id)) {
      try {
        const result = await this.userRepository.update(
          { id: id },
          { deleted: true },
        );
        if (result) return { data: 'Successfully delete' };
      } catch (error) {
        throw new InternalServerErrorException('Something went wrong', error);
      }
    } else {
      throw new NotFoundException('user not found');
    }
  }
}
