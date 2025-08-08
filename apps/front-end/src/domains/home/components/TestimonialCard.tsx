import {
  Box,
  Icon,
  VStack,
  Divider,
  HStack,
  Avatar,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

type Props = {
  testimonial: {
    content: string;
    avatar: string;
    name: string;
    role: string;
  };
  index: number;
};

const TestimonialCard = (props: Props) => {
  const { testimonial, index } = props;
  const textColor = useColorModeValue('neutral.600', 'white');

  return (
    <Box
      key={index}
      p={8}
      bg="white"
      borderRadius="xl"
      shadow="lg"
      position="relative"
      _hover={{ shadow: 'xl' }}
      transition="all 0.3s"
    >
      <Icon
        as={FaQuoteLeft}
        w={6}
        h={6}
        color="brand.300"
        position="absolute"
        top={6}
        left={6}
      />
      <VStack spacing={6} pt={4}>
        <Text fontSize="lg" fontStyle="italic" textAlign="center">
          "{testimonial.content}"
        </Text>
        <Divider />
        <HStack>
          <Avatar size="md" src={testimonial.avatar} name={testimonial.name} />
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{testimonial.name}</Text>
            <Text fontSize="sm" color={textColor}>
              {testimonial.role}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default TestimonialCard;
