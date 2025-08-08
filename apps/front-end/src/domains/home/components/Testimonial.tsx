import {
  VStack,
  Heading,
  SimpleGrid,
  Text,
  Box,
  Container,
} from '@chakra-ui/react';
import React from 'react';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '@frontend/domains/home/data/data';

const Testimonial = () => {

  return (
    <Box py={20} bg="peach.200">
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
              Témoignages
            </Text>
            <Heading fontSize={{ base: '3xl', md: '4xl' }}>
              Ce que disent nos membres
            </Heading>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Testimonial;
