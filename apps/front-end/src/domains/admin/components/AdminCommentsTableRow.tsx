import { Tr, Td } from '@chakra-ui/react';
import Button from '@frontend/domains/shared/button/components/Button';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import Modal from '../../shared/modal/Modal';
import { type Comment } from '@frontend/domains/comment/type';

type Props = {
  comment: Comment;
};

const AdminCommentsTableRow = (props: Props) => {
  const { comment } = props;
  const [isModalOpen, setModalOpen] = useState(false);

  const ellipsisStyle = {
    maxWidth: '180px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  };

  // const handleClick = async () => {
  //   setLoading(true);
  //   try {
  //     await deletePostApi(post.id, token ?? '');
  //     dispatch(deletePostAction(post.id));
  //     setModalOpen(false);
  //   } catch (e) {
  //     console.log('error', e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
          <Button color="primary" type="button">
            <Link href={`/posts/${comment.id}`}>Voir</Link>
          </Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirmation"
            footer={
              <>
                <Button
                  color="secondary"
                  type="button"
                  // handleClick={handleClick}
                >
                  Confirmer
                </Button>
                <Button
                  color="primary"
                  type="button"
                  handleClick={() => setModalOpen(false)}
                >
                  Annuler
                </Button>
              </>
            }
          >
            Êtes-vous sûr de vouloir supprimer ce commentaire ?
          </Modal>
        </Td>
      </Tr>
    </Fragment>
  );
};

export default AdminCommentsTableRow;
