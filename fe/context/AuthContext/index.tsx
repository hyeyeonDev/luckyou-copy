'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Provider, Session, User } from '@supabase/supabase-js';
import { setAuthToken } from '@/utils/axios';
import supabase from '@/utils/supabase/client';

type AuthContextType = {
  signInWithEmail: () => void;
  signUpNewUser: () => void;
  signOut: () => void;
  user: User | null;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  error: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();

  // 현재 로그인 상태 확인 함수
  const fetchSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    setUser(data.session?.user ?? null);
  };

  // login check: 로그인 확인 후 페이지 이동 처리
  useEffect(() => {
    fetchSession();
    // 정규식: /[dynamic]/result/*
    const isSharePage = /^\/[^\/]+\/result\/.+/;

    // 로그인 상태 변경 감지 (로그인, 로그아웃, 세션 만료)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state changed:', event);
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.access_token) {
        setAuthToken(session.access_token);
        // router.push('/');
      } else {
        setAuthToken(undefined); // 토큰이 없을 경우 헤더에서 제거
        localStorage.clear();
        if (!isSharePage.test(pathname)) router.push('/signin');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function signUpNewUser() {
    setError('');
    if (!email || !password) return;
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    });
    setLoading(false);

    if (error) {
      console.error('signUpNewUser Error:', error);
      setError('회원가입 실패');
    }
    return error;
  }

  async function signInWithEmail() {
    setError('');
    if (!email || !password) return;
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      console.error('SignInWithEmail Error:', error);
      setError('로그인 실패');
    } else {
      await fetchSession();
    }
  }

  async function signInWithSocial(provider: Provider) {
    if (!supabase) return; // supabase가 준비되었을 때만 실행

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) {
      console.error('SignInWithSocial Error:', error);
      setError('로그인 실패');
    } else {
      await fetchSession();
    }
  }

  async function signOut() {
    if (!supabase) return;

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('SignOut Error:', error);
    } else {
      await fetchSession();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signInWithEmail,
        signUpNewUser,
        signOut,
        user,
        email,
        setEmail,
        password,
        setPassword,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
