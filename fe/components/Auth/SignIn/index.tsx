'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Label, TextInput } from 'flowbite-react';
import CustomTextInput from '@/components/shared/Custom/CustomTextInput';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import AuthButton from '@/components/Auth/AuthButton';

const SignInPage = () => {
  const { email, setEmail, password, setPassword, signInWithEmail, loading } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email || !password) {
      setError('모든 필드를 입력해주세요.');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return false;
    }

    if (password.length < 8) {
      setError('비밀번호는 최소 8자 이상이어야 합니다.');
      return false;
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      signInWithEmail();
      router.push('/');
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" value="이메일" />
            <CustomTextInput
              id="email"
              name="email"
              icon={() => <Mail size={18} className="text-gray-400" />}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <Label htmlFor="password" value="비밀번호" />
            <CustomTextInput
              id="password"
              name="password"
              icon={() => <Lock size={18} className="text-gray-400" />}
              rightIcon={() => (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none pointer-events-auto"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <TextInput
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <Label htmlFor="remember-me" value="로그인 상태 유지" />
          </div>

          <div className="text-sm">
            <Link
              href={{ pathname: '/forgot-password' }}
              className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400"
            >
              비밀번호 찾기
            </Link>
          </div>
        </div>

        <div>
          <AuthButton type="submit" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </AuthButton>
        </div>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          계정이 없으신가요?{' '}
          <Link
            href={{ pathname: '/signup' }}
            className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400"
          >
            회원가입
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignInPage;
