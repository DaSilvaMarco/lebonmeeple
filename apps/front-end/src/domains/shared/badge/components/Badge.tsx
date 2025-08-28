import { Box, Badge as ChakraBadge } from '@chakra-ui/react';
import React from 'react';

type Props = {
  text: string;
};

const Badge = (props: Props) => {
  const { text } = props;

  return (
    <Box
      position="absolute"
      top={3}
      right={3}
      bg="rgba(255, 255, 255, 0.9)"
      backdropFilter="blur(8px)"
      borderRadius="full"
      p={1}
    >
      <ChakraBadge
        colorScheme="brand"
        borderRadius="full"
        px={3}
        py={1}
        fontSize="xs"
        fontWeight="semibold"
      >
        {text}
      </ChakraBadge>
    </Box>
  );
};

export default Badge;
