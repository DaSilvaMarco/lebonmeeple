import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdatePostDto {
  @ApiPropertyOptional()
  readonly title: string;
  @ApiPropertyOptional()
  readonly body: string;
  @ApiPropertyOptional()
  readonly image: string;
}
