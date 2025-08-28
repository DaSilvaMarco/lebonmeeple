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
import { privacySections } from '../data';

const PrivacyPage = () => {
  return (
    <Box maxW="3xl" mx="auto" py={10} px={4}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          Politique de Confidentialité
        </Heading>
        <Text fontSize="md" color="gray.600" textAlign="center">
          Dernière mise à jour : 28 août 2025
        </Text>
        <Divider />
        {privacySections.map((section, idx) => (
          <Box key={section.title}>
            <Heading as="h2" size="md" mb={2} color="teal.600">
              {section.title}
            </Heading>
            {section.content.length > 1 ? (
              <List spacing={2} styleType="none">
                {section.content.map((item, i) => (
                  <ListItem key={i} display="flex" alignItems="flex-start">
                    <ListIcon as={CheckCircleIcon} color="teal.400" mt={1} />
                    <Text as="span">{item}</Text>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Text>{section.content[0]}</Text>
            )}
            {idx < privacySections.length - 1 && <Divider my={4} />}
          </Box>
        ))}
        <Text fontStyle="italic" color="gray.500" mt={8} textAlign="center">
          Ceci est une politique de confidentialité fictive générée à des fins
          de démonstration.
        </Text>
      </VStack>
    </Box>
  );
};

export default PrivacyPage;
