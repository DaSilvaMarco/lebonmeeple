import React, { useState, useMemo } from 'react';
import {
  Box,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  List,
  ListItem,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';

export interface SearchMultiSelectOption {
  label: string;
  value: string | number;
}

interface SearchMultiSelectProps {
  options: SearchMultiSelectOption[];
  value: (string | number)[];
  onChange: (selected: (string | number)[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const SearchMultiSelect: React.FC<SearchMultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Rechercher...',
  disabled = false,
  className = '',
}) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase()) &&
        !value.includes(opt.value),
    );
  }, [options, search, value]);

  const handleSelect = (option: SearchMultiSelectOption) => {
    onChange([...value, option.value]);
    setSearch('');
  };

  const handleRemove = (val: string | number) => {
    onChange(value.filter((v) => v !== val));
  };

  // Chakra UI colors
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const borderActive = useColorModeValue('blue.400', 'blue.300');
  const bgInput = useColorModeValue('white', 'gray.800');
  const bgDropdown = useColorModeValue('white', 'gray.700');
  const tagBg = useColorModeValue('blue.500', 'blue.300');
  const tagColor = useColorModeValue('white', 'gray.900');
  const tagHover = useColorModeValue('blue.600', 'blue.400');
  const optionHover = useColorModeValue('blue.50', 'blue.900');

  return (
    <Box position="relative" w="full" className={className}>
      <Flex
        flexWrap="wrap"
        alignItems="center"
        borderWidth={2}
        borderRadius="xl"
        px={3}
        py={2}
        minH={12}
        boxShadow={isOpen ? 'lg' : 'sm'}
        borderColor={isOpen ? borderActive : borderColor}
        bg={bgInput}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        transition="all 0.2s"
        onClick={() => !disabled && setIsOpen(true)}
        tabIndex={0}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      >
        {value.length > 0 && (
          <Flex flexWrap="wrap" gap={2} mr={2}>
            {value.map((val) => {
              const opt = options.find((o) => o.value === val);
              return opt ? (
                <Tag
                  key={val}
                  borderRadius="full"
                  px={3}
                  py={1}
                  bg={tagBg}
                  color={tagColor}
                  fontWeight="bold"
                  fontSize="sm"
                  boxShadow="md"
                  _hover={{ bg: tagHover }}
                  transition="all 0.15s"
                >
                  <TagLabel>{opt.label}</TagLabel>
                  {!disabled && (
                    <TagCloseButton
                      ml={1}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(val);
                      }}
                      aria-label={`Retirer ${opt.label}`}
                    />
                  )}
                </Tag>
              ) : null;
            })}
          </Flex>
        )}
        <Input
          variant="unstyled"
          minW="80px"
          px={2}
          py={1}
          fontSize="md"
          bg="transparent"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={disabled}
          onFocus={() => setIsOpen(true)}
          _focus={{ boxShadow: 'none' }}
        />
      </Flex>
      {isOpen && filteredOptions.length > 0 && (
        <Box
          position="absolute"
          zIndex={20}
          left={0}
          right={0}
          bg={bgDropdown}
          borderWidth={2}
          borderColor={borderActive}
          borderRadius="xl"
          boxShadow="xl"
          mt={2}
          maxH="240px"
          overflowY="auto"
        >
          <List spacing={0}>
            {filteredOptions.map((opt, idx) => (
              <ListItem
                key={opt.value}
                px={4}
                py={2}
                fontSize="md"
                fontWeight="medium"
                borderBottom={
                  idx !== filteredOptions.length - 1 ? '1px solid' : 'none'
                }
                borderColor={borderColor}
                cursor="pointer"
                _hover={{ bg: optionHover, color: borderActive }}
                transition="background 0.1s"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(opt);
                }}
              >
                {opt.label}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchMultiSelect;
