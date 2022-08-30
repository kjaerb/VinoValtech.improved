interface User {
	clientId: string;
	name: string;
}

export interface Owner extends User {}

export interface Member extends User {
	team: string;
}
