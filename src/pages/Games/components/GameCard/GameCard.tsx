import { Button, Group, Title } from '@mantine/core';
import { IconDeviceGamepad2 } from '@tabler/icons-react';
import { useState, type FC } from 'react';
import { useNavigate } from 'react-router';

import type { Game } from '@/src/api/game';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { EditGameModal } from '@/src/pages/Games/components/EditGameModal';
import { useDeleteGameMutation } from '@/src/pages/Games/components/EditGameModal/editGameModal.utils';
import { vars } from '@/src/theme';

type GameCardProps = {
	game: Game;
	isAdmin?: boolean;
	isDeletable?: boolean;
};

export const GameCard: FC<GameCardProps> = ({ game, isAdmin, isDeletable }) => {
	const navigate = useNavigate();
	const [isEditModalOpen, setEditModalOpen] = useState(false);

	const { mutate, isPending } = useDeleteGameMutation();

	const handleDeleteGame = () => {
		mutate(game.id);
	};

	return (
		<>
			<Group
				style={{
					padding: '24px 16px',
					borderRadius: 4,
					backgroundColor: vars.colors.white,
					border: '1px solid #ced4de',
					justifyContent: 'space-between',
				}}
			>
				<Group gap={16}>
					<IconDeviceGamepad2 size={24} />
					<Title order={3}>{game.name}</Title>
				</Group>
				<Group gap={10}>
					<Button variant='subtle' color='blue'>
						Tournaments
					</Button>
					<Button
						variant='subtle'
						color='green'
						onClick={() =>
							navigate(RoutePaths.LeaderboardByGame.replace(':id', game.id.toString()))
						}
					>
						Leaderboard
					</Button>
					{isAdmin && (
						<>
							<Button variant='subtle' color='blue' onClick={() => setEditModalOpen(true)}>
								Edit
							</Button>
							{isDeletable && (
								<Button variant='subtle' color='red' onClick={handleDeleteGame} loading={isPending}>
									Delete
								</Button>
							)}
						</>
					)}
				</Group>
			</Group>
			<EditGameModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} game={game} />
		</>
	);
};
