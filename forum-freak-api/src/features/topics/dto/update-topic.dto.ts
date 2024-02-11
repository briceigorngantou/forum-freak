import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicsDto } from './create-topic.dto';

export class UpdateTopicsDto extends PartialType(CreateTopicsDto) {}
