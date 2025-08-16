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

const CommentsSection = ({
  postId,
  comments,
  onCommentsUpdate,
  fullWidth,
}: Props & { fullWidth?: boolean }) => {
  const textColor = useColorModeValue('gray.800', 'white');

  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <Box
      as="section"
      aria-labelledby={`comments-title-${postId}`}
      w={fullWidth ? '100%' : undefined}
      maxW={fullWidth ? '100vw' : undefined}
      px={fullWidth ? { base: 0, md: 0 } : undefined}
    >
      <Divider mb={6} />

      <VStack spacing={6} align="stretch">
        <Text
          as="h2"
          id={`comments-title-${postId}`}
          fontSize="lg"
          fontWeight="semibold"
          color={textColor}
          tabIndex={-1}
        >
          Commentaires ({comments.length})
        </Text>

        <CommentForm postId={postId} onCommentAdded={onCommentsUpdate} />

        {sortedComments.length > 0 ? (
          <Box
            as="ul"
            aria-label="Liste des commentaires"
            pl={0}
            style={{ listStyle: 'none' }}
          >
            {sortedComments.map((comment) => (
              <Box as="li" key={comment.id}>
                <CommentCard
                  comment={comment}
                  onCommentDeleted={onCommentsUpdate}
                  onCommentUpdated={onCommentsUpdate}
                />
              </Box>
            ))}
          </Box>
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
