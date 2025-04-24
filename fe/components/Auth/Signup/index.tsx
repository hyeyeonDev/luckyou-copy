'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Label } from 'flowbite-react';
import { Eye, EyeOff, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import AuthButton from '@/components/Auth/AuthButton';
import CustomTextInput from '@/components/shared/Custom/CustomTextInput';

const SignupPage = () => {
  const { email, setEmail, password, setPassword, signUpNewUser, loading } = useAuth();
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
  });

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  const checkPasswordStrength = (password: string) => {
    // 비밀번호 강도 체크 로직
    let score = 0;
    let message = '';

    if (password.length < 8) {
      message = '비밀번호는 8자 이상이어야 합니다';
    } else {
      score += 1;
      if (/[A-Z]/.test(password)) score += 1;
      if (/[0-9]/.test(password)) score += 1;
      if (/[^A-Za-z0-9]/.test(password)) score += 1;

      if (score === 1) message = '약함';
      else if (score === 2) message = '보통';
      else if (score === 3) message = '강함';
      else if (score === 4) message = '매우 강함';
    }

    setPasswordStrength({ score, message });
  };

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }

    return true;
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      signUpNewUser();
      router.push('/signin');
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm flex items-center">
          <AlertCircle size={16} className="mr-2" />
          {error}
        </div>
      )}

      <form className="mt-6 space-y-6" onSubmit={handleSignup}>
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
              placeholder="8자 이상의 비밀번호"
              autoComplete="new-password"
            />

            {password && (
              <div className="mt-1">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        passwordStrength.score === 1
                          ? 'bg-red-500'
                          : passwordStrength.score === 2
                          ? 'bg-yellow-500'
                          : passwordStrength.score === 3
                          ? 'bg-green-500'
                          : passwordStrength.score === 4
                          ? 'bg-green-600'
                          : ''
                      }`}
                      style={{ width: `${passwordStrength.score * 25}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{passwordStrength.message}</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" value="비밀번호 확인" />
            <CustomTextInput
              id="confirmPassword"
              name="confirmPassword"
              icon={() => <Lock size={18} className="text-gray-400" />}
              rightIcon={() => (
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="focus:outline-none pointer-events-auto"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
              autoComplete="new-password"
            />

            {password && confirmPassword && (
              <div className="mt-1 flex items-center">
                {password === confirmPassword ? (
                  <>
                    <CheckCircle size={14} className="text-green-500" />
                    <span className="ml-1 text-xs text-green-500">비밀번호가 일치합니다</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={14} className="text-red-500" />
                    <span className="ml-1 text-xs text-red-500">비밀번호가 일치하지 않습니다</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <AuthButton type="submit" disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </AuthButton>
        </div>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          이미 계정이 있으신가요?{' '}
          <Link
            href={{ pathname: '/signin' }}
            className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400"
          >
            로그인
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignupPage;
