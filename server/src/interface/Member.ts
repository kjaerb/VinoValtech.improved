import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export default interface Member {
  clientId: string;
  name?: string;
}
