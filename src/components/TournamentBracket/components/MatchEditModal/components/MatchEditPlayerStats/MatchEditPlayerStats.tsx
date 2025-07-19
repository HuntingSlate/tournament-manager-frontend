import { Group, Stack, Text } from '@mantine/core';
import { type FC } from 'react';

import type { Match } from '@/src/api/match';
import { MatchEditPlayerStat } from '@/src/components/TournamentBracket/components/MatchEditModal/components/MatchEditPlayerStats/components/MatchEditPlayerStat';
import { vars } from '@/src/theme';

type MatchEditPlayerStatsProps = {
	matchId?: number;
	firstTeamName?: string;
	secondTeamName?: string;
	firstTeamStats?: Match['firstTeamMatchStatistics'];
	secondTeamStats?: Match['secondTeamMatchStatistics'];
};

export const MatchEditPlayerStats: FC<MatchEditPlayerStatsProps> = ({
	matchId,
	firstTeamName,
	firstTeamStats,
	secondTeamName,
	secondTeamStats,
}) => {
	return (
		<Group wrap='nowrap' w='100%' mt={16}>
			<Stack p={24} bdrs={4} bd='1px solid #ced4de' w='100%'>
				<Text size='lg' fw={500}>
					{firstTeamName}
				</Text>
				<Stack gap={6}>
					{firstTeamStats?.map((stat) => (
						<MatchEditPlayerStat
							key={stat.id}
							matchId={matchId!}
							stat={stat}
							bg={vars.colors.blue[0]}
						/>
					))}
				</Stack>
			</Stack>
			<Stack p={24} bdrs={4} bd='1px solid #ced4de' w='100%'>
				<Text size='lg' fw={500}>
					{secondTeamName}
				</Text>
				<Stack gap={6}>
					{secondTeamStats?.map((stat) => (
						<MatchEditPlayerStat
							key={stat.id}
							matchId={matchId!}
							stat={stat}
							bg={vars.colors.red[0]}
						/>
					))}
				</Stack>
			</Stack>
		</Group>
	);
};
