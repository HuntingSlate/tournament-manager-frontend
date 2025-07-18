import {
	Flex,
	Group,
	Input,
	InputWrapper,
	Loader,
	Title,
	Text,
	Pagination,
	Stack,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState, type FC } from 'react';

import { useProfileSearchQuery } from '@/src/api/mutations/userMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { PlayerCard } from '@/src/pages/Players/components/PlayerCard';

const PAGE_SIZE = 7;

export const Players: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [debouncedValue] = useDebouncedValue(searchValue, 300);
	const { data, isLoading } = useProfileSearchQuery(debouncedValue);

	const [activePage, setActivePage] = useState(1);

	useEffect(() => {
		setActivePage(1);
	}, [debouncedValue]);

	const paginatedData = data
		? data.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE)
		: [];

	const totalPages = data ? Math.ceil(data.length / PAGE_SIZE) : 0;

	return (
		<PageLayout>
			<Group w='100%' justify='space-between'>
				<Title order={2} style={{ alignSelf: 'flex-start' }}>
					Players
				</Title>
				<InputWrapper label='Search Player' size='sm'>
					<Input
						placeholder='Type player name...'
						value={searchValue}
						onChange={(event) => setSearchValue(event.currentTarget.value)}
					/>
				</InputWrapper>
			</Group>
			<Flex direction='column' justify='space-between' h='100%' style={{ flexGrow: 1 }}>
				<Stack gap='md'>
					{isLoading ? (
						<Flex justify='center' align='center' h='100%'>
							<Loader color='blue' />
						</Flex>
					) : paginatedData.length > 0 ? (
						paginatedData.map((profile) => <PlayerCard key={profile.id} player={profile} />)
					) : (
						<Text c='dimmed' ta='center' mt='xl'>
							No players found.
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
	);
};
