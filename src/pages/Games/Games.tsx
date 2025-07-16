import { Button, Flex, Group, Loader, Stack, Title } from '@mantine/core';
import { useState, type FC } from 'react';

import { PageLayout } from '@/src/components/layouts/PageLayout';
import { AddGameModal } from '@/src/pages/Games/components/AddGameModal';
import { GameCard } from '@/src/pages/Games/components/GameCard';
import { useGamesQuery } from '@/src/pages/Games/games.utils';
import { useTournamentsQuery } from '@/src/pages/Home/home.utils';
import { useAuthStore } from '@/src/store/authStore';

export const Games: FC = () => {
	const { data, isLoading } = useGamesQuery();
	const { data: tournaments, isLoading: isTournamentsLoading } = useTournamentsQuery({});
	const isAdmin = useAuthStore((state) => state.isAdmin());
	const [isAddGameModalOpen, setAddGameModalOpen] = useState(false);

	return (
		<>
			<PageLayout>
				<Group wrap='nowrap' justify='space-between'>
					<Title order={2}>Games</Title>
					{isAdmin && (
						<Button variant='default' color='blue' onClick={() => setAddGameModalOpen(true)}>
							Create Game
						</Button>
					)}
				</Group>
				{isLoading || isTournamentsLoading ? (
					<Flex style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
						<Loader color='blue' />
					</Flex>
				) : (
					<Stack gap={16}>
						{data?.map((game) => {
							const isGameInUse =
								tournaments?.some((tournament) => tournament.gameId === game.id) ?? false;
							return (
								<GameCard key={game.id} game={game} isAdmin={isAdmin} isDeletable={!isGameInUse} />
							);
						})}
					</Stack>
				)}
			</PageLayout>
			<AddGameModal isOpen={isAddGameModalOpen} onClose={() => setAddGameModalOpen(false)} />
		</>
	);
};
