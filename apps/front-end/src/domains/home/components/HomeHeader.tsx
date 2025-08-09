import {
  VStack,
  Heading,
  Stack,
  Icon,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FaRocket, FaPenNib, FaStar } from 'react-icons/fa';
import StatsCard from './StatsCard';
import Button from '@frontend/domains/shared/button/components/Button';

type Props = {
  isAuthenticated: boolean;
};

const HomeHeader = (props: Props) => {
  const { isAuthenticated } = props;
  const textColor = useColorModeValue('neutral.600', 'white');
  const textColorBrand = useColorModeValue('primary.500', 'primary.500');
  const PRIMARY_COLOR = '#bd3a6a';

  return (
    <VStack
      align="start"
      spacing={8}
      data-testid="home-header"
      data-authenticated={isAuthenticated}
    >
      <VStack align="start" spacing={4}>
        <Text
          fontSize="sm"
          fontWeight="bold"
          color="brand.500"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          Le Blog Gaming de Référence
        </Text>
        <Heading
          fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
          fontWeight="bold"
          lineHeight="shorter"
          bgClip="text"
          color={PRIMARY_COLOR}
        >
          LeBonMeeple
        </Heading>
        <Text
          fontSize={{ base: 'lg', md: 'xl' }}
          color={textColor}
          maxW="500px"
        >
          La plateforme dédiée aux jeux de société. Connectez-vous et partagez !
        </Text>
      </VStack>

      <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} w="full">
        {isAuthenticated ? (
          <>
            <Link href="/blog">
              <Button
                type="button"
                color="secondary"
                icon={<Icon as={FaRocket} />}
              >
                Explorer les Articles
              </Button>
            </Link>
            <Link href="/blog/create">
              <Button
                type="button"
                color="primary"
                icon={<Icon as={FaPenNib} />}
              >
                Créer un article
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/signup">
              <Button
                color="secondary"
                type="button"
                icon={<Icon as={FaStar} />}
              >
                Rejoindre la communauté
              </Button>
            </Link>
            <Link href="/login">
              <Button
                color="primary"
                type="button"
                icon={<Icon as={FaRocket} />}
              >
                Se connecter
              </Button>
            </Link>
          </>
        )}
      </Stack>

      <HStack spacing={8} pt={4}>
        <StatsCard value="500+" title="Membres Actifs" color={textColorBrand} />
        <StatsCard
          value="1200+"
          title="Articles publiés"
          color={PRIMARY_COLOR}
        />
        <StatsCard
          value="50+"
          title="Éditeurs partenaires"
          color={PRIMARY_COLOR}
        />
      </HStack>
    </VStack>
  );
};

export default HomeHeader;
