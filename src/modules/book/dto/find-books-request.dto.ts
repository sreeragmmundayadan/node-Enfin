import { Type } from 'class-transformer';
import { IsString, IsOptional, Min, Max, IsNumber } from 'class-validator';

export class FindBooksDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(50)
  limit: number = 10;
}
