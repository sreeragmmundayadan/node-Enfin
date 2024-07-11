import { IsNotEmpty, IsString, MaxLength, IsDateString, IsNumber, IsPositive } from 'class-validator';

export class UpdateBookRequestDto {
  @IsNumber()
  @IsNotEmpty()
  id: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  publishedDate: Date;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;
}
