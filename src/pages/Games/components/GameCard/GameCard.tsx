import { ActionIcon, Group, Title } from '@mantine/core';
import {
	IconChartBarPopular,
	IconDeviceGamepad2,
	IconPencil,
	IconTournament,
	IconTrash,
} from '@tabler/icons-react';
import { useState, type FC } from 'react';
import { useNavigate } from 'react-router';

import type { Game } from '@/src/api/game';
import { useDeleteGameMutation } from '@/src/api/mutations/gameMutations';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { EditGameModal } from '@/src/pages/Games/components/EditGameModal';
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
					<ActionIcon
						size='lg'
						variant='subtle'
						color='blue'
						onClick={() => navigate(`${RoutePaths.Home}?gameName=${encodeURIComponent(game.name)}`)}
					>
						<IconTournament size={16} />
					</ActionIcon>
					<ActionIcon
						size='lg'
						variant='subtle'
						color='green'
						onClick={() =>
							navigate(RoutePaths.LeaderboardByGame.replace(':id', game.id.toString()))
						}
					>
						<IconChartBarPopular size={16} />
					</ActionIcon>
					{isAdmin && (
						<Group gap={8}>
							<ActionIcon
								size='lg'
								variant='subtle'
								color='blue'
								onClick={() => setEditModalOpen(true)}
							>
								<IconPencil size={16} />
							</ActionIcon>
							{isDeletable && (
								<ActionIcon
									size='lg'
									variant='subtle'
									color='red'
									onClick={handleDeleteGame}
									loading={isPending}
								>
									<IconTrash size={16} />
								</ActionIcon>
							)}
						</Group>
					)}
				</Group>
			</Group>
			<EditGameModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} game={game} />
		</>
	);
};
