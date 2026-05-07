import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { HomePage } = await import('@/pages/home');
      return { Component: HomePage };
    },
  },
  {
    path: '/auth/callback',
    lazy: async () => {
      const { AuthCallbackPage } = await import('@/pages/auth-callback');
      return { Component: AuthCallbackPage };
    },
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
