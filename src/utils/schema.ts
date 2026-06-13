import {
  AT_LEAST_ONE_NUMBER_REGEX,
  AT_LEAST_ONE_UPPERCASE_CHAR_REGEX,
  NOT_CONTAIN_ICON_REGEX,
} from '@/lib/validation/regex';
import { VALIDATION_MESSAGES } from '@/lib/validation/validation-messages';
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.REQUIRED())
    .max(254, VALIDATION_MESSAGES.MAX_LENGTH('Email address', 254))
    .email({ error: VALIDATION_MESSAGES.INVALID_FORMAT('email') }),
  password: z.string().min(1, VALIDATION_MESSAGES.REQUIRED()),
});

export const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.REQUIRED())
    .max(254, VALIDATION_MESSAGES.MAX_LENGTH('Email address', 254))
    .email({ error: VALIDATION_MESSAGES.INVALID_FORMAT('email') }),
  password: z.string().min(1, VALIDATION_MESSAGES.REQUIRED()),
});

export const EmailVerificationSchema = z.object({
  code: z.string().min(1, VALIDATION_MESSAGES.REQUIRED()),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.REQUIRED())
    .max(254, VALIDATION_MESSAGES.MAX_LENGTH('Email address', 254))
    .email({ error: VALIDATION_MESSAGES.INVALID_FORMAT('email') }),
  code: z.string().min(1, VALIDATION_MESSAGES.REQUIRED()),
  password: z
    .string()
    .min(1, VALIDATION_MESSAGES.REQUIRED())
    .min(8, VALIDATION_MESSAGES.MIN_LENGTH('Password', 8))
    .refine(
      (value) => AT_LEAST_ONE_NUMBER_REGEX.test(value.trim()) && AT_LEAST_ONE_UPPERCASE_CHAR_REGEX.test(value.trim()),
      {
        message: 'Password must include at least 1 uppercase letter and 1 number.',
      }
    ),
});

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.REQUIRED())
    .max(32, VALIDATION_MESSAGES.MAX_LENGTH('The display name', 32))
    .refine((value) => NOT_CONTAIN_ICON_REGEX.test(value), {
      message: 'The display name can contain uppercases, lowercases, numbers, and special characters',
    }),
  image: z.string().optional(),
});

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, VALIDATION_MESSAGES.REQUIRED()),
    newPassword: z
      .string()
      .min(1, VALIDATION_MESSAGES.REQUIRED())
      .min(8, VALIDATION_MESSAGES.MIN_LENGTH('Password', 8))
      .refine(
        (value) => AT_LEAST_ONE_NUMBER_REGEX.test(value.trim()) && AT_LEAST_ONE_UPPERCASE_CHAR_REGEX.test(value.trim()),
        {
          message: 'Password must include at least 1 uppercase letter and 1 number.',
        }
      ),
    confirmPassword: z.string().min(1, VALIDATION_MESSAGES.REQUIRED()),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'The confirmation password does not match the password',
    path: ['confirmPassword'],
  });

export type SignInSchemaType = z.infer<typeof SignInSchema>;
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type EmailVerificationSchemaType = z.infer<typeof EmailVerificationSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
export type UpdatePasswordSchemaType = z.infer<typeof UpdatePasswordSchema>;
