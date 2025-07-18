import type { FC } from 'react';

import { Box, Text } from '@mantine/core';
import '@/src/components/TournamentBracket/TournamentBracket.css';

export const PlaceholderCard: FC = () => (
	<Box className='match-card placeholder-card'>
		<div className='line-in'></div>
		<Box className='team'>
			<Text c='dimmed' size='sm'>
				TBD
			</Text>
		</Box>
		<Box className='team'>
			<Text c='dimmed' size='sm'>
				TBD
			</Text>
		</Box>
	</Box>
);
