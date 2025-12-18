import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tweet } from './tweet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  telegramLink: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column()
  status: string;

  @Column({ unique: true })
  email: string;

  @Column()
  avaUrl: string;

  @Column()
  bannerUrl: string;

  @Column()
  password: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @ManyToMany(() => User, (user) => user.following)
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  following: User[];
}
