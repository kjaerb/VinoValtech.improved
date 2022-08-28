import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import User from './User';

export interface RoomEntity extends InMemoryDBEntity {
  id: string;
  owner: string;
  hash: string;
  users: User[];
  createdAt: Date;
}
