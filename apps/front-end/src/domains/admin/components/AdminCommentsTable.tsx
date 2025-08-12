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
import AdminCommentsTableRow from './AdminCommentsTableRow';
import { type Comment } from '@frontend/domains/comment/type';

type Props = {
  comments: Comment[];
};

const AdminCommentsTable = (props: Props) => {
  const { comments } = props;
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
              <Th>Contenu</Th>
              <Th>Utilisateur</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {comments.map((comment, index) => (
              <AdminCommentsTableRow key={index} comment={comment} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminCommentsTable;
