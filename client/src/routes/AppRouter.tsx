import Layout from 'components/Layout';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageLoader from 'routes/PageLoader';

const Game = lazy(() => import('features/game'));
const StartMenu = lazy(() => import('features/startMenu'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <StartMenu /> },
      {
        path: '/game/:id',
        element: <Game />,
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
