import React, { useState, useRef } from 'react';
import {
  Input,
  Box,
  List,
  ListItem,
  Spinner,
  useOutsideClick,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { getGames } from '@/domains/games/api/get-games';
import { type Game } from '@/domains/games/type';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: () => setShowDropdown(false),
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
    router.push(`/game/${game.id}`);
  };

  return (
    <Box position="relative" w="100%" maxW="400px" mx="auto" ref={ref}>
      <Input
        placeholder="Rechercher un jeu..."
        value={query}
        onChange={handleChange}
        autoComplete="off"
        aria-label="Recherche de jeux"
      />
      {loading && <Spinner size="sm" position="absolute" right={2} top={2} />}
      {showDropdown && results.length > 0 && (
        <List
          position="absolute"
          zIndex={10}
          w="100%"
          bg="white"
          borderRadius="md"
          boxShadow="md"
          mt={1}
          maxH="250px"
          overflowY="auto"
        >
          {results.map((game) => (
            <ListItem
              key={game.id}
              px={4}
              py={2}
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
  );
};

export default Search;
