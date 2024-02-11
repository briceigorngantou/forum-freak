import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  topicId: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ default: false })
  deleted: boolean;
}
