import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional()
  readonly title: string;
  @ApiPropertyOptional()
  readonly body: string;
  @ApiPropertyOptional()
  readonly image: string;
  @ApiPropertyOptional({
    type: [Number],
    description: 'Liste des IDs de jeux à associer au post',
  })
  readonly games?: number[];
}
