import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteBookRequestDto {
  @IsNumber()
  @IsNotEmpty()
  id: number
}
