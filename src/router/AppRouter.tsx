import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';

import { MainLayout } from '@/src/components/layouts/MainLayout';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { Games } from '@/src/pages/Games';
import { Login } from '@/src/pages/Login';
import { Profile } from '@/src/pages/Profile';
import { Register } from '@/src/pages/Register';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route element={<MainLayout />}>
				<Route path={RoutePaths.Home} element={<Games />} />
				<Route path={RoutePaths.Profile} element={<Profile />} />
			</Route>
			<Route element={<MainLayout withHeader={false} />}>
				<Route path={RoutePaths.Login} element={<Login />} />
				<Route path={RoutePaths.Register} element={<Register />} />
			</Route>
		</Route>
	)
);

export const AppRouter = () => {
	return <RouterProvider router={router} />;
};
