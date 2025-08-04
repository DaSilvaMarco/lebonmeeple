import React from 'react';
import {
  Card,
  Heading,
  Image,
  Text,
  // Box,
  // useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
// import { FaRegTimesCircle } from 'react-icons/fa';
// import Modal from '@/domains/shared/modal/components/Modal';

type UserProfile = {
  username: string;
  email: string;
  avatar: string;
}

type User = {
  userId: number;
} & UserProfile;

type Post = {
  id: number;
  title: string;
  body: string;
  user: User;
  image: string;
}

type Props = {
  post: Post;
}

const PostCard = (props: Props) => {
  const { id, title, body, user, image } = props.post;
  // const userState = useAppSelector((state) => state.user);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [deletePost] = useDeletePostMutation();

  // const handleDeletePost = async () => {
  //   return;
  // };

  return (
    <Card
      width={{ base: '100%', md: '45%', xl: '30%' }}
      boxShadow="xl"
      m="10px"
      p="10px"
      position="relative"
    >
      {/* {user && user.id === id && (
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
      )} */}
      <Link href={`/post/detail/${id}`}>
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

      {/* <Modal isOpen={isOpen} onClose={onClose} handleClick={handleDeletePost} /> */}
    </Card>
  );
};

export default PostCard;
