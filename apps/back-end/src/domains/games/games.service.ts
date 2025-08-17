import { PrismaService } from '@backend/prisma/prisma.service';
import { throwError } from '@backend/utils/errors';
import { Injectable } from '@nestjs/common';
import { getGames } from './usescases/get-games';
import { getGame } from './usescases/get-game';

@Injectable()
export class GamesService {
  constructor(private readonly prismaService: PrismaService) {}

  getAll = async (page = 1, limit = 9) => {
    try {
      return await getGames(this.prismaService, page, limit);
    } catch (error) {
      throwError(error);
    }
  };

  getById = async (id: number) => {
    try {
      return await getGame(id, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };
}
