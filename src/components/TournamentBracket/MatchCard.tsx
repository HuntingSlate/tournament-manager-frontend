import type { FC } from 'react';

import { Box, Text } from '@mantine/core';

import type { Match } from '@/src/api/match';
import '@/src/components/TournamentBracket/TournamentBracket.css';

type MatchCardProps = {
	match: Match;
	onClick?: (match: Match) => void;
};

export const MatchCard: FC<MatchCardProps> = ({ match, onClick }) => {
	const getTeamClassName = (teamId: number) => {
		if (match.status === 'COMPLETED' && match.winningTeamId === teamId) {
			return 'team winner';
		}
		return 'team';
	};

	return (
		<Box className='match-card' onClick={() => onClick?.(match)}>
			<div className='line-in'></div>
			<Box className={getTeamClassName(match.firstTeamId)}>
				<Text className='team-name' size='sm'>
					{match.firstTeamName}
				</Text>
				<Text className='team-score' fw={700}>
					{match.firstTeamScore}
				</Text>
			</Box>
			<Box className={getTeamClassName(match.secondTeamId)}>
				<Text className='team-name' size='sm'>
					{match.secondTeamName}
				</Text>
				<Text className='team-score' fw={700}>
					{match.secondTeamScore}
				</Text>
			</Box>
		</Box>
	);
};
