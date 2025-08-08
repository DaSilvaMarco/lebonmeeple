import React, { ReactNode, ReactElement } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  color: 'primary' | 'secondary' | 'peach';
  type?: 'button' | 'submit' | 'reset';
  handleClick?: () => void;
  icon?: ReactElement;
  isDisabled?: boolean;
  isLoading?: boolean;
};

const Button = (props: Props) => {
  const {
    color,
    children,
    type = 'button',
    handleClick,
    icon,
    isDisabled,
    isLoading,
  } = props;

  const getVariant = () => {
    switch (color) {
      case 'primary':
        return 'solid';
      case 'secondary':
        return 'outline';
      case 'peach':
        return 'peach';
      default:
        return 'solid';
    }
  };

  return (
    <ChakraButton
      variant={getVariant()}
      type={type}
      onClick={handleClick}
      rightIcon={icon}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
