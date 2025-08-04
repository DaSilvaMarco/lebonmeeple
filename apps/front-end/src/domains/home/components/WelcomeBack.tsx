import React from 'react';
import { Box, HStack, Avatar, VStack, Badge, Text } from '@chakra-ui/react';

import { User } from '@frontend/domains/user/type';
import { useThemeColors } from '@frontend/ui';

type Props = {
  user: User;
};

const WelcomeBack = (props: Props) => {
  const { user } = props;
  const { username, email } = user;
  const { cardBg, textColor } = useThemeColors();

  console.log('cardbg', cardBg);

  return (
    <Box
      mb={8}
      p={6}
      bg={cardBg}
      borderRadius="2xl"
      shadow="xl"
      border="1px"
      borderColor="brand.200"
    >
      <HStack justify="space-between" align="center">
        <HStack spacing={4}>
          <Avatar size="md" name={username} />
          <VStack align="start" spacing={1}>
            <Text fontSize="xl" fontWeight="bold">
              Bon retour, {username} ! 🎮
            </Text>
            <Text color={textColor} fontSize="sm">
              {email}
            </Text>
          </VStack>
        </HStack>
        <Badge
          colorScheme="green"
          variant="solid"
          px={3}
          py={1}
          borderRadius="full"
        >
          En ligne
        </Badge>
      </HStack>
    </Box>
  );
};

export default WelcomeBack;
