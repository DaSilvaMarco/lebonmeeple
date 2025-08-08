import React from 'react';
import {
  Box,
  VStack,
  Text,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import type { Comment } from '../type';

type Props = {
  postId: number;
  comments: Comment[];
  onCommentsUpdate: () => void;
};

const CommentsSection = ({ postId, comments, onCommentsUpdate }: Props) => {
  const textColor = useColorModeValue('gray.800', 'white');

  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <Box>
      <Divider mb={6} />

      <VStack spacing={6} align="stretch">
        <Text fontSize="lg" fontWeight="semibold" color={textColor}>
          Commentaires ({comments.length})
        </Text>

        <CommentForm postId={postId} onCommentAdded={onCommentsUpdate} />

        {sortedComments.length > 0 ? (
          <VStack spacing={4} align="stretch">
            {sortedComments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onCommentDeleted={onCommentsUpdate}
                onCommentUpdated={onCommentsUpdate}
              />
            ))}
          </VStack>
        ) : (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">
              Aucun commentaire pour le moment. Soyez le premier à commenter !
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CommentsSection;
