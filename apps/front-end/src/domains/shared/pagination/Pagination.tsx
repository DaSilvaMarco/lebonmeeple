import {
  Button as ChakraButton,
  ButtonGroup,
  Flex,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAppSelector } from '@frontend/store/hook';
import Link from 'next/link';
import React from 'react';
import Button from '../button/components/Button';

type Props = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

const Pagination = (props: Props) => {
  const { page, totalPages, setPage, handlePrevPage, handleNextPage } = props;
  const textColorBrand = useColorModeValue('primary.500', 'primary.500');
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <Flex w="100%" alignItems="center" mb={6} px={4} pt={4} gap={2}>
      {/* Titre à gauche */}
      <Heading
        size="lg"
        color={textColorBrand}
        fontWeight="bold"
        data-testid="posts-title-page"
        flexShrink={0}
      >
        Articles
      </Heading>
      {/* Pagination centrée */}
      <Flex flex="1" justify="center" align="center">
        <ButtonGroup isAttached>
          <ChakraButton
            onClick={handlePrevPage}
            isDisabled={page <= 1}
            colorScheme={page <= 1 ? 'gray' : 'blue'}
            variant="outline"
            w="140px"
            h="48px"
            cursor={page <= 1 ? 'not-allowed' : 'pointer'}
          >
            Précédent
          </ChakraButton>
          {Array.from({ length: totalPages }, (_, i) => (
            <ChakraButton
              key={i + 1}
              colorScheme={page === i + 1 ? 'blue' : 'gray'}
              variant={page === i + 1 ? 'solid' : 'outline'}
              w="48px"
              h="48px"
              onClick={() => setPage(i + 1)}
              isDisabled={page === i + 1}
            >
              {i + 1}
            </ChakraButton>
          ))}
          <ChakraButton
            onClick={handleNextPage}
            isDisabled={page >= totalPages}
            colorScheme={page >= totalPages ? 'gray' : 'blue'}
            variant="outline"
            w="140px"
            h="48px"
            cursor={page >= totalPages ? 'not-allowed' : 'pointer'}
          >
            Suivant
          </ChakraButton>
        </ButtonGroup>
      </Flex>
      {/* Bouton à droite, espace réservé si non affiché */}
      <Flex flexShrink={0} minW="170px" justify="flex-end">
        {isAuthenticated ? (
          <Link href="/post/create">
            <Button color="primary" type="button">
              Créer un article
            </Button>
          </Link>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default Pagination;
