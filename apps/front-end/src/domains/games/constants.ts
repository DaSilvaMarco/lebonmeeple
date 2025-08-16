import { getApiBaseUrl } from '@/utils/api-config';
import { type InitialStateGame } from './type';

export const API_GAMES = () => `${getApiBaseUrl()}/games`;

export const GET_METHOD = 'GET';

export const initialState: InitialStateGame = {
  games: [],
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};
