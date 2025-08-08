import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateDto {
  @ApiPropertyOptional()
  readonly username: string;
  @ApiPropertyOptional()
  readonly email: string;
  @ApiPropertyOptional()
  readonly avatar: string | null;
}
