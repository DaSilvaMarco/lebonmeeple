import {
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import HomeHeader from './HomeHeader';
import WelcomeBack from './WelcomeBack';
import { useThemeColors } from '@frontend/ui';
import { useAppSelector } from '@frontend/store/hook';
import Image from '@frontend/domains/shared/image/components/Image';

const HomePresentation = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const { bgGradient } = useThemeColors();

  return (
    <Box bgGradient={bgGradient} position="relative" overflow="hidden">
      <Box
        position="absolute"
        top="-50px"
        right="-50px"
        w="200px"
        h="200px"
        borderRadius="full"
        bg="brand.400"
        opacity="0.1"
        transform="rotate(45deg)"
      />
      <Box
        position="absolute"
        bottom="-100px"
        left="-100px"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="meeple.400"
        opacity="0.1"
      />

      <Container maxW="7xl" pt={20} pb={16}>
        {isAuthenticated && user && <WelcomeBack user={user} />}

        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={12}
          alignItems="center"
        >
          <GridItem>
            <HomeHeader isAuthenticated={isAuthenticated} />
          </GridItem>

          <GridItem>
            <Box position="relative" overflow="hidden" w="100%" h="400px" borderRadius="xl">
              <Image
                fill
                objectFit="cover"
                alt={`Photo de l'accueil`}
                src="/boardgame3.jpg"
                style={{
                  transition: 'transform 0.3s ease',
                }}
                className="hover:scale-105"
                sizes="max-width: 600px"
              />
              <Box
                position="absolute"
                top="4"
                right="4"
                bg="white"
                p={3}
                borderRadius="xl"
                shadow="lg"
              >
                <HStack>
                  <Icon as={FaStar} color="yellow.400" />
                  <Text fontWeight="bold">4.9/5</Text>
                </HStack>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePresentation;
