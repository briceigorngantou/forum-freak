import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import Role from 'src/common/config/role.enum';

export class CreateUsersDto {
  @ApiProperty({ default: 'florian' })
  @IsNotEmpty()
  @IsString()
  pseudo: string;

  @ApiProperty({ default: 'florian@test.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'florian' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ default: 'banner florian' })
  @IsNotEmpty()
  @IsString()
  banner: string;

  @ApiProperty({ default: 'admin' })
  @IsNotEmpty()
  @IsString()
  @IsEnum(['user', 'admin'], {
    message: 'Role must either be user or admin',
  })
  role: Role;

  @ApiProperty({ default: '2024-01-01' })
  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @ApiProperty({ default: false })
  deleted: boolean;

  @ApiProperty({ default: false })
  activated: boolean;
}
