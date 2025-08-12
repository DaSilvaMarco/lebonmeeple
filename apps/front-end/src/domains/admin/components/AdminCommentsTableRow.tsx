import { Tr, Td } from '@chakra-ui/react';
import Button from '@frontend/domains/shared/button/components/Button';
import React, { Fragment, useState } from 'react';
import { type Comment } from '@frontend/domains/comment/type';
import { useAppDispatch, useAppSelector } from '@frontend/store/hook';
import { deleteComment } from '@/domains/comment/slice';
import { deleteCommentApi } from '@frontend/domains/comment';
import ConfirmationModal from '../../shared/modal/ConfirmationModal';

type Props = {
  comment: Comment;
};

const AdminCommentsTableRow = (props: Props) => {
  const { comment } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const ellipsisStyle = {
    maxWidth: '180px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  };

  const handleClick = async () => {
    try {
      await deleteCommentApi(comment.id, token ?? '');
      dispatch(deleteComment(comment.id));
      setModalOpen(false);
    } catch (e) {
      console.log('error', e);
    } 
  };

  return (
    <Fragment key={comment.id}>
      <Tr>
        <Td>
          <span style={ellipsisStyle}>{comment.id}</span>
        </Td>
        <Td>
          <span style={ellipsisStyle}>{comment.body}</span>
        </Td>
        <Td>
          <span style={ellipsisStyle}>{comment.user?.username}</span>
        </Td>
        <Td>
          <Button
            color="primary"
            type="button"
            handleClick={() => setModalOpen(true)}
          >
            Supprimer
          </Button>
          <ConfirmationModal
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            onConfirm={handleClick}
            title="Êtes-vous sûr de vouloir supprimer ce commentaire ?"
          />
        </Td>
      </Tr>
    </Fragment>
  );
};

export default AdminCommentsTableRow;
