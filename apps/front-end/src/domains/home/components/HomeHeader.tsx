import {
  VStack,
  Heading,
  Stack,
  Icon,
  HStack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FaRocket, FaPenNib, FaStar } from 'react-icons/fa';
import StatsCard from './StatsCard';
import { useThemeColors } from '@frontend/ui';
import Button from '@frontend/domains/shared/button/components/Button';

type Props = {
  isAuthenticated: boolean;
}

const HomeHeader = (props : Props) => {
  const { isAuthenticated } = props;
  const { textColor, textColorBrand, textColorMeeple, textColorGame } = useThemeColors();
  return (
    <VStack align="start" spacing={8}>
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
          bgGradient="linear(to-r, brand.600, meeple.500, game.600)"
          bgClip="text"
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
              <Link href="/signup">
                <Button
                  color="secondary"
                  type="button"
                  icon={<Icon as={FaStar} />}
                >
                  Rejoindre la communauté
                </Button>
              </Link>
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
          color={textColorMeeple}
        />
        <StatsCard
          value="50+"
          title="Éditeurs partenaires"
          color={textColorGame}
        />
      </HStack>
    </VStack>
  );
};

export default HomeHeader;
