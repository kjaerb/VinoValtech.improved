interface User {
  clientId: string;
  name: string;
}

export interface Member extends User {
  team: string;
}

export interface Owner extends User {}
