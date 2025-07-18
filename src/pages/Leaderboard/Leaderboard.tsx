import { Group, Loader, Select, Stack, Title, Text, Flex, Pagination } from '@mantine/core';
import { useEffect, useState, type FC } from 'react';
import { useParams } from 'react-router';

import { useGetGamesQuery } from '@/src/api/mutations/gameMutations';
import { useGetPlayerRankingByGameIdQuery } from '@/src/api/mutations/leaderboardMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { LeaderboardPlayerCard } from '@/src/pages/Leaderboard/components/LeaderboardPlayerCard';

const PAGE_SIZE = 6;
export const Leaderboard: FC = () => {
	const { id } = useParams<{ id: string }>();

	const [selectedGame, setSelectedGame] = useState<string | null>(null);
	const [activePage, setActivePage] = useState(1);
	const { data: games, isLoading: isGamesLoading } = useGetGamesQuery();

	const { data: rankings, isLoading: isRankingsLoading } = useGetPlayerRankingByGameIdQuery(
		selectedGame ? Number(selectedGame) : null
	);

	useEffect(() => {
		if (id) {
			setSelectedGame(id);
		} else if (games && games.length > 0) {
			setSelectedGame(games[0].id.toString());
		}
	}, [id, games]);

	const selectData =
		games?.map((game) => ({
			value: game.id.toString(),
			label: game.name,
		})) || [];

	useEffect(() => {
		setActivePage(1);
	}, [selectedGame]);

	const paginatedData = rankings
		? rankings.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE)
		: [];

	const totalPages = rankings ? Math.ceil(rankings.length / PAGE_SIZE) : 0;

	return (
		<PageLayout>
			<Group justify='space-between'>
				<Title order={2} style={{ alignSelf: 'flex-start' }}>
					Leaderboard
				</Title>
				<Select
					size='sm'
					label='Select a game'
					placeholder='Choose...'
					data={selectData}
					value={selectedGame}
					onChange={setSelectedGame}
					disabled={isGamesLoading}
					searchable
				/>
			</Group>
			<Flex direction='column' justify='space-between' h='100%' style={{ flexGrow: 1 }}>
				<Stack gap='md'>
					{isRankingsLoading ? (
						<Flex justify='center' align='center' h='100%'>
							<Loader color='blue' />
						</Flex>
					) : paginatedData.length > 0 ? (
						paginatedData.map((player) => (
							<LeaderboardPlayerCard key={player.id} playerRanking={player} />
						))
					) : (
						<Text c='dimmed' ta='center' mt='xl'>
							No data.
						</Text>
					)}
				</Stack>
			</Flex>
			{totalPages > 1 && (
				<Pagination
					total={totalPages}
					value={activePage}
					onChange={setActivePage}
					mt='xl'
					style={{ alignSelf: 'center' }}
				/>
			)}
		</PageLayout>
	);
};
