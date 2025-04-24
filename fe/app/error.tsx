'use client';

import DynamicError from '@/components/Error/DynamicError';

export default function ErrorPage({ error }: { error: { statusCode?: number } }) {
  return <DynamicError errorCode={error?.statusCode || 500} />;
}
