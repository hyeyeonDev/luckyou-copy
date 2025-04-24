import React from 'react';
import LoginPage from '@/components/Auth/SignIn';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: '로그인',
};

const Login = () => {
  return <LoginPage />;
};

export default Login;
