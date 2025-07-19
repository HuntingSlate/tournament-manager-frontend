import { zodResolver } from '@hookform/resolvers/zod';
import {
	ActionIcon,
	Group,
	Input,
	InputWrapper,
	Stack,
	Textarea,
	Title,
	Select,
	Text,
	Button,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconChevronLeft } from '@tabler/icons-react';
import { useState, type FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import z from 'zod';

import { useGetGamesQuery } from '@/src/api/mutations/gameMutations';
import { useCreateTournamentMutation } from '@/src/api/mutations/tournamentMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { TournamentMap } from '@/src/components/TournamentMap';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';
import { useAutoGeocode } from '@/src/utils/Geocode';

const createTournamentSchema = z.object({
	name: z
		.string()
		.min(1, 'Tournament name is required')
		.max(255, 'Tournament name must not exceed 255 characters'),
	description: z.string().max(500, 'Description must not exceed 500 characters').optional(),
	dateRange: z
		.tuple([z.coerce.date().nullable(), z.coerce.date().nullable()])
		.refine((val): val is [Date, Date] => !!val && val[0] !== null && val[1] !== null, {
			message: 'Both start and end date are required.',
		}),
	gameId: z.string().min(1, { message: 'You must select a game.' }),
	city: z.string().optional(),
	street: z.string().optional(),
	buildingNumber: z.string().optional(),
	postalCode: z.string().optional(),
	maxTeams: z.coerce
		.number()
		.min(2, { message: 'Minimum 2 teams required' })
		.max(16)
		.refine((n) => n > 0 && (n & (n - 1)) === 0, {
			message: 'The number of teams must be a power of 2',
		}),
	latitude: z.number().optional(),
	longitude: z.number().optional(),
});

type CreateTournamentFormValues = z.infer<typeof createTournamentSchema>;

export const CreateTournament: FC = () => {
	const navigate = useNavigate();
	const [mapPosition, setMapPosition] = useState<[number, number]>([52.237049, 21.017532]);
	const { data: games, isLoading: isGamesLoading } = useGetGamesQuery();
	const { mutate, isPending } = useCreateTournamentMutation();

	const methods = useForm({
		resolver: zodResolver(createTournamentSchema),
		defaultValues: {
			name: '',
			description: '',
			dateRange: [null, null],
			postalCode: '',
			city: '',
			gameId: '',
			street: '',
			buildingNumber: '',
			maxTeams: 4,
		},
	});

	const watchedAddress = methods.watch(['city', 'postalCode', 'street', 'buildingNumber']);
	useAutoGeocode(
		watchedAddress.map((value) => value ?? ''),
		({ lat, lon }) => {
			setMapPosition([lat, lon]);
			methods.setValue('latitude', lat, { shouldValidate: true });
			methods.setValue('longitude', lon, { shouldValidate: true });
		}
	);

	const isAddressComplete = watchedAddress.every((value) => value && value.trim() !== '');

	const selectGamesData =
		games?.map((game) => ({
			value: game.id.toString(),
			label: game.name,
		})) || [];

	const onSubmit = (data: CreateTournamentFormValues) => {
		const submissionData = {
			...data,
			gameId: Number(data.gameId),
			buildingNumber: Number(data.buildingNumber),
			status: 'PENDING',
		};
		mutate(submissionData as any);
	};

	return (
		<PageLayout>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Stack gap={16}>
						<Group justify='space-between'>
							<Group>
								<ActionIcon
									variant='transparent'
									onClick={() => {
										navigate(RoutePaths.Home);
										methods.reset();
									}}
								>
									<IconChevronLeft size={24} />
								</ActionIcon>
								<Title order={2}>Tournament Creation</Title>
							</Group>
							<Group style={{ justifyContent: 'flex-end', marginTop: 16 }}>
								<Button color='red' onClick={() => methods.reset()}>
									Reset
								</Button>
								<Button type='submit' color='green' loading={isPending}>
									Submit
								</Button>
							</Group>
						</Group>
						<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
							<Text size='lg' fw={500}>
								Information
							</Text>
							<InputWrapper
								size='sm'
								label='Tournament Name'
								error={methods.formState.errors.name?.message}
							>
								<Input size='md' placeholder='Type tournament name' {...methods.register('name')} />
							</InputWrapper>
							<InputWrapper
								size='sm'
								label='Description'
								error={methods.formState.errors.description?.message}
							>
								<Textarea
									size='md'
									placeholder='Type description'
									{...methods.register('description')}
								/>
							</InputWrapper>
							<Group wrap='nowrap' w='100%'>
								<Controller
									name='dateRange'
									control={methods.control}
									render={({ field, fieldState }) => (
										<InputWrapper label='Date Range' error={fieldState.error?.message} w='50%'>
											<DatePickerInput
												type='range'
												placeholder='Select date range'
												valueFormat='YYYY-MM-DD'
												value={field.value as [Date | null, Date | null]}
												onChange={(value) => field.onChange(value)}
												size='md'
											/>
										</InputWrapper>
									)}
								/>
								<Controller
									name='gameId'
									control={methods.control}
									render={({ field, fieldState }) => (
										<Select
											label='Game'
											placeholder='Select a game'
											data={selectGamesData}
											disabled={isGamesLoading}
											style={{ width: '25%' }}
											error={fieldState.error?.message}
											searchable
											{...field}
											labelProps={{
												style: { fontSize: '0.875rem', fontWeight: 500 },
											}}
											size='md'
										/>
									)}
								/>
								<InputWrapper
									size='sm'
									label='Max Teams'
									error={methods.formState.errors.maxTeams?.message}
									style={{ width: '25%' }}
								>
									<Input
										type='number'
										size='md'
										placeholder='Type max teams'
										{...methods.register('maxTeams')}
									/>
								</InputWrapper>
							</Group>
						</Stack>
						<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
							<Text size='lg' fw={500}>
								Location
							</Text>
							<Group wrap='nowrap'>
								<InputWrapper
									size='sm'
									label='Street'
									error={methods.formState.errors.street?.message}
									style={{ width: '70%' }}
								>
									<Input size='md' placeholder='Type street' {...methods.register('street')} />
								</InputWrapper>
								<InputWrapper
									size='sm'
									label='Building Number'
									error={methods.formState.errors.buildingNumber?.message}
									style={{ width: '30%' }}
								>
									<Input
										size='md'
										type='number'
										placeholder='Type building number'
										{...methods.register('buildingNumber')}
									/>
								</InputWrapper>
							</Group>
							<Group wrap='nowrap'>
								<InputWrapper
									size='sm'
									label='City'
									error={methods.formState.errors.city?.message}
									style={{ width: '100%' }}
								>
									<Input size='md' placeholder='Type city' {...methods.register('city')} />
								</InputWrapper>
								<InputWrapper
									size='sm'
									label='Postal Code'
									error={methods.formState.errors.postalCode?.message}
									style={{ width: '100%' }}
								>
									<Input
										size='md'
										placeholder='Type postal code'
										{...methods.register('postalCode')}
									/>
								</InputWrapper>
							</Group>
							{isAddressComplete && <TournamentMap position={mapPosition} />}
						</Stack>
					</Stack>
				</form>
			</FormProvider>
		</PageLayout>
	);
};
