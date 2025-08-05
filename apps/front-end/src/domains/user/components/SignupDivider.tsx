import {
  Box,
  Divider,
  VStack,
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import Button from '@frontend/domains/shared/button/components/Button';
import { useThemeColors } from '@frontend/ui';
import Link from 'next/link';
import React from 'react';

const SignupDivider = () => {
  const { borderColor, cardBg, textColor } = useThemeColors();
  const linkColor = useColorModeValue('brand.500', 'brand.300');

  return (
    <>
      <Box position="relative" py={6}>
        <Divider borderColor={borderColor} />
        <Box
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          bg={cardBg}
          px={3}
        >
          <Text fontSize="sm" color={textColor} fontWeight="medium">
            ou
          </Text>
        </Box>
      </Box>

      <VStack spacing={4}>
        <Text textAlign="center" color={textColor} fontSize="sm">
          Vous avez déjà un compte ?
        </Text>
        <Flex justify="center" align="center" width="100%">
          <Link href="/login">
            <Button type="button" color="secondary">
              Se connecter
            </Button>
          </Link>
        </Flex>

        <Text fontSize="xs" color={textColor} textAlign="center" mt={4}>
          En vous inscrivant, vous acceptez nos{' '}
          <Link href="/terms">
            <Text as="span" color={linkColor} textDecoration="underline">
              conditions d'utilisation
            </Text>
          </Link>{' '}
          et notre{' '}
          <Link href="/privacy">
            <Text as="span" color={linkColor} textDecoration="underline">
              politique de confidentialité
            </Text>
          </Link>
        </Text>
      </VStack>
    </>
  );
};

export default SignupDivider;
