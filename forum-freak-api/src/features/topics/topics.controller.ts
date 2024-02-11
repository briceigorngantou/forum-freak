import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { ResponseBody } from 'src/common/shared/responsebody';
import { CreateTopicsDto } from './dto/create-topic.dto';
import { UpdateTopicsDto } from './dto/update-topic.dto';
import { TopicsService } from './topics.service';

@Controller('topics')
@ApiTags('Topics')
export class TopicsController {
  constructor(
    private topicService: TopicsService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiBearerAuth()
  // @UseJwt()
  @ApiOperation({
    summary: "Création d'un sujet",
    description: 'Cet EndPoint permet de créer un sujet',
  })
  @ApiResponse({
    status: 200,
    description: "L'Operation a été un succès.",
  })
  async createTopic(@Body() data: CreateTopicsDto) {
    const topic = await this.topicService.create(data);
    return new ResponseBody(topic, null);
  }

  @ApiBearerAuth()
  // @UseJwt()
  @Put(':id')
  @ApiOperation({
    summary: "Mise a jour des données d'un sujet",
    description: 'Cet EndPoint permet de mettre a jour un sujet',
  })
  @ApiResponse({
    status: 200,
    description: 'Operation effectuer avec succès.',
  })
  async updateTopic(@Param('id') id: number, @Body() data: UpdateTopicsDto) {
    const topic = await this.topicService.update(id, data);
    return new ResponseBody(topic, null);
  }

  @Get()
  @ApiBearerAuth()
  // @UseJwt()
  @ApiOperation({
    summary: 'Liste des sujets',
    description: 'Cet EndPoint permet de voir tous les sujets de la plateforme',
  })
  @ApiResponse({
    status: 200,
    description: 'Lecture de la liste des sujets avec succès.',
  })
  async showAllTopic() {
    const topics = await this.topicService.getAllTopics();
    return new ResponseBody(topics, null);
  }

  @Get('/:id')
  @ApiBearerAuth()
  // @UseJwt()
  @ApiOperation({
    summary: 'Sujet courant',
    description:
      'Cet EndPoint permet de lister les informations du sujet courant avec son id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Operation effectuer avec succès.',
  })
  async getById(@Param('id') id: number) {
    const topic = await this.topicService.findTopicById(id);
    return new ResponseBody(topic, null);
  }

  @Delete(':id')
  @ApiBearerAuth()
  // @UseGuards(RoleGuard(Role.admin))
  // @UseJwt()
  @ApiOperation({
    summary: 'Sujet courant',
    description: "Cet EndPoint permet de supprimer l'sujet courant",
  })
  @ApiResponse({
    status: 200,
    description: 'Suppression avec succès.',
  })
  async deleteTopic(@Param('id') id: number) {
    const topic = await this.topicService.delete(id);
    return new ResponseBody(topic, null);
  }
}
