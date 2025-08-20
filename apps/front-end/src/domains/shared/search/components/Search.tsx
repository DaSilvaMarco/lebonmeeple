import React, { useState, useRef } from 'react';
import {
  Input,
  Box,
  List,
  ListItem,
  Spinner,
  IconButton,
  useOutsideClick,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import { getGames } from '@/domains/games/api/get-games';
import { type Game } from '@/domains/games/type';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const router = useRouter();
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: () => {
      setShowDropdown(false);
      setShowInput(false);
    },
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getGames({ limit: 10, page: 1 });
      // Filtrage côté client, à remplacer par une vraie recherche côté API si possible
      const filtered =
        data.games?.filter((g: Game) =>
          g.name.toLowerCase().includes(value.toLowerCase()),
        ) || [];
      setResults(filtered);
      setShowDropdown(true);
    } catch {
      setResults([]);
      setShowDropdown(false);
    }
    setLoading(false);
  };

  const handleSelect = (game: Game) => {
    setQuery('');
    setShowDropdown(false);
    setShowInput(false);
    router.push(`/game/${game.id}`);
  };

  return (
    <Box position="relative" ref={ref} display="flex" alignItems="center">
      <IconButton
        aria-label="Ouvrir la recherche"
        icon={<SearchIcon />}
        variant="ghost"
        onClick={() => setShowInput(true)}
        size="md"
        mr={2}
        zIndex={30}
      />
      {showInput && (
        <Box
          position="absolute"
          right={0}
          top={0}
          zIndex={9999}
          minW="350px"
          w="400px"
          bg="white"
          boxShadow="2xl"
          borderRadius="md"
        >
          <Input
            placeholder="Rechercher un jeu..."
            value={query}
            onChange={handleChange}
            autoFocus
            autoComplete="off"
            aria-label="Recherche de jeux"
            mb={1}
            bg="white"
            borderRadius="md"
            boxShadow="none"
            fontSize="lg"
            h="48px"
            px={6}
            style={{ background: 'white', opacity: 1 }}
          />
          {loading && (
            <Spinner size="md" position="absolute" right={4} top={3} />
          )}
          {showDropdown && results.length > 0 && (
            <List
              position="absolute"
              zIndex={9999}
              w="100%"
              minW="350px"
              bg="white"
              borderRadius="md"
              boxShadow="2xl"
              mt={1}
              maxH="350px"
              overflowY="auto"
              style={{ background: 'white', opacity: 1 }}
            >
              {results.map((game) => (
                <ListItem
                  key={game.id}
                  px={6}
                  py={3}
                  fontSize="lg"
                  cursor="pointer"
                  _hover={{ bg: 'gray.100' }}
                  onClick={() => handleSelect(game)}
                >
                  {game.name}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Search;
