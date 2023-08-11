export type Game = {
  gid: string;
  name: string;
  timestamp: string;
  user_ids: string[];
};

export type User = {
  name: string;
  email: string;
  uid: string;
  game_ids: string[];
  timestamp: string;
};

export type Location = {
  name: string;
  gid: string;
  type: 'character' | 'location' | '';
  lid: string;
  timestamp: string;
  item_ids: string[];
};

export type Item = {
  name: string;
  type: string;
  iid: string;
  gid: string;
  lid: string;
  [key: string]: unknown;
};
