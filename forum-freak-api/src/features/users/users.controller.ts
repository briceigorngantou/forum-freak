import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @ApiBearerAuth()
  // @UseJwt()
  @Put(':id')
  @ApiOperation({
    summary: "Mise a jour des données d'un utilisateur",
    description: 'Cet EndPoint permet de mettre a jour un utilisateur',
  })
  @ApiResponse({
    status: 200,
    description: 'Operation effectuer avec succès.',
  })
  async updateUser(@Param('id') id: number, @Body() data: UpdateUsersDto) {
    const user = await this.userService.update(id, data);
    return new ResponseBody(user, null);
  }

  @Get()
  @ApiBearerAuth()
  // @UseJwt()
  @ApiOperation({
    summary: 'Liste des utilisateurs',
    description:
      'Cet EndPoint permet de voir tous les utilisateurs de la plateforme',
  })
  @ApiResponse({
    status: 200,
    description: 'Lecture de la liste des utilisateurs avec succès.',
  })
  // @UseGuards(RoleGuard(Role.admin))
  async showAllUser() {
    const users = await this.userService.getAllUsers();
    return new ResponseBody(users, null);
  }

  @Get('/:id')
  @ApiBearerAuth()
  // @UseJwt()
  @ApiOperation({
    summary: 'Utilisateur courant',
    description:
      "Cet EndPoint permet de lister les informations de l'utilisateur courant avec son id.",
  })
  @ApiResponse({
    status: 200,
    description: 'Operation effectuer avec succès.',
  })
  async getById(@Param('id') id: number) {
    const user = await this.userService.findUserById(id);
    return new ResponseBody(user, null);
  }

  @Delete(':id')
  @ApiBearerAuth()
  // @UseJwt()
  @ApiOperation({
    summary: 'Utilisateur courant',
    description: "Cet EndPoint permet de supprimer l'utilisateur courant",
  })
  @ApiResponse({
    status: 200,
    description: 'Suppression avec succès.',
  })
  // @UseGuards(RoleGuard(Role.admin))
  async deleteUser(@Param('id') id: number) {
    const user = await this.userService.delete(id);
    return new ResponseBody(user, null);
  }
}
