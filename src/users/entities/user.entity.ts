import { Exclude, Expose, Type } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose({ name: 'first_name' })
  @Column({ name: 'first_name' })
  firstName: string;

  @Expose({ name: 'last_name' })
  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Exclude()
  @Column({ nullable: true, type: 'varchar' })
  password: string | null;

  @Exclude()
  @Column({ name: 'refresh_token', nullable: true, type: 'varchar' })
  refreshToken: string | null;

  @Type(() => Date)
  @Expose({ name: 'created_at' })
  @CreateDateColumn({ name: 'created_at', default: () => 'NOW()' })
  createdAt: Date;

  @Type(() => Date)
  @Expose({ name: 'updated_at' })
  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updatedAt: Date;

  @Type(() => Date)
  @Expose({ name: 'deleted_at' })
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  static NewInstance(user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): User {
    return new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    });
  }

  @Exclude()
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
