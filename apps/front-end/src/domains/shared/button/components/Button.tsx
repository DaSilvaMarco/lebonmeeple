import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  color?: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  width?: string;
  handleClick?: () => void;
};

const Button = ({
  children,
  color,
  type,
  disabled,
  width,
  handleClick,
}: Props) => {
  const PRIMARY_COLOR = '#bd3a6a';

  return (
    <ChakraButton
      backgroundColor={PRIMARY_COLOR}
      isDisabled={disabled}
      type={type}
      colorScheme={color}
      w={width}
      onClick={handleClick}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
