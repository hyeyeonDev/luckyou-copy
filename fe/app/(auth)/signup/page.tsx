import React from 'react';
import SignupPage from '@/components/Auth/Signup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: '회원가입',
};

const SignUp = () => {
  return <SignupPage />;
};

export default SignUp;
