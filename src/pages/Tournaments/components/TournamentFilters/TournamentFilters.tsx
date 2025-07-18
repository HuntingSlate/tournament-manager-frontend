import type { FC } from 'react';

import { Group, TextInput, Select, ActionIcon } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDebouncedValue } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { useGetGamesQuery } from '@/src/api/mutations/gameMutations';
import type { TournamentSearchParams } from '@/src/api/tournament';

type TournamentFiltersProps = {
	onFilterChange: (filters: TournamentSearchParams) => void;
	initialGameName?: string | null;
};

export const TournamentFilters: FC<TournamentFiltersProps> = ({
	onFilterChange,
	initialGameName,
}) => {
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [gameName, setGameName] = useState<string | null>(initialGameName || null);
	const [status, setStatus] = useState<'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | null>(
		null
	);
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

	const { data: games } = useGetGamesQuery('');

	useEffect(() => {
		setGameName(initialGameName || null);
	}, [initialGameName]);

	const currentFilters = { name, location, gameName, status, dateRange };
	const [debouncedFilters] = useDebouncedValue(currentFilters, 500);

	useEffect(() => {
		const { dateRange, gameName, status, ...rest } = debouncedFilters;
		const searchParams: TournamentSearchParams = {
			...rest,
			gameName: gameName || undefined,
			status: status || undefined,
			startDate: dateRange?.[0] ? dateRange[0].toISOString().split('T')[0] : undefined,
			endDate: dateRange?.[1] ? dateRange[1].toISOString().split('T')[0] : undefined,
		};

		Object.keys(searchParams).forEach((key) => {
			const typedKey = key as keyof TournamentSearchParams;
			if (!searchParams[typedKey]) {
				delete searchParams[typedKey];
			}
		});

		onFilterChange(searchParams);
	}, [debouncedFilters, onFilterChange]);

	const gameSelectData = games?.map((game) => ({ value: game.name, label: game.name })) || [];
	const statusSelectData = [
		{ value: 'PENDING', label: 'Pending' },
		{ value: 'ACTIVE', label: 'Active' },
		{ value: 'COMPLETED', label: 'Completed' },
		{ value: 'CANCELLED', label: 'Cancelled' },
	];

	const handleReset = () => {
		setName('');
		setLocation('');
		setGameName(null);
		setStatus(null);
		setDateRange([null, null]);
	};

	return (
		<form>
			<Group w='100%' wrap='nowrap' align='center'>
				<TextInput
					w='100%'
					label='Tournament Name'
					placeholder='Enter name...'
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
				/>
				<TextInput
					label='Location (city)'
					w='100%'
					placeholder='Enter city...'
					value={location}
					onChange={(e) => setLocation(e.currentTarget.value)}
				/>
				<Select
					label='Game'
					w='100%'
					placeholder='Select game'
					data={gameSelectData}
					clearable
					value={gameName}
					onChange={setGameName}
				/>
				<Select
					label='Status'
					w='100%'
					placeholder='Select status'
					data={statusSelectData}
					clearable
					value={status}
					onChange={(value) => setStatus(value as typeof status)}
				/>
				<DatePickerInput
					type='range'
					w='100%'
					label='Date Range'
					placeholder='Select dates'
					clearable
					allowSingleDateInRange
					value={dateRange}
					onChange={(dates) => {
						const [start, end] = dates;
						const startDate = start ? new Date(start) : null;
						const endDate = end ? new Date(end) : null;
						setDateRange([startDate, endDate]);
					}}
				/>
				<ActionIcon
					variant='light'
					color='red'
					size='input-sm'
					onClick={handleReset}
					style={{ alignSelf: 'flex-end' }}
				>
					<IconX size={16} />
				</ActionIcon>
			</Group>
		</form>
	);
};
