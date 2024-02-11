import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ default: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ default: 'description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ default: false })
  deleted: boolean;
}
