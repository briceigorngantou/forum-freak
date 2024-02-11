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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiBearerAuth()
  // @UseJwt()
  // @UseGuards(RoleGuard(Role.admin))
  @ApiOperation({
    summary: "Création d'une category",
    description: 'Cet EndPoint permet de créer une category',
  })
  @ApiResponse({
    status: 200,
    description: "L'Operation a été un succès.",
  })
  async createUser(@Body() data: CreateCategoryDto) {
    const category = await this.categoryService.create(data);
    return new ResponseBody(category, null);
  }

  @ApiBearerAuth()
  // @UseJwt()
  // @UseGuards(RoleGuard(Role.admin))
  @Put(':id')
  @ApiOperation({
    summary: "Mise a jour des données d'une category",
    description: 'Cet EndPoint permet de mettre a jour une category',
  })
  @ApiResponse({
    status: 200,
    description: 'Operation effectuer avec succès.',
  })
  async updateCategory(
    @Param('id') id: number,
    @Body() data: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.update(id, data);
    return new ResponseBody(category, null);
  }

  @Get()
  @ApiBearerAuth()
  // @UseJwt()
  @ApiOperation({
    summary: 'Liste des category',
    description:
      'Cet EndPoint permet de voir toutes les category de la plateforme',
  })
  @ApiResponse({
    status: 200,
    description: 'Lecture de la liste des category avec succès.',
  })
  async showAllCategory() {
    const category = await this.categoryService.getAllCategory();
    return new ResponseBody(category, null);
  }

  @Get('/:id')
  @ApiBearerAuth()
  // @UseJwt()
  @ApiOperation({
    summary: 'Category courante',
    description:
      'Cet EndPoint permet de lister les informations de la category courante avec son id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Operation effectuer avec succès.',
  })
  async getById(@Param('id') id: number) {
    const category = await this.categoryService.findCategoryById(id);
    return new ResponseBody(category, null);
  }

  @Delete(':id')
  @ApiBearerAuth()
  // @UseJwt()
  // @UseGuards(RoleGuard(Role.admin))
  @ApiOperation({
    summary: 'Category courante',
    description: 'Cet EndPoint permet de supprimer la category courante',
  })
  @ApiResponse({
    status: 200,
    description: 'Suppression avec succès.',
  })
  async deleteCategory(@Param('id') id: number) {
    const category = await this.categoryService.delete(id);
    return new ResponseBody(category, null);
  }
}
