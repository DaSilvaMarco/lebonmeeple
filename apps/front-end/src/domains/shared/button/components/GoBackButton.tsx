import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const GoBackButton = () => {
  const router = useRouter();

  return (
    <Button
      leftIcon={<ArrowBackIcon />}
      variant="ghost"
      mb={6}
      onClick={() => router.back()}
    >
      Retour
    </Button>
  );
};

export default GoBackButton;
