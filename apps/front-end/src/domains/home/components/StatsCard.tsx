import { VStack, Text } from '@chakra-ui/react';
import { useThemeColors } from '@frontend/ui';
import React from 'react';

type Props = {
  value: string;
  title: string;
  color: string;
};

const StatsCard = (props: Props) => {
  const { value, title, color } = props;
  const {  textColor } = useThemeColors();

  return (
    <VStack spacing={1}>
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