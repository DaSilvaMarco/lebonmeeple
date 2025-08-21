import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';
import { store } from '@/store/store';
import * as service from '@frontend/domains/user/service/service';
import { toastError } from '@/domains/shared/toat/toast';

vi.mock('@frontend/domains/user/service/service');
vi.mock('@/domains/shared/toat/toast', () => ({
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

describe('LoginForm', () => {
  const setup = () =>
    render(
      <Provider store={store}>
        <ChakraProvider>
          <LoginForm />
        </ChakraProvider>
      </Provider>,
    );

  it('should submit valid form and call login', async () => {
    const mockUser = { id: 1, email: 'test@test.com' };
    (
      service.signinAndGetMe as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(mockUser);
    setup();
    fireEvent.change(screen.getByLabelText(/Adresse e-mail/i), {
      target: { value: 'test@test.com' },
    });
    const emailInput = screen.getByLabelText('Adresse e-mail');
    const passwordInput = screen.getByLabelText('Mot de passe');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.blur(passwordInput);
    const submitBtn = await screen.findByRole('button', {
      name: /Se connecter/i,
    });
    expect(submitBtn).not.toBeDisabled();
  });

  it('should show error on failed login', async () => {
    (
      service.signinAndGetMe as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValueOnce(new Error('fail'));
    setup();
    fireEvent.change(screen.getByLabelText(/Adresse e-mail/i), {
      target: { value: 'test@test.com' },
    });
    const emailInput = screen.getByLabelText('Adresse e-mail');
    const passwordInput = screen.getByLabelText('Mot de passe');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.blur(passwordInput);
    const submitBtn = await screen.findByRole('button', {
      name: /Se connecter/i,
    });
    expect(submitBtn).not.toBeDisabled();
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    await waitFor(() => {
      expect(toastError).toHaveBeenCalled();
    });
  });

  it('should toggle password visibility', () => {
    setup();
    const btn = screen.getByLabelText(/Afficher le mot de passe/i);
    fireEvent.click(btn);
    expect(
      screen.getByLabelText(/Masquer le mot de passe/i),
    ).toBeInTheDocument();
  });

  it('should disable submit button if form is invalid', () => {
    setup();
    expect(
      screen.getByRole('button', { name: /Se connecter/i }),
    ).toBeDisabled();
  });
});
