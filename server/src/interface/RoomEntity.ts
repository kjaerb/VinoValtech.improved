import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import Member from './Member';

export interface RoomEntity extends InMemoryDBEntity {
  id: string;
  owner: string;
  hash: string;
  members: string[];
  membersInfo: Member[];
  createdAt: Date;
}
