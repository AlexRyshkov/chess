import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import React, {lazy, Suspense} from 'react';
import PageLoader from "features/routes/PageLoader";

const Game = lazy(() => import('features/game'));
const StartMenu = lazy(() => import('features/startMenu'));

const router = createBrowserRouter([
    {
        path: '/game/:id',
        element: <Game />,
    },
    {
        path: '/',
        element: <StartMenu />,
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
