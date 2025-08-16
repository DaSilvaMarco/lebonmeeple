import {
  Button as ChakraButton,
  ButtonGroup,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
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
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <Flex w="100%" alignItems="center" mb={6} px={2} pt={2} gap={2}>
      {/* Pagination centrée, moderne et légère */}
      <Flex flex="1" justify="center" align="center">
        <ButtonGroup size="sm" variant="ghost" spacing={1}>
          <IconButton
            aria-label="Page précédente"
            icon={<ChevronLeftIcon boxSize={5} />}
            onClick={handlePrevPage}
            isDisabled={page <= 1}
            rounded="full"
            colorScheme="gray"
            minW={8}
            minH={8}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <ChakraButton
              key={i + 1}
              colorScheme={page === i + 1 ? 'primary' : 'gray'}
              variant={page === i + 1 ? 'solid' : 'ghost'}
              onClick={() => setPage(i + 1)}
              isDisabled={page === i + 1}
              rounded="full"
              minW={8}
              minH={8}
              px={0}
              fontWeight="semibold"
              fontSize="md"
              _disabled={{ opacity: 1, bg: 'primary.500', color: 'white' }}
            >
              {i + 1}
            </ChakraButton>
          ))}
          <IconButton
            aria-label="Page suivante"
            icon={<ChevronRightIcon boxSize={5} />}
            onClick={handleNextPage}
            isDisabled={page >= totalPages}
            rounded="full"
            colorScheme="gray"
            minW={8}
            minH={8}
          />
        </ButtonGroup>
      </Flex>
      {/* Bouton à droite, espace réservé si non affiché */}
      <Flex flexShrink={0} minW="120px" justify="flex-end">
        {isAuthenticated ? (
          <Link href="/post/create">
            <Button
              color="primary"
              type="button"
            >
              Créer un article
            </Button>
          </Link>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default Pagination;
