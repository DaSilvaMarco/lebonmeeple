import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import PostCreateForm from '../components/PostCreateForm';
import { convertToBase64 } from '@/utils/convertToBase64';

// Mock external dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react');
  return {
    ...actual,
    useToast: vi.fn(),
  };
});

vi.mock('@/utils/convertToBase64', () => ({
  convertToBase64: vi.fn(),
}));

vi.mock('@/utils/api-config', () => ({
  getApiBaseUrl: vi.fn(() => 'http://localhost:3001'),
}));

vi.mock('@/domains/shared/toat/toast', () => ({
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

// Mock fetch globally
global.fetch = vi.fn();

// Mock store setup
const mockStore = configureStore({
  reducer: {
    user: (
      state = { isAuthenticated: true, user: { id: 1 }, token: 'test-token' },
    ) => state,
  },
});

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>
    <ChakraProvider>{children}</ChakraProvider>
  </Provider>
);

describe('PostCreateForm', () => {
  const mockPush = vi.fn();
  const mockToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({ push: mockPush });
    (useToast as Mock).mockReturnValue(mockToast);
    (global.fetch as Mock).mockClear();
  });

  it('should render form with all required fields and handle validation', async () => {
    render(
      <TestWrapper>
        <PostCreateForm />
      </TestWrapper>,
    );

    // Verify form elements are present
    expect(screen.getByLabelText("Titre de l'article")).toBeInTheDocument();
    expect(screen.getByLabelText("Contenu de l'article")).toBeInTheDocument();
    expect(screen.getByLabelText(/image/i)).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: /créer l'article/i,
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled(); // Initially disabled

    // Fill required fields to enable form
    const titleInput = screen.getByLabelText("Titre de l'article");
    const contentInput = screen.getByLabelText("Contenu de l'article");

    await userEvent.type(titleInput, 'Test Title');
    await userEvent.type(contentInput, 'Test content');

    // Button should now be enabled
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should handle file upload and conversion', async () => {
    const mockBase64 = 'data:image/jpeg;base64,mockbase64';
    (convertToBase64 as Mock).mockResolvedValue(mockBase64);

    render(
      <TestWrapper>
        <PostCreateForm />
      </TestWrapper>,
    );

    // Create a mock file
    const file = new File(['mock image'], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText(/image/i);

    // Upload file
    await userEvent.upload(fileInput, file);

    // Verify file conversion was called
    await waitFor(() => {
      expect(convertToBase64).toHaveBeenCalledWith(file);
    });
  });

  it('should handle API errors during submission', async () => {
    // Mock fetch to reject
    (global.fetch as Mock).mockRejectedValue(new Error('Network error'));

    render(
      <TestWrapper>
        <PostCreateForm />
      </TestWrapper>,
    );

    // Fill form with valid data
    const titleInput = screen.getByLabelText("Titre de l'article");
    const contentInput = screen.getByLabelText("Contenu de l'article");

    await userEvent.type(titleInput, 'Valid Title');
    await userEvent.type(contentInput, 'Valid content for the post');

    // Submit form
    const submitButton = screen.getByRole('button', {
      name: /créer l'article/i,
    });
    fireEvent.click(submitButton);

    // Verify fetch was called and error handling occurred
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it('should successfully submit form with all data including image', async () => {
    const mockBase64 = 'data:image/jpeg;base64,mockbase64';
    (convertToBase64 as Mock).mockResolvedValue(mockBase64);

    // Mock successful fetch response
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ id: 123 }),
    };
    (global.fetch as Mock).mockResolvedValue(mockResponse);

    render(
      <TestWrapper>
        <PostCreateForm />
      </TestWrapper>,
    );

    // Fill all form fields
    const titleInput = screen.getByLabelText("Titre de l'article");
    const contentInput = screen.getByLabelText("Contenu de l'article");
    const fileInput = screen.getByLabelText(/image/i);

    await userEvent.type(titleInput, 'Complete Post Title');
    await userEvent.type(
      contentInput,
      'This is a complete post content with sufficient length',
    );

    // Upload image
    const file = new File(['mock image'], 'complete.jpg', {
      type: 'image/jpeg',
    });
    await userEvent.upload(fileInput, file);

    // Wait for image processing
    await waitFor(() => {
      expect(convertToBase64).toHaveBeenCalledWith(file);
    });

    // Submit form
    const submitButton = screen.getByRole('button', {
      name: /créer l'article/i,
    });
    fireEvent.click(submitButton);

    // Verify successful submission
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/post',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          }),
          body: JSON.stringify({
            title: 'Complete Post Title',
            body: 'This is a complete post content with sufficient length',
            image: mockBase64,
          }),
        }),
      );
      expect(mockPush).toHaveBeenCalledWith('/posts');
    });
  });
});
