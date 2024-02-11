import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTopicsDto {
  @ApiProperty({ default: 'title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ default: 'message' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({ default: false })
  deleted: boolean;
}
