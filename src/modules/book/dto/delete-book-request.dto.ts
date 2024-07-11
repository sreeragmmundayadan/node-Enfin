import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteBookRequestDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  id: number
}
