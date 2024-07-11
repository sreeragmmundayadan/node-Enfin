import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  publishedDate: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;
}
