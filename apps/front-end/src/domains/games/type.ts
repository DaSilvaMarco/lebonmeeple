import { type Post } from '../post/type';

export type InitialStateGame = {
  games: Game[];
};

export type Game = {
  id: number;
  name: string;
  year: string;
  rating: number;
  mechanics: string[];
  image: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  duration: number;
  difficulty: string;
  posts?: Post[];
};
