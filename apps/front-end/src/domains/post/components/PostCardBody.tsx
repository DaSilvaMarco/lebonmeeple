import {
  CardBody,
  VStack,
  Heading,
  HStack,
  Avatar,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { User } from '@frontend/domains/user/type';
import React from 'react';
import { Post } from '../type';

type Props = {
  user: User;
  post: Post;
};

const PostCardBody = (props: Props) => {
  const { user, post } = props;
  const { title, body } = post;

  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const textColorSecondary = useColorModeValue('neutral.600', 'white');
  const borderColor = useColorModeValue('neutral.200', 'neutral.600');

  return (
    <CardBody p={5} flex="1" display="flex" flexDirection="column">
      <VStack align="stretch" spacing={3} flex="1">
        <Heading
          size="md"
          color={textColorPrimary}
          fontWeight="bold"
          lineHeight="shorter"
          noOfLines={2}
          minH="48px"
        >
          {title}
        </Heading>

        <Text
          color={textColorSecondary}
          fontSize="sm"
          lineHeight="relaxed"
          noOfLines={3}
          flex="1"
        >
          {body}
        </Text>

        <HStack spacing={3} pt={2} borderTop="1px" borderColor={borderColor}>
          <Avatar
            size="sm"
            src={user.avatar || '/defaultAvatar.jpg'}
            name={user.username}
            bg="brand.100"
            color="brand.600"
          />
          <VStack align="start" spacing={0} flex="1">
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color={textColorPrimary}
              lineHeight="short"
            >
              {user.username}
            </Text>
            <Text fontSize="xs" color={textColorSecondary} lineHeight="short">
              Auteur de l'annonce
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </CardBody>
  );
};

export default PostCardBody;
