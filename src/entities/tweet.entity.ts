import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tweets, { eager: true })
  user: User;

  @Column()
  textContent: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 0 })
  likes: number;
}
