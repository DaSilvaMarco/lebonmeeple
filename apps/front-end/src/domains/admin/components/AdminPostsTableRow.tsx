import { Tr, Td } from '@chakra-ui/react';
import { Post } from '@frontend/domains/post/type';
import Button from '@frontend/domains/shared/button/components/Button';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { deletePost as deletePostAction } from '@/domains/post/slice';
import { deletePost as deletePostApi } from '@/domains/post/api/delete-post';
import Modal from '../../shared/modal/Modal';

type Props = {
  post: Post;
};

const AdminPostsTableRow = (props: Props) => {
  const { post } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const ellipsisStyle = {
    maxWidth: '180px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      await deletePostApi(post.id, token ?? '');
      dispatch(deletePostAction(post.id));
      setModalOpen(false);
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment key={post.id}>
      <Tr>
        <Td>
          <span style={ellipsisStyle}>{post.id}</span>
        </Td>
        <Td>
          <Image src={post.image} width={50} height={50} alt={post.title} />
        </Td>
        <Td>
          <span style={ellipsisStyle}>{post.title}</span>
        </Td>
        <Td>
          <span style={ellipsisStyle}>{post.body}</span>
        </Td>
        <Td>
          <span style={ellipsisStyle}>{post.user?.username}</span>
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
            <Link href={`/post/${post.id}`}>Voir</Link>
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
                  isLoading={loading}
                  handleClick={handleClick}
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
            Êtes-vous sûr de vouloir supprimer ce post ?
          </Modal>
        </Td>
      </Tr>
    </Fragment>
  );
};

export default AdminPostsTableRow;
