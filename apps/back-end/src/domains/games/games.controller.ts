import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { GamesService } from './games.service';

@ApiTags('Games')
@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('games')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Numéro de page',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: "Nombre d'éléments par page",
  })
  getAll(@Query('page') page = 1, @Query('limit') limit = 9) {
    return this.gamesService.getAll(Number(page), Number(limit));
  }

  @Get('game/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getById(id);
  }
}
