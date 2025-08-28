import React from 'react';
import Modal from '@/domains/shared/modal/Modal';
import {
  Card,
  Box,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Post } from '@frontend/domains/post/type';
import Link from 'next/link';
import Image from '@frontend/domains/shared/image/components/Image';
import { usePost } from '@frontend/domains/post/services/usePost';
import { motion } from 'framer-motion';
import { itemVariants } from '@frontend/domains/post/constants';
import PostOptions from '@frontend/domains/post/components/PostOptions';
import PostCardBody from '@frontend/domains/post/components/PostCardBody';
import Badge from '@frontend/domains/shared/badge/components/Badge';

type Props = {
  post: Post;
};

const PostCard = (props: Props) => {
  const { post } = props;
  const { id, title, user: userFromPost, image } = post;
  const cardBg = useColorModeValue('white', 'neutral.800');

  const borderColor = useColorModeValue('neutral.200', 'neutral.600');

  const MotionBox = motion(Box);
  const {
    user,
    isDeleting,
    isDeleteModalOpen,
    closeDeleteModal,
    isEditModalOpen,
    closeEditModal,
    handleDeleteClick,
    handleConfirmDelete,
    handleEditClick,
    handleConfirmEdit,
  } = usePost(post);

  return (
    <MotionBox
      as="div"
      role="listitem"
      aria-label={`Article : ${post.title}`}
      key={post.id}
      flex={{ base: '1 1 100%', md: '0 0 calc(33.333% - 32px)' }}
      w={{ base: '100%', md: 'calc(33.333% - 32px)' }}
      minW={{ base: '100%', md: '340px' }}
      mb={{ base: 6, md: 8 }}
      variants={itemVariants}
      whileHover={{
        y: -8,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      style={{ originY: 0.5 }}
    >
      <Link href={`/post/${id}`}>
        <Card
          bg={cardBg}
          border="1px"
          borderColor={borderColor}
          borderRadius="xl"
          overflow="hidden"
          height="100%"
          display="flex"
          flexDirection="column"
          transition="all 0.3s ease"
          cursor="pointer"
          _hover={{
            transform: 'translateY(-4px)',
            borderColor: 'brand.200',
          }}
        >
          <Box position="relative" overflow="hidden" w="100%" h="200px">
            <Image
              fill
              objectFit="cover"
              alt={`Photo de l'article ${title}`}
              src={image}
              fallbackSrc="/boardgame.jpg"
              style={{
                transition: 'transform 0.3s ease',
              }}
              className="hover:scale-105"
              sizes="max-width: 600px"
            />

            <Badge text={"Jeu de société"} />

            {user?.id === post.userId && (
              <PostOptions
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
              />
            )}
            
          </Box>

          <PostCardBody user={userFromPost} post={post}/>
        </Card>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          title="Confirmer la suppression"
          footer={
            <>
              <Button
                colorScheme="red"
                onClick={handleConfirmDelete}
                leftIcon={<DeleteIcon />}
                isLoading={isDeleting}
                data-testid="modal-confirm-button"
              >
                Supprimer
              </Button>
              <Button
                variant="outline"
                colorScheme="gray"
                onClick={closeDeleteModal}
                data-testid="cancel-delete-button"
              >
                Annuler
              </Button>
            </>
          }
        >
          Êtes-vous sûr de vouloir supprimer ce post ?
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          title="Confirmer la modification"
          footer={
            <>
              <Button
                colorScheme="blue"
                onClick={handleConfirmEdit}
                leftIcon={<EditIcon />}
                data-testid="modal-confirm-button"
              >
                Modifier !
              </Button>
              <Button
                variant="outline"
                colorScheme="gray"
                onClick={closeEditModal}
                data-testid="cancel-edit-button"
              >
                Annuler
              </Button>
            </>
          }
        >
          Êtes-vous sûr de vouloir modifier ce post ?
        </Modal>
      </Link>
    </MotionBox>
  );
};

export default PostCard;
