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
import { useAppSelector } from '@frontend/store/hook';
import Image from '@frontend/domains/shared/image/components/Image';

const HomePresentation = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <Box bg="peach.200" position="relative">
      <Container maxW="7xl" py={20}>
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={12}
          alignItems="center"
        >
          <GridItem>
            <HomeHeader isAuthenticated={isAuthenticated} />
          </GridItem>

          <GridItem>
            <Box
              position="relative"
              overflow="hidden"
              w="100%"
              h="400px"
              borderRadius="xl"
            >
              <Image
                fill
                objectFit="cover"
                alt="Personnes jouant à un jeu de société autour d'une table."
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
                aria-label="Note moyenne des utilisateurs : 4,9 sur 5"
              >
                <HStack>
                  <Icon as={FaStar} color="yellow.400" aria-hidden="true" />
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
