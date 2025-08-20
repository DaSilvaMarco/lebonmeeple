import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const throwError = (error: Error) => {
  if (error instanceof BadRequestException) {
    throw error;
  }
  throw new InternalServerErrorException('Erreur lors de la requête');
};
