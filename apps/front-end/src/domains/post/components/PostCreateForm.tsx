'use client';

import React from 'react';
import { VStack } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useAppSelector } from '@/store/hook';
import Button from '@frontend/domains/shared/button/components/Button';
import ConfirmationModal from '@frontend/domains/shared/modal/ConfirmationModal';
import PostTitleField from './PostTitleField';
import PostCategoryField from './PostCategoryField';
import PostImageField from './PostImageField';
import PostBodyField from './PostBodyField';
import PostGamesField from './PostGamesField';
import { usePostCreate } from '../services/usePostCreate';

const PostCreateForm = () => {
  const { token } = useAppSelector((state) => state.user);

  if (!token) return null;

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
    handleConfirmCreate,
    handleUpload,
  } = usePostCreate(token);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="form-title"
        role="form"
      >
        <VStack spacing={6}>
          <h2 id="form-title" style={{ fontSize: '1.3em', fontWeight: 'bold' }}>
            Créer un nouvel article
          </h2>

          <PostTitleField errors={errors} register={register} />

          <PostCategoryField errors={errors} register={register} />

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
            icon={<FaPlus />}
            isDisabled={!formIsValid}
            isLoading={isSubmitting}
            aria-label="Créer l'article"
            data-testid="post-submit-button"
          >
            Créer l'article
          </Button>
        </VStack>
      </form>

      <ConfirmationModal
        isModalOpen={isModalOpen}
        setModalOpen={(open) => {
          if (!open) setPendingData(null);
          closeModal();
        }}
        onConfirm={handleConfirmCreate}
        title={'Êtes-vous sûr de vouloir créer cet article ?'}
      />
    </>
  );
};

export default PostCreateForm;
