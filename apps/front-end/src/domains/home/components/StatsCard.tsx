import { VStack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

type Props = {
  value: string;
  title: string;
  color: string;
};

const StatsCard = (props: Props) => {
  const { value, title, color } = props;
  const textColor = useColorModeValue('neutral.600', 'white');

  return (
    <VStack spacing={1} data-testid="stats-card">
      <Text fontSize="2xl" fontWeight="bold" color={color}>
        {value}
      </Text>
      <Text fontSize="sm" color={textColor}>
        {title}
      </Text>
    </VStack>
  );
};

export default StatsCard;
