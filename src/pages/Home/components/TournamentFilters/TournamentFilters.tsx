import type { FC } from 'react';

import { Stack, Group, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect } from 'react';
import { useForm, FormProvider, Controller, useWatch } from 'react-hook-form';

import type { TournamentSearchParams } from '@/src/api/tournament';

type TournamentFiltersProps = {
	onFilterChange: (filters: TournamentSearchParams) => void;
};

export const TournamentFilters: FC<TournamentFiltersProps> = ({ onFilterChange }) => {
	const methods = useForm<TournamentSearchParams>({
		defaultValues: {
			name: '',
			location: '',
			startDate: '',
			endDate: '',
			organizerNickname: '',
		},
	});

	const watchedFilters = useWatch({ control: methods.control });
	const [debouncedFilters] = useDebouncedValue(watchedFilters, 500);
	const stableDebouncedFilters = JSON.stringify(debouncedFilters);

	useEffect(() => {
		onFilterChange(debouncedFilters);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stableDebouncedFilters, onFilterChange]);

	return (
		<FormProvider {...methods}>
			<form>
				<Stack style={{ gap: 16 }}>
					<Group>
						<TextInput
							label='Tournament Name'
							placeholder='Enter name...'
							{...methods.register('name')}
						/>
						<TextInput
							label='Location (city)'
							placeholder='Enter city...'
							{...methods.register('location')}
						/>
						<TextInput
							label='Organizer'
							placeholder='Enter organizer nickname...'
							{...methods.register('organizerNickname')}
						/>
						<Controller
							name='startDate'
							control={methods.control}
							render={({ field }) => (
								<TextInput
									label='Start Date'
									placeholder='YYYY-MM-DD'
									{...field}
									onChange={(e) => field.onChange(e.currentTarget.value || '')}
								/>
							)}
						/>
						<Controller
							name='endDate'
							control={methods.control}
							render={({ field }) => (
								<TextInput
									label='End Date'
									placeholder='YYYY-MM-DD'
									{...field}
									onChange={(e) => field.onChange(e.currentTarget.value || '')}
								/>
							)}
						/>
					</Group>
				</Stack>
			</form>
		</FormProvider>
	);
};

/*
<Stack>
					<Title order={4}>Filtry</Title>
					<Group grow align='flex-start'>
						<TextInput
							label='Nazwa turnieju'
							placeholder='Wpisz nazwę...'
							{...methods.register('name')}
						/>
						<TextInput
							label='Lokalizacja (miasto)'
							placeholder='Wpisz miasto...'
							{...methods.register('location')}
						/>
						<TextInput
							label='Organizator'
							placeholder='Wpisz nick organizatora...'
							{...methods.register('organizerNickname')}
						/>
					</Group>
					<Group grow align='flex-start' mt='xs'>
						<Controller
							name='startDate'
							control={methods.control}
							render={({ field }) => (
								<TextInput
									label='Data od'
									placeholder='YYYY-MM-DD'
									{...field}
									onChange={(value) => field.onChange(value?.toISOString().split('T')[0] || '')}
								/>
							)}
						/>
						<Controller
							name='endDate'
							control={methods.control}
							render={({ field }) => (
								<TextInput
									label='Data do'
									placeholder='YYYY-MM-DD'
									{...field}
									onChange={(value) => field.onChange(value?.toISOString().split('T')[0] || '')}
								/>
							)}
						/>
					</Group>
				</Stack>
        */
