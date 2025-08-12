import { Tr, Td } from '@chakra-ui/react';
import { Post } from '@frontend/domains/post/type';
import Button from '@frontend/domains/shared/button/components/Button';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { deletePost as deletePostAction } from '@/domains/post/slice';
import { deletePost as deletePostApi } from '@/domains/post/api/delete-post';
import ConfirmationModal from '@frontend/domains/shared/modal/ConfirmationModal';

type Props = {
  post: Post;
};

const AdminPostsTableRow = (props: Props) => {
  const { post } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  const ellipsisStyle = {
    maxWidth: '180px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  };

  const handleClick = async () => {
    try {
      await deletePostApi(post.id, token ?? '');
      dispatch(deletePostAction(post.id));
      setModalOpen(false);
    } catch (e) {
      console.log('error', e);
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
          <ConfirmationModal
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            onConfirm={handleClick}
            title="Êtes-vous sûr de vouloir supprimer ce post ?"
          />
        </Td>
      </Tr>
    </Fragment>
  );
};

export default AdminPostsTableRow;
