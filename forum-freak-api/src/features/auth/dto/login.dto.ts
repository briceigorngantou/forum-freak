import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'pseudo' })
  @IsString()
  @IsNotEmpty()
  pseudo: string;

  @ApiProperty({ default: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
