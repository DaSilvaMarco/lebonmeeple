import { type InitialStatePost } from './type';
import { getApiBaseUrl } from '@/utils/api-config';

export const API_POSTS = () => `${getApiBaseUrl()}/posts`;

export const GET_METHOD = 'GET';
export const POST_METHOD = 'POST';
export const PATCH_METHOD = 'PATCH';
export const DELETE_METHOD = 'DELETE';

export const initialState: InitialStatePost = {
  posts: [],
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
