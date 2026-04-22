import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { HomePage } = await import('@/pages/home');
      return { Component: HomePage };
    },
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
