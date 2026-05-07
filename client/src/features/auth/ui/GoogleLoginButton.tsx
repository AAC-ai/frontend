const GOOGLE_AUTH_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;

export function GoogleLoginButton() {
  return (
    <a href={GOOGLE_AUTH_URL} role="button" aria-label="Google로 로그인">
      Google 로그인
    </a>
  );
}
