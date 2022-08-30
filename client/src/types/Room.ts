import type { Member, Owner } from './User';

export default interface Room {
	id: string;
	hash: string;
	members: string[];
	membersInfo: Member[];
	owner: Owner;
	createdAt: Date;
}
