import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { Member, Owner } from './User';

export interface RoomEntity extends InMemoryDBEntity {
  id: string;
  owner: Owner;
  hash: string;
  members: string[];
  membersInfo: Member[];
  createdAt: Date;
}
