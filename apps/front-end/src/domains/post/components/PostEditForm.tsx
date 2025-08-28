'use client';

import React from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';
import Button from '@frontend/domains/shared/button/components/Button';
import ConfirmationModal from '@/domains/shared/modal/ConfirmationModal';
import type { Post } from '@frontend/domains/post/type';
import { usePostEdit } from '@/domains/post/services/usePostEdit';
import PostImageField from './PostImageField';
import PostTitleField from './PostTitleField';
import PostEditField from './PostCategoryField';
import PostBodyField from './PostBodyField';
import PostGamesField from './PostGamesField';

type Props = {
  post: Post | null;
  token: string;
};

const PostEditForm = ({ post, token }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    gameOptions,
    loadingGames,
    watchedValues,
    formIsValid,
    isModalOpen,
    closeModal,
    setPendingData,
    onSubmit,
    handleConfirmEdit,
    handleUpload,
  } = usePostEdit(post, token);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="form-title-edit"
        role="form"
      >
        <VStack spacing={6}>
          <Heading
            as="h2"
            id="form-title-edit"
            size="lg"
            fontWeight="bold"
            mb={2}
          >
            Modifier l’article
          </Heading>

          <PostTitleField errors={errors} register={register} />

          <PostEditField errors={errors} register={register} />

          <PostGamesField
            errors={errors}
            setValue={setValue}
            gameOptions={gameOptions}
            loadingGames={loadingGames}
            watchedValues={watchedValues}
          />

          <PostImageField onChange={handleUpload} errors={errors} />

          <PostBodyField errors={errors} register={register} />

          <Button
            type="submit"
            color="primary"
            icon={<FaSave />}
            isDisabled={!formIsValid}
            isLoading={isSubmitting}
            aria-label="Sauvegarder les modifications"
          >
            Sauvegarder les modifications
          </Button>
        </VStack>
      </form>

      <ConfirmationModal
        isModalOpen={isModalOpen}
        setModalOpen={(open) => {
          if (!open) setPendingData(null);
          closeModal();
        }}
        onConfirm={handleConfirmEdit}
        title={'Êtes-vous sûr de vouloir sauvegarder les modifications ?'}
      />
    </>
  );
};

export default PostEditForm;
