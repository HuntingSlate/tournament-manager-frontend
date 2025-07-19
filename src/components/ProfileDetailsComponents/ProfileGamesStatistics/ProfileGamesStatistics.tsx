import { Stack, Group, Text, Select, Loader, Flex } from '@mantine/core';
import { useState, type FC } from 'react';

import { useGetGamesQuery } from '@/src/api/mutations/gameMutations';
import { useGetLoggedPlayerStatisticsFromGameQuery } from '@/src/api/mutations/leaderboardMutations';
import { ProfileGameStatistic } from '@/src/components/ProfileDetailsComponents/ProfileGamesStatistics/ProfileGameStatistic';
import { vars } from '@/src/theme';

export const ProfileGamesStatistics: FC = () => {
	const [selectedGame, setSelectedGame] = useState<string | null>(null);
	const { data: gamesData, isLoading: gamesLoading } = useGetGamesQuery();
	const { data: playerGameData, isLoading: playerGameLoading } =
		useGetLoggedPlayerStatisticsFromGameQuery(Number(selectedGame));

	const selectData =
		gamesData?.map((game) => ({
			value: game.id.toString(),
			label: game.name,
		})) || [];

	return (
		<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
			<Group justify='space-between'>
				<Text size='lg' fw={500} style={{ alignSelf: 'flex-start' }}>
					Game Statistics
				</Text>
				<Select
					label='Select Game'
					data={selectData}
					onChange={setSelectedGame}
					leftSection={gamesLoading ? <Loader size={16} /> : null}
				/>
			</Group>
			{playerGameLoading ? (
				<Flex justify='center' align='center'>
					<Loader size='md' />
				</Flex>
			) : !playerGameData ? (
				<Text size='sm' color={vars.colors.gray[6]}>
					No statistics available for the selected game.
				</Text>
			) : (
				<ProfileGameStatistic statistics={playerGameData!} />
			)}
		</Stack>
	);
};
