import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm";

import { User } from "./user.entity";

@Entity({ name: 'game' })
export class Game {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({nullable: true})
  rating: number;

  @Column({ type: 'date', nullable: true })
  release: Date;

  @ManyToMany(type => User, (user: User) => user.games)
  users: User[];

  public constructor(id: number, name?: string, release?: number, rating?: number) {
    this.id = id;
    if (name) this.name = name;
    if (rating) this.rating = rating;
    if (release) this.release = new Date(release * 1000);
  }
}