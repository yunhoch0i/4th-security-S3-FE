import { z } from 'zod';

const emailValidator = z.string().email('유효한 이메일 주소를 입력하세요.');
const passwordValidator = z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.');

export const loginValidator = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export const signupValidator = z.object({
  email: emailValidator,
  password: passwordValidator,
  confirmPassword: z.string().min(6, '비밀번호 확인은 최소 6자 이상이어야 합니다.')
    .refine((val, ctx) => {
      if (val !== ctx.parent.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '비밀번호가 일치하지 않습니다.',
        });
        return false;
      }
      return true;
    }),
});