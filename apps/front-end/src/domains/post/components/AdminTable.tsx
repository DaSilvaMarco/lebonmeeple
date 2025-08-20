import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Avatar,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

const users = [
  {
    id: 1,
    name: 'Alice Dupont',
    email: 'alice@exemple.com',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Bob Martin',
    email: 'bob@exemple.com',
    role: 'User',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Carla Moreau',
    email: 'carla@exemple.com',
    role: 'Moderator',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const roleColor = {
  Admin: 'red',
  User: 'blue',
  Moderator: 'green',
};

const AdminTable: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const border = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={8}
      bg={bg}
      borderRadius="lg"
      boxShadow="md"
      borderWidth={1}
      borderColor={border}
    >
      <TableContainer>
        <Table
          variant="simple"
          aria-label="Tableau de gestion des utilisateurs"
        >
          <TableCaption placement="top">
            Tableau de gestion des utilisateurs de la plateforme
          </TableCaption>
          <Thead>
            <Tr>
              <Th scope="col">ID</Th>
              <Th scope="col">Avatar</Th>
              <Th scope="col">Nom</Th>
              <Th scope="col">Email</Th>
              <Th scope="col">Rôle</Th>
              <Th scope="col">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>
                  <Avatar
                    name={user.name}
                    src={user.avatar || '/defaultAvatar.jpg'}
                    size="sm"
                    aria-label={`Avatar de ${user.name}`}
                    title={`Avatar de ${user.name}`}
                  />
                </Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Badge
                    colorScheme={roleColor[user.role] || 'gray'}
                    aria-label={`Rôle : ${user.role}`}
                  >
                    {user.role}
                  </Badge>
                </Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    mr={2}
                    aria-label={`Éditer l'utilisateur ${user.name}`}
                  >
                    Éditer
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    aria-label={`Supprimer l'utilisateur ${user.name}`}
                  >
                    Supprimer
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminTable;
