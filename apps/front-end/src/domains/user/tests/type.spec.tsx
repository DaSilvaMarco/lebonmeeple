import { describe, it, expect } from 'vitest';
import {
  schemaUserLogin,
  userProfileUpdateSchema,
  schemaUserSignup,
  type LoginFormData,
  type UserProfileFormData,
  type SignupFormData,
  type User,
  type UserState,
  type Me,
  type Signin,
  type UpdatedUser,
  type Signup,
} from '../type';

describe('User Types and Schemas', () => {
  describe('schemaUserLogin', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = schemaUserLogin.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };

      const result = schemaUserLogin.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email invalide');
      }
    });

    it('should reject password shorter than 6 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '12345',
      };

      const result = schemaUserLogin.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Le mot de passe doit contenir au moins 6 caractères',
        );
      }
    });
  });

  describe('userProfileUpdateSchema', () => {
    it('should validate correct profile update data', () => {
      const validData = {
        username: 'testuser',
        email: 'test@example.com',
        avatar: 'avatar.jpg',
      };

      const result = userProfileUpdateSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should validate profile update data without avatar', () => {
      const validData = {
        username: 'testuser',
        email: 'test@example.com',
      };

      const result = userProfileUpdateSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should reject empty username', () => {
      const invalidData = {
        username: '',
        email: 'test@example.com',
      };

      const result = userProfileUpdateSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Le pseudo est requis');
      }
    });

    it('should reject invalid email', () => {
      const invalidData = {
        username: 'testuser',
        email: 'invalid-email',
      };

      const result = userProfileUpdateSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email invalide');
      }
    });
  });

  describe('schemaUserSignup', () => {
    it('should validate correct signup data', () => {
      const validData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
        avatar: 'avatar.jpg',
      };

      const result = schemaUserSignup.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should validate signup data without avatar', () => {
      const validData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
      };

      const result = schemaUserSignup.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should reject username shorter than 3 characters', () => {
      const invalidData = {
        username: 'ab',
        email: 'test@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
      };

      const result = schemaUserSignup.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Le pseudo doit contenir au moins 3 caractères',
        );
      }
    });

    it('should reject username longer than 20 characters', () => {
      const invalidData = {
        username: 'a'.repeat(21),
        email: 'test@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
      };

      const result = schemaUserSignup.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Le pseudo ne peut pas dépasser 20 caractères',
        );
      }
    });

    it('should reject invalid email', () => {
      const invalidData = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123',
        passwordConfirmation: 'password123',
      };

      const result = schemaUserSignup.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email invalide');
      }
    });

    it('should reject password shorter than 6 characters', () => {
      const invalidData = {
        username: 'testuser',
        email: 'test@example.com',
        password: '12345',
        passwordConfirmation: '12345',
      };

      const result = schemaUserSignup.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Le mot de passe doit contenir au moins 6 caractères',
        );
      }
    });

    it('should reject password longer than 100 characters', () => {
      const longPassword = 'a'.repeat(101);
      const invalidData = {
        username: 'testuser',
        email: 'test@example.com',
        password: longPassword,
        passwordConfirmation: longPassword,
      };

      const result = schemaUserSignup.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Le mot de passe ne peut pas dépasser 100 caractères',
        );
      }
    });

    it('should reject mismatched passwords', () => {
      const invalidData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        passwordConfirmation: 'differentpassword',
      };

      const result = schemaUserSignup.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Les mots de passe ne correspondent pas',
        );
        expect(result.error.issues[0].path).toEqual(['passwordConfirmation']);
      }
    });
  });

  describe('Type inference', () => {
    it('should correctly infer LoginFormData type', () => {
      const loginData: LoginFormData = {
        email: 'test@example.com',
        password: 'password123',
      };

      expect(loginData.email).toBe('test@example.com');
      expect(loginData.password).toBe('password123');
    });

    it('should correctly infer UserProfileFormData type', () => {
      const profileData: UserProfileFormData = {
        username: 'testuser',
        email: 'test@example.com',
        avatar: 'avatar.jpg',
      };

      expect(profileData.username).toBe('testuser');
      expect(profileData.email).toBe('test@example.com');
      expect(profileData.avatar).toBe('avatar.jpg');
    });

    it('should correctly infer SignupFormData type', () => {
      const signupData: SignupFormData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
        avatar: 'avatar.jpg',
      };

      expect(signupData.username).toBe('testuser');
      expect(signupData.email).toBe('test@example.com');
      expect(signupData.password).toBe('password123');
      expect(signupData.passwordConfirmation).toBe('password123');
      expect(signupData.avatar).toBe('avatar.jpg');
    });
  });

  describe('Type definitions', () => {
    it('should correctly define User type', () => {
      const user: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        avatar: 'avatar.jpg',
      };

      expect(user.id).toBe(1);
      expect(user.username).toBe('testuser');
      expect(user.email).toBe('test@example.com');
      expect(user.avatar).toBe('avatar.jpg');
    });

    it('should correctly define UserState type', () => {
      const userState: UserState = {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: true,
      };

      expect(userState.user).toBeNull();
      expect(userState.token).toBeNull();
      expect(userState.isAuthenticated).toBe(false);
      expect(userState.isLoading).toBe(true);
    });

    it('should correctly define Me type', () => {
      const me: Me = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        iat: 1234567890,
        exp: 1234567890,
      };

      expect(me.id).toBe(1);
      expect(me.username).toBe('testuser');
      expect(me.email).toBe('test@example.com');
      expect(me.iat).toBe(1234567890);
      expect(me.exp).toBe(1234567890);
    });

    it('should correctly define Signin type', () => {
      const signin: Signin = {
        token: 'jwt-token',
        userStorage: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          avatar: 'avatar.jpg',
        },
      };

      expect(signin.token).toBe('jwt-token');
      expect(signin.userStorage.id).toBe(1);
      expect(signin.userStorage.username).toBe('testuser');
    });

    it('should correctly define UpdatedUser type', () => {
      const updatedUser: UpdatedUser = {
        username: 'newusername',
        email: 'newemail@example.com',
        avatar: 'newavatar.jpg',
      };

      expect(updatedUser.username).toBe('newusername');
      expect(updatedUser.email).toBe('newemail@example.com');
      expect(updatedUser.avatar).toBe('newavatar.jpg');
      // Verify that id is not present (Omit<User, 'id'>)
      expect('id' in updatedUser).toBe(false);
    });

    it('should correctly define Signup type', () => {
      const signup: Signup = {
        email: 'test@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
        username: 'testuser',
        avatar: 'avatar.jpg',
      };

      expect(signup.email).toBe('test@example.com');
      expect(signup.password).toBe('password123');
      expect(signup.passwordConfirmation).toBe('password123');
      expect(signup.username).toBe('testuser');
      expect(signup.avatar).toBe('avatar.jpg');
    });
  });
});
