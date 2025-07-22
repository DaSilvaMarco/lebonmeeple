import React from 'react';
import {
  Card,
  Heading,
  Image,
  Text,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaRegTimesCircle } from 'react-icons/fa';
import Modal from '../../modal/components/Modal';

interface IUserProfile {
  username: string;
  email: string;
  avatar: string;
}

interface IUser extends IUserProfile {
  userId: number;
}

interface IPost {
  postId: number;
  title: string;
  body: string;
  user: IUser;
  image: string;
}

interface Props {
  post: IPost;
}

const PostCard = (props: Props) => {
  const { postId, title, body, user, image } = props.post;
  // const userState = useAppSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async () => {
    return;
  };

  const userState = null;

  return (
    <Card
      width={{ base: '100%', md: '45%', xl: '30%' }}
      boxShadow="xl"
      m="10px"
      p="10px"
      position="relative"
    >
      {userState.user && userState.user.userId === user.userId && (
        <Box
          top="10px"
          right="10px"
          position="absolute"
          fontSize="2xl"
          color="red"
          onClick={onOpen}
          cursor="pointer"
        >
          <FaRegTimesCircle color="red" />
        </Box>
      )}
      <Link href={`/post/detail/${postId}`}>
        <Heading>{title}</Heading>
        <Image
          w="100%"
          h="200px"
          alt="photo de l'article"
          src={image ? image : './public/boardgame.jpg'}
        />
        <Text>{body}</Text>
        <Text>De : {user.username}</Text>
      </Link>

      <Modal isOpen={isOpen} onClose={onClose} handleClick={handleDeletePost} />
    </Card>
  );
};

export default PostCard;
