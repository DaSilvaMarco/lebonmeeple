import React, { useRef, useEffect } from 'react';
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
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.setAttribute('tabIndex', '0');
    }
  }, []);

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
      role="region"
      aria-labelledby="admin-posts-table-title"
    >
      <h2
        id="admin-posts-table-title"
        style={{
          position: 'absolute',
          left: '-9999px',
          height: '1px',
          width: '1px',
          overflow: 'hidden',
        }}
      >
        Tableau de gestion des posts
      </h2>
      <TableContainer w="100%">
        <Table
          ref={tableRef}
          variant="simple"
          w="100%"
          aria-describedby="admin-posts-table-desc"
          role="table"
        >
          <caption
            id="admin-posts-table-desc"
            style={{
              position: 'absolute',
              left: '-9999px',
              height: '1px',
              width: '1px',
              overflow: 'hidden',
            }}
          >
            Liste des posts avec options de modification et suppression
          </caption>
          <Thead>
            <Tr>
              <Th scope="col">ID</Th>
              <Th scope="col">Image</Th>
              <Th scope="col">Titre</Th>
              <Th scope="col">Contenu</Th>
              <Th scope="col">Utilisateur</Th>
              <Th scope="col">Actions</Th>
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
