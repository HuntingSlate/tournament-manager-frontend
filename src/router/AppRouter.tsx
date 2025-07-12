import React from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
} from 'react-router';

import { MainLayout } from '@/src/components/layouts/MainLayout';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { Games } from '@/src/pages/Games';
import { Home } from '@/src/pages/Home';
import { Leaderboard } from '@/src/pages/Leaderboard';
import { Login } from '@/src/pages/Login';
import { Profile } from '@/src/pages/Profile';
import { Register } from '@/src/pages/Register';
import { Teams } from '@/src/pages/Teams';
import { Tournaments } from '@/src/pages/Tournaments';
import { useAuthStore } from '@/src/store/authStore';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

	if (!isAuthenticated) {
		return <Navigate to={RoutePaths.Login} />;
	}

	return children;
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				element={
					<ProtectedRoute>
						<MainLayout />
					</ProtectedRoute>
				}
			>
				<Route path={RoutePaths.Home} element={<Home />} />
				<Route path={RoutePaths.Games} element={<Games />} />
				<Route path={RoutePaths.Teams} element={<Teams />} />
				<Route path={RoutePaths.Tournaments} element={<Tournaments />} />
				<Route path={RoutePaths.Leaderboard} element={<Leaderboard />} />
				<Route path={RoutePaths.Profile} element={<Profile />} />
			</Route>

			<Route element={<MainLayout withHeader={false} />}>
				<Route path={RoutePaths.Login} element={<Login />} />
				<Route path={RoutePaths.Register} element={<Register />} />
			</Route>
		</>
	)
);

export const AppRouter = () => {
	return <RouterProvider router={router} />;
};
