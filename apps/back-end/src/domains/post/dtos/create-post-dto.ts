import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly body: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly image: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly category: string;
  @ApiProperty({
    required: false,
    isArray: true,
    type: Number,
    description: 'IDs des jeux associés',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  readonly gameIds?: number[];
}
