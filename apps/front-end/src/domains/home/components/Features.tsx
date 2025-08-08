import {
  VStack,
  Box,
  Icon,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  feature: {
    icon: React.ElementType;
    title: string;
    description: string;
  };
};

const Features = (props: Props) => {
  const { feature } = props;
  const cardBg = useColorModeValue('white', 'neutral.800');
  const textColor = useColorModeValue('neutral.600', 'white');

  return (
    <VStack
      p={8}
      bg={cardBg}
      borderRadius="xl"
      shadow="lg"
      spacing={4}
      textAlign="center"
      _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
      transition="all 0.3s"
      border="1px"
      borderColor="neutral.200"
    >
      <Box p={4} borderRadius="full" bg="primary.100">
        <Icon as={feature.icon} w={8} h={8} color="primary.500" />
      </Box>
      <Heading fontSize="xl">{feature.title}</Heading>
      <Text color={textColor}>{feature.description}</Text>
    </VStack>
  );
};

export default Features;
