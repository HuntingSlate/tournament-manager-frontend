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
import { CreateTournament } from '@/src/pages/CreateTournament';
import { EditTournament } from '@/src/pages/EditTournament';
import { Games } from '@/src/pages/Games';
import { Leaderboard } from '@/src/pages/Leaderboard';
import { Login } from '@/src/pages/Login';
import { Players } from '@/src/pages/Players/Players';
import { Profile } from '@/src/pages/Profile';
import { ProfileDetails } from '@/src/pages/ProfileDetails';
import { ProfileEdit } from '@/src/pages/ProfileEdit';
import { Register } from '@/src/pages/Register';
import { TeamDetails } from '@/src/pages/TeamDetails';
import { TeamEdit } from '@/src/pages/TeamEdit';
import { Teams } from '@/src/pages/Teams';
import { TournamentDetails } from '@/src/pages/TournamentDetails';
import { TournamentLadder } from '@/src/pages/TournamentLadder';
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
			<Route element={<MainLayout />}>
				<Route path={RoutePaths.Home} element={<Tournaments />} />
				<Route path={RoutePaths.Games} element={<Games />} />

				<Route path={RoutePaths.TournamentDetails} element={<TournamentDetails />} />

				<Route path={RoutePaths.Teams} element={<Teams />} />
				<Route path={RoutePaths.TeamDetails} element={<TeamDetails />} />

				<Route path={RoutePaths.Leaderboard} element={<Leaderboard />} />
				<Route path={RoutePaths.LeaderboardByGame} element={<Leaderboard />} />

				<Route path={RoutePaths.ProfileDetails} element={<ProfileDetails />} />

				<Route path={RoutePaths.Players} element={<Players />} />

				<Route path={RoutePaths.TournamentLadder} element={<TournamentLadder />} />
			</Route>

			<Route element={<MainLayout withHeader={false} />}>
				<Route path={RoutePaths.Login} element={<Login />} />
				<Route path={RoutePaths.Register} element={<Register />} />
			</Route>

			<Route
				element={
					<ProtectedRoute>
						<MainLayout />
					</ProtectedRoute>
				}
			>
				<Route path={RoutePaths.Profile} element={<Profile />} />
				<Route path={RoutePaths.ProfileEdit} element={<ProfileEdit />} />
				<Route path={RoutePaths.CreateTournament} element={<CreateTournament />} />
				<Route path={RoutePaths.EditTournament} element={<EditTournament />} />
				<Route path={RoutePaths.EditTeam} element={<TeamEdit />} />
			</Route>
		</>
	)
);

export const AppRouter = () => {
	return <RouterProvider router={router} />;
};
