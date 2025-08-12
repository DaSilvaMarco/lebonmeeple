import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateUserDto {
  @ApiPropertyOptional()
  readonly username: string;
  @ApiPropertyOptional()
  readonly email: string;
  @ApiPropertyOptional()
  readonly avatar: string | null;
}
