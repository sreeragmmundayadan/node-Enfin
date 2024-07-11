import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { DeleteBookRequestDto, FindBooksDto, SaveBookRequestDto, UpdateBookRequestDto } from './dto';
import { Book } from '@entities/book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  async saveBook(
    @Body() saveBookRequest: SaveBookRequestDto,
  ): Promise<Book> {
    try {
      return this.bookService.saveBook(saveBookRequest);
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
      });
    }
  }

  @Get()
  async getBooks(
    @Query() getBooksRequest: FindBooksDto,
  ): Promise<{ total: number; data: Book[] }> {
    try {
      return this.bookService.findAllBooks(getBooksRequest);
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
      });
    }
  }

  @Put()
  async updateBook(
    @Body() updateBookRequest: UpdateBookRequestDto,
  ): Promise<Book> {
    try {
      const book = await this.bookService.findBookById(updateBookRequest.id)
      if (!book) {
        throw new BadRequestException({
          message: 'Invalid book',
        });
      }
      return this.bookService.saveBook(updateBookRequest);
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
      });
    }
  }

  @Delete()
  async deleteBook(
    @Body() deleteBookRequest: DeleteBookRequestDto,
  ): Promise<{ message: string }> {
    try {
      const book = await this.bookService.findBookById(deleteBookRequest.id)
      if (!book) {
        throw new BadRequestException({
          message: 'Invalid book',
        });
      }
      await this.bookService.deleteBook(deleteBookRequest.id);
      return ({ message: "success" })
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
      });
    }
  }
}
