import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseBody } from 'src/common/shared/responsebody';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @ApiBody({ type: LoginDto })
  @ApiOperation({
    summary: "Authentification de l'utilisateur",
    description: "Cet EndPoint permet d'authentifier un utilisateur",
  })
  @ApiResponse({
    status: 200,
    description: 'authentification avec succès.',
  })
  @Post('login')
  async login(@Body() login: LoginDto): Promise<any> {
    const authService = await this.authService.login(login);
    return new ResponseBody(authService, null);
  }

  @Post('register')
  @ApiOperation({
    summary: "Création d'un utilisateur",
    description: 'Cet EndPoint permet de créer un utilisateur',
  })
  @ApiResponse({
    status: 200,
    description: "L'utilisateur a été cree avec succès.",
  })
  async createUser(@Body() data: CreateUsersDto) {
    const user = await this.usersService.create(data);
    return new ResponseBody(user, null);
  }

  @Get('validateAccount/:code')
  @ApiOperation({
    summary: 'Validation de compte',
    description: 'Cet EndPoint permet de Valide le compte creer',
  })
  @ApiResponse({
    status: 200,
    description: 'Operation effectuer avec succès.',
  })
  async validateAccount(@Param('code') code: string) {
    const user = await this.usersService.validateAccount(code);
    return new ResponseBody(user, null);
  }
}
