import { Flex, Group, Input, InputWrapper, Loader, Stack, Title } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useState, type FC } from 'react';

import { useProfileSearchQuery } from '@/src/api/mutations/userMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { PlayerCard } from '@/src/pages/Players/components/PlayerCard';

export const Players: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [debouncedValue] = useDebouncedValue(searchValue, 300);
	const { data, isLoading } = useProfileSearchQuery(debouncedValue);

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
			<Stack h='100%'>
				{isLoading ? (
					<Flex justify='center' align='center' h='100%'>
						<Loader color='blue' />
					</Flex>
				) : (
					data?.map((profile) => <PlayerCard key={profile.id} player={profile} />)
				)}
			</Stack>
		</PageLayout>
	);
};
