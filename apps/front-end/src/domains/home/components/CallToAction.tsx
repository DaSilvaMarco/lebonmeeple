import { Icon } from '@chakra-ui/react';
import Button from '@frontend/domains/shared/button/components/Button';
import Link from 'next/link';
import React from 'react';
import { FaPenNib, FaRocket } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <>
      <Link href="/signup">
        <Button color="secondary" type="button" icon={<Icon as={FaPenNib} />}>
          S'inscrire
        </Button>
      </Link>
      <Link href="/login">
        <Button color="primary" type="button" icon={<Icon as={FaRocket} />}>
          Se connecter
        </Button>
      </Link>
    </>
  );
};

export default CallToAction;