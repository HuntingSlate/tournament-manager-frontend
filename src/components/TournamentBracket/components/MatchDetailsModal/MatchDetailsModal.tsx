import type { FC } from 'react';

import { Modal } from '@mantine/core';

import type { Match } from '@/src/api/match';

type MatchDetailsModalProps = {
	isOpen: boolean;
	onClose: () => void;
	match: Match;
};

export const MatchDetailsModal: FC<MatchDetailsModalProps> = ({ isOpen, onClose, match }) => {
	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			centered
			title='Create Game'
			styles={{
				title: {
					fontWeight: 700,
					fontSize: '1.25rem',
				},
			}}
		>
			chuj
		</Modal>
	);
};
