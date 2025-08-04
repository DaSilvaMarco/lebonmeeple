import { VStack, Box, Icon, Heading, Text } from '@chakra-ui/react';
import { useThemeColors } from '@frontend/ui';
import React from 'react';

type Props = {
  feature: {
    icon: React.ElementType;
    title: string;
    description: string;
  };
  index: number;
};

const Features = (props: Props) => {
  const { feature, index } = props;
  const { cardBg, textColor } = useThemeColors();

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
      borderColor="gray.200"
    >
      <Box
        p={4}
        borderRadius="full"
        bg={`${['brand', 'meeple', 'game', 'brand'][index % 4]}.100`}
      >
        <Icon
          as={feature.icon}
          w={8}
          h={8}
          color={`${['brand', 'meeple', 'game', 'brand'][index % 4]}.500`}
        />
      </Box>
      <Heading fontSize="xl">{feature.title}</Heading>
      <Text color={textColor}>{feature.description}</Text>
    </VStack>
  );
};

export default Features;
