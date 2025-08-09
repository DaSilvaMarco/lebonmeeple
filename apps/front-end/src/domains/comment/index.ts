// Export types
export type {
  Comment,
  CreateCommentDto,
  UpdateCommentDto,
  InitialStateComment,
} from './type';

// Export schema
export { createCommentSchema } from './schema';

// Export constants
export {
  POST_METHOD,
  DELETE_METHOD,
  PATCH_METHOD,
  GET_METHOD,
} from './constants';

// Export slice and actions
export {
  commentSlice,
  setComments,
  addComment,
  deleteComment,
  updateComment,
} from './slice';

// Export API functions
export { createComment } from './api/create-comment';
export { updateComment as updateCommentApi } from './api/update-comment';
export { deleteComment as deleteCommentApi } from './api/delete-comment';

// Export components
export { default as CommentCard } from './components/CommentCard';
export { default as CommentForm } from './components/CommentForm';
export { default as CommentEditForm } from './components/CommentEditForm';
export { default as CommentsSection } from './components/CommentsSection';
