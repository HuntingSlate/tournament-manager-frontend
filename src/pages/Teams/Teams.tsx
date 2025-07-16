import { Button, Group, Input, InputWrapper, Stack, Title, Loader, Flex } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useState, type FC } from 'react';

import { PageLayout } from '@/src/components/layouts/PageLayout';
import { CreateTeamModal } from '@/src/pages/Teams/components/CreateTeamModal';
import { TeamCard } from '@/src/pages/Teams/components/TeamCard';
import { useSearchTeamsQuery } from '@/src/pages/Teams/teams.utils';
import { useAuthStore } from '@/src/store/authStore';

export const Teams: FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
	const userId = useAuthStore((state) => state.user?.id);
	const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
	const [filters, setFilters] = useState({ name: '', playerName: '' });
	const [debouncedFilters] = useDebouncedValue(filters, 500);
	const { data: searchedTeams, isLoading: isSearchLoading } = useSearchTeamsQuery(debouncedFilters);

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
				<Stack style={{ height: '100%' }}>
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
					{isSearchLoading ? (
						<Flex style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
							<Loader color='blue' />
						</Flex>
					) : (
						<Stack gap={16}>
							{searchedTeams?.map((team) => (
								<TeamCard
									key={team.id}
									team={team}
									isPartOf={
										userId === team.teamMembers.find((member) => member.userId === userId)?.userId
									}
								/>
							))}
						</Stack>
					)}
				</Stack>
			</PageLayout>
			<CreateTeamModal
				isOpen={isCreateTeamModalOpen}
				onClose={() => setIsCreateTeamModalOpen(false)}
			/>
		</>
	);
};
