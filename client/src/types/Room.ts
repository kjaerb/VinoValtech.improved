import type User from './User';

export default interface Room {
	roomId: string;
	users: User[];
}
