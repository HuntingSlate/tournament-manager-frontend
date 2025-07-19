import { Pill } from '@mantine/core';

import type { MatchStatus } from '@/src/api/match';
import type { Tournament, TournamentApplication } from '@/src/api/tournament';

type StatusType = Tournament['status'] | TournamentApplication['status'] | MatchStatus;

const getStatusStyle = (status: StatusType) => {
	switch (status) {
		case 'ACTIVE':
			return { backgroundColor: '#d4edda', color: '#155724' }; // Green
		case 'CANCELED':
			return { backgroundColor: '#f8d7da', color: '#721c24' }; // Red
		case 'COMPLETED':
			return { backgroundColor: '#d1ecf1', color: '#0c5460' }; // Blue
		case 'PENDING':
			return { backgroundColor: '#fff3cd', color: '#856404' }; // Yellow
		case 'ACCEPTED':
			return { backgroundColor: '#d4edda', color: '#155724' }; // Green
		case 'CANCELLED':
			return { backgroundColor: '#f8d7da', color: '#721c24' }; // Red
		case 'REJECTED':
			return { backgroundColor: '#f8d7da', color: '#721c24' }; // Red
		case 'IN_PROGRESS':
			return { backgroundColor: '#d1ecf1', color: '#0c5460' }; // Blue
		case 'SCHEDULED':
			return { backgroundColor: '#fff3cd', color: '#856404' }; // Yellow
		default:
	}
};

export const StatusIndicator = ({ status }: { status: StatusType }) => {
	return <Pill style={{ width: 'fit-content', ...getStatusStyle(status) }}>{status}</Pill>;
};
