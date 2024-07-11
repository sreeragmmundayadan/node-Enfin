import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { FindBooksDto, SaveBookRequestDto, UpdateBookRequestDto } from './dto';
import { Book } from '@entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) { }

  async saveBook(book: SaveBookRequestDto): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async findBookById(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } })
  }

  async findAllBooks(query: FindBooksDto): Promise<{ total: number; data: Book[] }> {
    const { name, description, page, limit } = query;
    const skip = (page - 1) * limit;

    const whereConditions: any = {};
    if (name) whereConditions.name = Like(`%${name}%`);
    if (description) whereConditions.description = Like(`%${description}%`);

    const data = await this.bookRepository.find({
      where: whereConditions,
      skip,
      take: limit,
    });
    const count = await this.bookRepository.count()
    return ({ total: count, data })
  }

  async updateBook(book: UpdateBookRequestDto): Promise<any> {
    return this.bookRepository.update(book.id, { ...book });
  }

  async deleteBook(id: number): Promise<any> {
    return this.bookRepository.delete(id);
  }

}
