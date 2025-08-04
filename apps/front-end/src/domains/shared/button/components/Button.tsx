import React, { ReactNode, ReactElement } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  color: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  handleClick?: () => void;
  icon?: ReactElement;
  isDisabled?: boolean;
  isLoading?: boolean;
};

const Button = (props: Props) => {
  const PRIMARY_COLOR = '#bd3a6a';

  const { color, children, type, handleClick, icon, isDisabled, isLoading } = props;

  return (
    <ChakraButton
      backgroundColor={color === 'primary' ? PRIMARY_COLOR : 'white'}
      isDisabled={isDisabled}
      type={type}
      textColor={color === 'primary' ? 'white' : PRIMARY_COLOR}
      onClick={handleClick}
      size="lg"
      rightIcon={icon}
      border={`1px solid ${color === 'primary' ? 'white' : PRIMARY_COLOR}`}
      _hover={{
        shadow: 'xl',
        transform: 'translateY(-2px)',
      }}
      isLoading={isLoading}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
