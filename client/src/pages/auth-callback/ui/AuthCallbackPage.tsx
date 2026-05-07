import { useGoogleCallback } from '@/features/auth';
import { LoadingSpinner, ErrorMessage } from '@/shared/ui';

export function AuthCallbackPage() {
  const { status } = useGoogleCallback();

  if (status === 'error') {
    return (
      <main aria-label="인증 오류">
        <ErrorMessage message="로그인에 실패했어요. 다시 시도해 주세요." />
      </main>
    );
  }

  return (
    <main aria-label="로그인 처리 중" aria-busy="true">
      <LoadingSpinner />
    </main>
  );
}
