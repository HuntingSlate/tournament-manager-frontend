import {
	Button,
	Flex,
	Group,
	Input,
	InputWrapper,
	Loader,
	Pagination,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState, type FC } from 'react';

import { useGetGamesQuery } from '@/src/api/mutations/gameMutations';
import { useGetTournamentsQuery } from '@/src/api/mutations/tournamentMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { AddGameModal } from '@/src/pages/Games/components/AddGameModal';
import { GameCard } from '@/src/pages/Games/components/GameCard';
import { useAuthStore } from '@/src/store/authStore';

const PAGE_SIZE = 7;

export const Games: FC = () => {
	const { data: tournaments, isLoading: isTournamentsLoading } = useGetTournamentsQuery({});
	const isAdmin = useAuthStore((state) => state.isAdmin());

	const [isAddGameModalOpen, setAddGameModalOpen] = useState(false);
	const [searchValue, setSearchValue] = useState<string>('');
	const [debouncedValue] = useDebouncedValue(searchValue, 300);

	const { data, isLoading } = useGetGamesQuery(debouncedValue);

	const [activePage, setActivePage] = useState(1);

	useEffect(() => {
		setActivePage(1);
	}, [debouncedValue]);

	const paginatedData = data
		? data.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE)
		: [];

	const totalPages = data ? Math.ceil(data.length / PAGE_SIZE) : 0;

	return (
		<>
			<PageLayout>
				<Group wrap='nowrap' justify='space-between'>
					<Title order={2} style={{ alignSelf: 'flex-start' }}>
						Games
					</Title>
					<Group gap={8}>
						<InputWrapper label='Search Game' size='sm'>
							<Input
								placeholder='Type game name...'
								value={searchValue}
								onChange={(event) => setSearchValue(event.currentTarget.value)}
							/>
						</InputWrapper>
						{isAdmin && (
							<Button
								variant='default'
								color='blue'
								onClick={() => setAddGameModalOpen(true)}
								style={{ alignSelf: 'flex-end' }}
							>
								Create Game
							</Button>
						)}
					</Group>
				</Group>
				<Flex direction='column' justify='space-between' h='100%' style={{ flexGrow: 1 }}>
					<Stack gap='md'>
						{isLoading || isTournamentsLoading ? (
							<Flex justify='center' align='center' h='100%'>
								<Loader color='blue' />
							</Flex>
						) : paginatedData.length > 0 ? (
							paginatedData.map((game) => {
								const isGameInUse =
									tournaments?.some((tournament) => tournament.gameId === game.id) ?? false;

								return (
									<GameCard key={game.id} game={game} isAdmin={isAdmin} isDeletable={isGameInUse} />
								);
							})
						) : (
							<Text c='dimmed' ta='center' mt='xl'>
								No games found.
							</Text>
						)}
						{totalPages > 1 && (
							<Pagination
								total={totalPages}
								value={activePage}
								onChange={setActivePage}
								mt='xl'
								style={{ alignSelf: 'center' }}
							/>
						)}
					</Stack>
				</Flex>
			</PageLayout>
			<AddGameModal isOpen={isAddGameModalOpen} onClose={() => setAddGameModalOpen(false)} />
		</>
	);
};
