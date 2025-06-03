import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateDto {
  @ApiPropertyOptional()
  readonly username: string | null;
  @ApiPropertyOptional()
  readonly email: string | null;
  @ApiPropertyOptional()
  readonly avatar: string | null;
}
