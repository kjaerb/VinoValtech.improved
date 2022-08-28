import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export default interface User extends InMemoryDBEntity {
  id: string;
  room?: string;
  name?: string;
}
