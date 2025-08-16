import { PrismaService } from '@backend/prisma/prisma.service';
import { throwError } from '@backend/utils/errors';
import { Injectable } from '@nestjs/common';
import { getGames } from './usescases/get-games';

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
}
