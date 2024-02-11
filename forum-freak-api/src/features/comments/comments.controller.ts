import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { ResponseBody } from 'src/common/shared/responsebody';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
@ApiTags('Comment')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  // @UseJwt()
  @ApiOperation({
    summary: "Création d'un commentaire a un post",
    description: 'Cet EndPoint permet de créer un commentaire a un post',
  })
  @ApiResponse({
    status: 200,
    description: "L'Operation a été un succès.",
  })
  async createComment(@Body() data: CreateCommentDto) {
    const comment = await this.commentService.create(data);
    return new ResponseBody(comment, null);
  }

  @Get('/:topicId')
  @ApiBearerAuth()
  // @UseJwt()
  @ApiOperation({
    summary: 'Sujet courant',
    description:
      'Cet EndPoint permet de lister les informations du commentaire a un post courant avec son id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Operation effectuer avec succès.',
  })
  async getById(@Param('topicId') topicId: number) {
    const comment = await this.commentService.findCommentByTopicId(topicId);
    return new ResponseBody(comment, null);
  }
}
