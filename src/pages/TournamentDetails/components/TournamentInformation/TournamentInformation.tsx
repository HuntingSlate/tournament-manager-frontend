import type { FC } from 'react';

import { Group, Input, InputWrapper, Stack, Text, Textarea } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

import type { Tournament } from '@/src/api/tournament';
import { vars } from '@/src/theme';

type TournamentInformationProps = {
	tournament?: Tournament;
};

export const TournamentInformation: FC<TournamentInformationProps> = ({ tournament }) => {
	const dateRangeValue: [Date | null, Date | null] = tournament
		? [new Date(tournament.startDate), new Date(tournament.endDate)]
		: [null, null];

	return (
		<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
			<Text size='lg' fw={500}>
				Information
			</Text>
			<Stack>
				<InputWrapper label='Name' size='sm' w='100%'>
					<Input size='md' readOnly value={tournament?.name} />
				</InputWrapper>
				<InputWrapper label='Description' size='sm' w='100%'>
					<Textarea size='md' readOnly value={tournament?.description} />
				</InputWrapper>
				<InputWrapper label='Date Range' size='sm' w='100%'>
					<DatePickerInput
						type='range'
						value={dateRangeValue}
						readOnly
						size='md'
						valueFormat='YYYY-MM-DD'
					/>
				</InputWrapper>
				<Group w='100%' wrap='nowrap'>
					<InputWrapper label='Game' size='sm' w='51.5%'>
						<Input size='md' readOnly value={tournament?.gameName} />
					</InputWrapper>
					<InputWrapper label='Status' size='sm' w='25%'>
						<Input size='md' readOnly value={tournament?.status} />
					</InputWrapper>
					<InputWrapper label='Max Teams' size='sm' w='25%'>
						<Input size='md' readOnly value={tournament?.maxTeams} />
					</InputWrapper>
				</Group>
			</Stack>
		</Stack>
	);
};
