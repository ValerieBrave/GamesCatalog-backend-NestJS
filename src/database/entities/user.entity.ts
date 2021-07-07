import { Entity, Unique, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import * as bcrypt  from 'bcrypt';

import { UserRole } from "src/util/user-roles";
import { Game } from "./game.entity";


@Entity({ name: 'user' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  avatar: string;

  @Column({ nullable: true, type: 'date' })
  birthday: Date;

  @Column('varchar')
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  token: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: string;

  @ManyToMany(() => Game, (game) => game.users, { cascade: true })
  @JoinTable()
  games: Game[];

  public async createUser(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    await this.hashPassword(password)
    this.role = UserRole.USER;
    return this;
  }

  private async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }
}