import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import React from 'react';

type Props = {
  handleEditClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PostOptions = (props: Props) => {
  const { handleEditClick, handleDeleteClick } = props;

  return (
    <Box position="absolute" top={3} left={3}>
      <HStack spacing={2}>
        <IconButton
          aria-label="Modifier le post"
          icon={<EditIcon />}
          size="sm"
          colorScheme="blue"
          variant="solid"
          onClick={handleEditClick}
          borderRadius="full"
          bg="rgba(0, 0, 255, 0.8)"
          color="white"
          _hover={{
            bg: 'blue.600',
          }}
          backdropFilter="blur(8px)"
          data-testid="edit-post-button"
        />
        <IconButton
          aria-label="Supprimer le post"
          icon={<DeleteIcon />}
          size="sm"
          colorScheme="red"
          variant="solid"
          onClick={handleDeleteClick}
          borderRadius="full"
          bg="rgba(255, 0, 0, 0.8)"
          color="white"
          _hover={{
            bg: 'red.600',
          }}
          backdropFilter="blur(8px)"
          data-testid="delete-post-button"
        />
      </HStack>
    </Box>
  );
};

export default PostOptions;
