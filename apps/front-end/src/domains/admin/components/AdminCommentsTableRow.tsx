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
      <Tr
        tabIndex={0}
        aria-label={`Commentaire de ${comment.user?.username ?? 'utilisateur inconnu'}`}
      >
        <Td
          tabIndex={0}
          aria-label={`Identifiant du commentaire : ${comment.id}`}
        >
          <span style={ellipsisStyle}>{comment.id}</span>
        </Td>
        <Td
          tabIndex={0}
          aria-label={`Contenu du commentaire : ${comment.body}`}
        >
          <span style={ellipsisStyle}>{comment.body}</span>
        </Td>
        <Td
          tabIndex={0}
          aria-label={`Utilisateur : ${comment.user?.username ?? 'inconnu'}`}
        >
          <span style={ellipsisStyle}>{comment.user?.username}</span>
        </Td>
        <Td>
          <span
            tabIndex={0}
            aria-label="Supprimer ce commentaire"
            style={{ outline: 'none', display: 'inline-block' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setModalOpen(true);
            }}
          >
            <Button
              color="primary"
              type="button"
              handleClick={() => setModalOpen(true)}
            >
              Supprimer
            </Button>
          </span>
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
