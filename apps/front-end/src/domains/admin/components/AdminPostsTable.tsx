import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  useColorModeValue,
} from '@chakra-ui/react';
import { Post } from '@frontend/domains/post/type';
import AdminPostsTableRow from './AdminPostsTableRow';

type Props = {
  posts: Post[];
};

const AdminPostsTable = (props: Props) => {
  const { posts } = props;
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
      maxW="100vw"
      overflowX="auto"
    >
      <TableContainer w="100%">
        <Table variant="simple" w="100%">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Image</Th>
              <Th>Titre</Th>
              <Th>Contenu</Th>
              <Th>Utilisateur</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((post) => (
              <AdminPostsTableRow key={post.id} post={post} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminPostsTable;
