import { Group, Loader, Select, Stack, Title, Text } from '@mantine/core';
import { useEffect, useState, type FC } from 'react';
import { useParams } from 'react-router';

import { PageLayout } from '@/src/components/layouts/PageLayout';
import { useGamesQuery } from '@/src/pages/Games/games.utils';
import { LeaderboardPlayerCard } from '@/src/pages/Leaderboard/components/LeaderboardPlayerCard';
import { usePlayerRankingQuery } from '@/src/pages/Leaderboard/leaderboard.utils';

export const Leaderboard: FC = () => {
	const { id } = useParams<{ id: string }>();

	const [selectedGame, setSelectedGame] = useState<string | null>(null);
	const { data: games, isLoading: isGamesLoading } = useGamesQuery();

	const { data: rankings, isLoading: isRankingsLoading } = usePlayerRankingQuery(
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
			<Group style={{ justifyContent: 'space-between' }}></Group>
			{isRankingsLoading ? (
				<Group style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
					<Loader color='blue' />
				</Group>
			) : (
				<Stack>
					{rankings && rankings.length > 0 ? (
						rankings.map((player) => (
							<LeaderboardPlayerCard key={player.id} playerRanking={player} />
						))
					) : (
						<Text c='dimmed' ta='center' mt='xl'>
							No ranking data available for this game.
						</Text>
					)}
				</Stack>
			)}
		</PageLayout>
	);
};
