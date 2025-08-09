// import { describe, expect, it } from 'vitest';
import {
  type PostCreateFormData,
  type PostUpdateFormData,
  createPostSchema,
  updatePostSchema,
} from '../schema';

describe('Post Schema Validation', () => {
  it('should validate createPostSchema with all field scenarios', () => {
    // Test valid complete data
    const validData = {
      title: 'Valid Title',
      body: 'Valid body content',
      image: '/image.jpg',
    };

    const validResult = createPostSchema.safeParse(validData);
    expect(validResult.success).toBe(true);
    if (validResult.success) {
      expect(validResult.data.title).toBe('Valid Title');
      expect(validResult.data.body).toBe('Valid body content');
      expect(validResult.data.image).toBe('/image.jpg');
    }

    // Test title validation - empty, whitespace, length limits, trimming
    expect(
      createPostSchema.safeParse({ title: '', body: 'Valid body' }).success,
    ).toBe(false);
    expect(
      createPostSchema.safeParse({ title: '   ', body: 'Valid body' }).success,
    ).toBe(false);
    expect(
      createPostSchema.safeParse({ title: 'a'.repeat(101), body: 'Valid body' })
        .success,
    ).toBe(false);
    expect(
      createPostSchema.safeParse({ title: 'a'.repeat(100), body: 'Valid body' })
        .success,
    ).toBe(true);

    const trimResult = createPostSchema.safeParse({
      title: '  Valid Title  ',
      body: 'Valid body',
    });
    expect(trimResult.success).toBe(true);
    if (trimResult.success) {
      expect(trimResult.data.title).toBe('Valid Title');
    }

    // Test body validation - empty, whitespace, length limits, trimming
    expect(
      createPostSchema.safeParse({ title: 'Valid Title', body: '' }).success,
    ).toBe(false);
    expect(
      createPostSchema.safeParse({ title: 'Valid Title', body: '   \n\t   ' })
        .success,
    ).toBe(false);
    expect(
      createPostSchema.safeParse({
        title: 'Valid Title',
        body: 'a'.repeat(5001),
      }).success,
    ).toBe(false);
    expect(
      createPostSchema.safeParse({
        title: 'Valid Title',
        body: 'a'.repeat(5000),
      }).success,
    ).toBe(true);

    const bodyTrimResult = createPostSchema.safeParse({
      title: 'Valid Title',
      body: '  Valid body  ',
    });
    expect(bodyTrimResult.success).toBe(true);
    if (bodyTrimResult.success) {
      expect(bodyTrimResult.data.body).toBe('Valid body');
    }

    // Test image validation - various formats
    expect(
      createPostSchema.safeParse({ title: 'Valid Title', body: 'Valid body' })
        .success,
    ).toBe(true);
    expect(
      createPostSchema.safeParse({
        title: 'Valid Title',
        body: 'Valid body',
        image: '',
      }).success,
    ).toBe(true);
    expect(
      createPostSchema.safeParse({
        title: 'Valid Title',
        body: 'Valid body',
        image: '/path/to/image.jpg',
      }).success,
    ).toBe(true);
    expect(
      createPostSchema.safeParse({
        title: 'Valid Title',
        body: 'Valid body',
        image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD',
      }).success,
    ).toBe(true);

    // Test multiple validation errors
    const multiErrorResult = createPostSchema.safeParse({
      title: '',
      body: '',
    });
    expect(multiErrorResult.success).toBe(false);
    if (!multiErrorResult.success) {
      expect(multiErrorResult.error.issues).toHaveLength(2);
      expect(multiErrorResult.error.issues[0].message).toBe(
        'Le titre est requis',
      );
      expect(multiErrorResult.error.issues[1].message).toBe(
        'Le contenu est requis',
      );
    }

    // Test additional properties handling
    const extraPropsResult = createPostSchema.safeParse({
      title: 'Valid Title',
      body: 'Valid body',
      image: '/image.jpg',
      extraField: 'should not be allowed',
    });
    expect(extraPropsResult.success).toBe(true);
    if (extraPropsResult.success) {
      expect(extraPropsResult.data).not.toHaveProperty('extraField');
      expect(Object.keys(extraPropsResult.data)).toEqual([
        'title',
        'body',
        'image',
      ]);
    }
  });

  it('should validate updatePostSchema with same rules as createPostSchema', () => {
    // Test that updatePostSchema has identical validation rules
    const validData = {
      title: 'Updated Title',
      body: 'Updated body content',
      image: '/updated/image.jpg',
    };

    const createResult = createPostSchema.safeParse(validData);
    const updateResult = updatePostSchema.safeParse(validData);

    expect(createResult.success).toBe(true);
    expect(updateResult.success).toBe(true);
    expect(createResult.data).toEqual(updateResult.data);

    // Test invalid data consistency
    const invalidData = { title: '', body: '' };
    const createInvalidResult = createPostSchema.safeParse(invalidData);
    const updateInvalidResult = updatePostSchema.safeParse(invalidData);

    expect(createInvalidResult.success).toBe(false);
    expect(updateInvalidResult.success).toBe(false);
    if (!createInvalidResult.success && !updateInvalidResult.success) {
      expect(createInvalidResult.error.issues).toHaveLength(
        updateInvalidResult.error.issues.length,
      );
    }

    // Test title length validation
    const longTitleData = { title: 'a'.repeat(101), body: 'Valid body' };
    const updateTitleResult = updatePostSchema.safeParse(longTitleData);
    expect(updateTitleResult.success).toBe(false);
    if (!updateTitleResult.success) {
      expect(updateTitleResult.error.issues[0].message).toBe(
        'Le titre ne peut pas dépasser 100 caractères',
      );
    }

    // Test body length validation
    const longBodyData = { title: 'Valid Title', body: 'a'.repeat(5001) };
    const updateBodyResult = updatePostSchema.safeParse(longBodyData);
    expect(updateBodyResult.success).toBe(false);
    if (!updateBodyResult.success) {
      expect(updateBodyResult.error.issues[0].message).toBe(
        'Le contenu ne peut pas dépasser 5000 caractères',
      );
    }
  });

  it('should handle type inference and edge cases correctly', () => {
    // Test type inference for PostCreateFormData
    const createData: PostCreateFormData = {
      title: 'Test Title',
      body: 'Test Body',
      image: '/test.jpg',
    };
    expect(createData.title).toBe('Test Title');
    expect(createData.body).toBe('Test Body');
    expect(createData.image).toBe('/test.jpg');

    // Test type inference for PostUpdateFormData
    const updateData: PostUpdateFormData = {
      title: 'Updated Title',
      body: 'Updated Body',
      image: '/updated.jpg',
    };
    expect(updateData.title).toBe('Updated Title');
    expect(updateData.body).toBe('Updated Body');
    expect(updateData.image).toBe('/updated.jpg');

    // Test optional image in types
    const createDataWithoutImage: PostCreateFormData = {
      title: 'Test Title',
      body: 'Test Body',
    };
    const updateDataWithoutImage: PostUpdateFormData = {
      title: 'Updated Title',
      body: 'Updated Body',
    };
    expect(createDataWithoutImage.image).toBeUndefined();
    expect(updateDataWithoutImage.image).toBeUndefined();

    // Test type safety
    const validCreateData: PostCreateFormData = {
      title: 'Test',
      body: 'Test Body',
      image: '/test.jpg',
    };
    const validUpdateData: PostUpdateFormData = {
      title: 'Test',
      body: 'Test Body',
      image: '/test.jpg',
    };
    const createKeys = Object.keys(validCreateData);
    const updateKeys = Object.keys(validUpdateData);
    expect(createKeys.sort()).toEqual(updateKeys.sort());

    // Test edge cases - special characters, emojis, newlines
    const specialCharsData = {
      title: 'Title with special chars: àáâãäåæçèéêë!@#$%^&*()',
      body: 'Body with émojis 🎮🎲 and special chars: àáâãäåæçèéêë',
      image: '/special-image.jpg',
    };
    expect(createPostSchema.safeParse(specialCharsData).success).toBe(true);

    // Test newlines and tabs
    const newlineData = {
      title: 'Title with content',
      body: 'Line 1\nLine 2\n\tTabbed content\n\nEmpty line above',
      image: '/image.jpg',
    };
    expect(createPostSchema.safeParse(newlineData).success).toBe(true);

    // Test numeric strings
    const numericData = { title: '12345', body: '67890', image: '12345.jpg' };
    expect(createPostSchema.safeParse(numericData).success).toBe(true);

    // Test mixed content with base64 image
    const mixedData = {
      title: 'Title 123 with émojis 🎮',
      body: 'Mixed content:\n- Numbers: 123\n- Émojis: 🎲\n- Special: @#$',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    };
    expect(createPostSchema.safeParse(mixedData).success).toBe(true);
  });
});
