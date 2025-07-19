import {
	Button,
	Group,
	Input,
	InputWrapper,
	Stack,
	Title,
	Loader,
	Flex,
	Text,
	Pagination,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState, type FC } from 'react';

import { useSearchTeamsQuery } from '@/src/api/mutations/teamMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { CreateTeamModal } from '@/src/pages/Teams/components/CreateTeamModal';
import { TeamCard } from '@/src/pages/Teams/components/TeamCard';
import { useAuthStore } from '@/src/store/authStore';

const PAGE_SIZE = 5;

export const Teams: FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
	const userId = useAuthStore((state) => state.user?.id);
	const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
	const [filters, setFilters] = useState({ name: '', playerName: '' });
	const [debouncedFilters] = useDebouncedValue(filters, 500);
	const { data, isLoading } = useSearchTeamsQuery(debouncedFilters);
	const [activePage, setActivePage] = useState(1);

	const handleFilterChange = (
		fieldName: 'name' | 'playerName',
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = event.currentTarget?.value ?? '';
		setFilters((current) => ({
			...current,
			[fieldName]: value,
		}));
	};

	useEffect(() => {
		setActivePage(1);
	}, [debouncedFilters]);

	const paginatedData = data
		? data.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE)
		: [];

	const totalPages = data ? Math.ceil(data.length / PAGE_SIZE) : 0;

	return (
		<>
			<PageLayout>
				<Group style={{ justifyContent: 'space-between' }}>
					<Title order={2}>Teams</Title>
					{isAuthenticated && (
						<Button variant='default' onClick={() => setIsCreateTeamModalOpen(true)}>
							Create Team
						</Button>
					)}
				</Group>
				<Group justify='space-between' wrap='nowrap'>
					<InputWrapper label='Search by team name' size='sm' style={{ width: '100%' }}>
						<Input
							placeholder='Type team name...'
							size='md'
							value={filters.name}
							onChange={(event) => handleFilterChange('name', event)}
						/>
					</InputWrapper>
					<InputWrapper label='Search by player name' size='sm' style={{ width: '100%' }}>
						<Input
							placeholder='Type player name...'
							size='md'
							value={filters.playerName}
							onChange={(event) => handleFilterChange('playerName', event)}
						/>
					</InputWrapper>
				</Group>
				<Flex direction='column' justify='space-between' style={{ flexGrow: 1, height: '100%' }}>
					<Stack gap='md'>
						{isLoading ? (
							<Flex style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
								<Loader color='blue' />
							</Flex>
						) : paginatedData.length > 0 ? (
							<Stack gap='md'>
								{paginatedData.map((team) => (
									<TeamCard
										key={team.id}
										team={team}
										isPartOf={
											isAuthenticated && team.teamMembers.some((member) => member.userId === userId)
										}
									/>
								))}
							</Stack>
						) : (
							<Text c='dimmed' ta='center' mt='xl'>
								No teams found.
							</Text>
						)}
					</Stack>
					{totalPages > 1 && (
						<Pagination
							total={totalPages}
							value={activePage}
							onChange={setActivePage}
							mt='xl'
							style={{ alignSelf: 'center' }}
						/>
					)}
				</Flex>
			</PageLayout>
			<CreateTeamModal
				isOpen={isCreateTeamModalOpen}
				onClose={() => setIsCreateTeamModalOpen(false)}
			/>
		</>
	);
};
