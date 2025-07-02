import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional()
  readonly title: string;
  @ApiPropertyOptional()
  readonly body: string;
  @ApiPropertyOptional()
  readonly image: string;
}
