'use client';

import React from 'react';
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Divider,
  VStack,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { terms } from '../data';

const TermsPage = () => {
  return (
    <Box maxW="3xl" mx="auto" py={10} px={4}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          Termes et Conditions d'Utilisation
        </Heading>
        <Text fontSize="md" color="gray.600" textAlign="center">
          Dernière mise à jour : 28 août 2025
        </Text>
        <Divider />
        {terms.map((section, idx) => (
          <Box key={section.title}>
            <Heading as="h2" size="md" mb={2} color="teal.600">
              {section.title}
            </Heading>
            <List spacing={2} styleType="none">
              {section.content.map((item, i) => (
                <ListItem key={i} display="flex" alignItems="flex-start">
                  <ListIcon as={CheckCircleIcon} color="teal.400" mt={1} />
                  <Text as="span">{item}</Text>
                </ListItem>
              ))}
            </List>
            {idx < terms.length - 1 && <Divider my={4} />}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
export default TermsPage;
