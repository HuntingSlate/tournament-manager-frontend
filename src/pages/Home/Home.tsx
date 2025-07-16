import { Button, Flex, Group, Loader, Stack, Title } from '@mantine/core';
import { useState, type FC } from 'react';
import { useNavigate } from 'react-router';

import type { TournamentSearchParams } from '@/src/api/tournament';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { TournamentCard } from '@/src/pages/Home/components/TournamentCard';
import { TournamentFilters } from '@/src/pages/Home/components/TournamentFilters';
import { useTournamentsQuery } from '@/src/pages/Home/home.utils';
import { useAuthStore } from '@/src/store/authStore';

export const Home: FC = () => {
	const navigate = useNavigate();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

	const [filters, setFilters] = useState<TournamentSearchParams>({
		name: '',
		location: '',
		startDate: '',
		endDate: '',
		organizerNickname: '',
	});

	const { data, isLoading } = useTournamentsQuery(filters);

	return (
		<PageLayout>
			<Group style={{ justifyContent: 'space-between' }}>
				<Title order={2}>Tournaments</Title>
				{isAuthenticated && (
					<Button variant='default' onClick={() => navigate(RoutePaths.CreateTournament)}>
						Create Tournament
					</Button>
				)}
			</Group>
			<Stack style={{ height: '100%' }}>
				<TournamentFilters onFilterChange={setFilters} />
				{isLoading ? (
					<Flex style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
						<Loader color='blue' />
					</Flex>
				) : (
					<Stack>
						{data?.map((tournament) => (
							<TournamentCard key={tournament.id} tournament={tournament} />
						))}
					</Stack>
				)}
			</Stack>
		</PageLayout>
	);
};
