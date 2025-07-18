import { Button, Flex, Group, Loader, Stack, Title, Text, Pagination } from '@mantine/core';
import { useEffect, useState, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useGetTournamentsQuery } from '@/src/api/mutations/tournamentMutations';
import type { TournamentSearchParams } from '@/src/api/tournament';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { TournamentCard } from '@/src/pages/Tournaments/components/TournamentCard';
import { TournamentFilters } from '@/src/pages/Tournaments/components/TournamentFilters';
import { useAuthStore } from '@/src/store/authStore';

const PAGE_SIZE = 5;

export const Tournaments: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

	const queryParams = new URLSearchParams(location.search);
	const initialGameName = queryParams.get('gameName');

	const [filters, setFilters] = useState<TournamentSearchParams>(() => {
		if (initialGameName) {
			return { gameName: initialGameName };
		}
		return {};
	});

	const { data, isLoading } = useGetTournamentsQuery(filters);
	const [activePage, setActivePage] = useState(1);

	const stableFilters = JSON.stringify(filters);
	useEffect(() => {
		setActivePage(1);
	}, [stableFilters]);

	const paginatedData = data
		? data.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE)
		: [];

	const totalPages = data ? Math.ceil(data.length / PAGE_SIZE) : 0;

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
			<TournamentFilters onFilterChange={setFilters} initialGameName={initialGameName} />
			<Flex direction='column' justify='space-between' h='100%' style={{ flexGrow: 1 }}>
				<Stack gap='md'>
					{isLoading ? (
						<Flex style={{ justifyContent: 'center', alignItems: 'center', height: '200px' }}>
							<Loader color='blue' />
						</Flex>
					) : (
						<Stack mt='lg'>
							{paginatedData.length > 0 ? (
								paginatedData.map((tournament) => (
									<TournamentCard key={tournament.id} tournament={tournament} />
								))
							) : (
								<Text c='dimmed' ta='center' mt='xl'>
									No tournaments found matching your criteria.
								</Text>
							)}
						</Stack>
					)}
				</Stack>
				{totalPages > 1 && (
					<Pagination
						total={totalPages}
						value={activePage}
						onChange={setActivePage}
						mt='xl'
						style={{ alignSelf: 'center' }}
					/>
				)}
			</Flex>
		</PageLayout>
	);
};
