import type Member from './Member';

export default interface Room {
	id: string;
	owner: string;
	hash: string;
	members: string[];
	membersInfo: Member[];
	createdAt: Date;
}
