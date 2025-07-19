import type { FC } from 'react';

import { Box, Text } from '@mantine/core';

import type { Match } from '@/src/api/match';
import '@/src/components/TournamentBracket/TournamentBracket.css';

type MatchCardProps = {
	match: Partial<Match>;
	onClick?: (match: Partial<Match>) => void;
};

export const MatchCard: FC<MatchCardProps> = ({ match, onClick }) => {
	const isClickable = !!(match.firstTeamId && match.secondTeamId && onClick);

	const getTeamClassName = (teamId?: number | null): string => {
		if (!teamId) {
			return 'team';
		}

		const isWinner =
			match.status === 'COMPLETED' && match.winningTeamId != null && match.winningTeamId === teamId;

		return isWinner ? 'team winner' : 'team';
	};

	return (
		<Box
			className='match-card'
			onClick={isClickable ? () => onClick?.(match) : undefined}
			style={{ cursor: isClickable ? 'pointer' : 'default' }}
		>
			<Box className={getTeamClassName(match.firstTeamId)}>
				<Text className='team-name' size='sm'>
					{match.firstTeamName || 'TBD'}
				</Text>
				<Text className='team-score' fw={700}>
					{match.firstTeamScore ?? ''}
				</Text>
			</Box>
			<Box className={getTeamClassName(match.secondTeamId)}>
				<Text className='team-name' size='sm'>
					{match.secondTeamName || 'TBD'}
				</Text>
				<Text className='team-score' fw={700}>
					{match.secondTeamScore ?? ''}
				</Text>
			</Box>
		</Box>
	);
};
