import {
  Box,
  Container,
  VStack,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import Features from './Features';
import { useThemeColors } from '@frontend/ui';
import { features } from '@frontend/domains/home/data/data';

const WhyLeBonMeeple = () => {
  const { featuresBg } = useThemeColors();

  return (
    <Box py={20} bg={featuresBg}>
      <Container maxW="7xl">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Text
              fontSize="sm"
              fontWeight="bold"
              color="brand.500"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Pourquoi Choisir LeBonMeeple
            </Text>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} maxW="600px">
              Une Plateforme pensée pour les passionnés
            </Heading>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {features.map((feature, index) => (
              <Features key={index} feature={feature} index={index} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default WhyLeBonMeeple;
