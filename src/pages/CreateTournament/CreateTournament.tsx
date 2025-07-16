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
	Button,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useState, type FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import z from 'zod';

import { PageLayout } from '@/src/components/layouts/PageLayout';
import { TournamentMap } from '@/src/components/TournamentMap';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useCreateTournamentMutation } from '@/src/pages/CreateTournament/createTournament.utils';
import { useGamesQuery } from '@/src/pages/Games/games.utils';
import { useAutoGeocode } from '@/src/utils/Geocode';

const createTournamentSchema = z.object({
	name: z
		.string()
		.min(1, 'Tournament name is required')
		.max(255, 'Tournament name must not exceed 255 characters'),
	description: z.string().max(500, 'Description must not exceed 500 characters').optional(),
	startDate: z
		.string()
		.min(1, 'Start date is required')
		.regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' }),
	endDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' })
		.or(z.literal('')),
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
	status: z.enum(['PENDING', 'ACTIVE', 'COMPLETED', 'CANCELED']),
});

type CreateTournamentFormValues = z.infer<typeof createTournamentSchema>;

export const CreateTournament: FC = () => {
	const navigate = useNavigate();
	const [mapPosition, setMapPosition] = useState<[number, number]>([52.237049, 21.017532]);
	const { data: games, isLoading: isGamesLoading } = useGamesQuery();
	const { mutate, isPending } = useCreateTournamentMutation();

	const methods = useForm({
		resolver: zodResolver(createTournamentSchema),
		defaultValues: {
			name: '',
			description: '',
			startDate: '',
			endDate: '',
			postalCode: '',
			city: '',
			gameId: '',
			street: '',
			buildingNumber: '',
			maxTeams: 4,
			status: 'PENDING',
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

	const selectGamesData =
		games?.map((game) => ({
			value: game.id.toString(),
			label: game.name,
		})) || [];

	const statusData = [
		{ value: 'PENDING', label: 'Pending' },
		{ value: 'ACTIVE', label: 'Active' },
		{ value: 'COMPLETED', label: 'Completed' },
		{ value: 'CANCELED', label: 'Canceled' },
	];

	const onSubmit = (data: CreateTournamentFormValues) => {
		const submissionData = {
			...data,
			gameId: Number(data.gameId),
			buildingNumber: Number(data.buildingNumber),
		};
		mutate(submissionData as any);
	};

	return (
		<PageLayout>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Stack style={{ gap: 16 }}>
						<Group style={{ gap: 8 }}>
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
						<Group style={{ flex: 1, alignItems: 'flex-start' }}>
							<Stack style={{ flex: 1, gap: 16, alignContent: 'flex-start' }}>
								<InputWrapper
									size='sm'
									label='Tournament Name'
									error={methods.formState.errors.name?.message}
								>
									<Input
										size='md'
										placeholder='Type tournament name'
										{...methods.register('name')}
									/>
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
								<Group style={{ flexWrap: 'nowrap' }}>
									<InputWrapper
										size='sm'
										label='Start Date'
										error={methods.formState.errors.startDate?.message}
										style={{ width: '100%' }}
									>
										<Input
											size='md'
											placeholder='Type start date (YYYY-MM-DD)'
											{...methods.register('startDate')}
										/>
									</InputWrapper>
									<InputWrapper
										size='sm'
										label='End Date'
										error={methods.formState.errors.endDate?.message}
										style={{ width: '100%' }}
									>
										<Input
											size='md'
											placeholder='Type end date (YYYY-MM-DD)'
											{...methods.register('endDate')}
										/>
									</InputWrapper>
								</Group>
								<Group style={{ flexWrap: 'nowrap' }}>
									<Controller
										name='gameId'
										control={methods.control}
										render={({ field, fieldState }) => (
											<Select
												label='Game'
												placeholder='Select a game'
												data={selectGamesData}
												disabled={isGamesLoading}
												style={{ width: '50%' }}
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
									<Controller
										name='status'
										control={methods.control}
										render={({ field, fieldState }) => (
											<Select
												label='Tournament Status'
												size='md'
												style={{ width: '25%' }}
												labelProps={{
													style: { fontSize: '0.875rem', fontWeight: 500 },
												}}
												placeholder='Select a status'
												data={statusData}
												error={fieldState.error?.message}
												{...field}
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
							<Stack style={{ flex: 1 }}>
								<Group style={{ flexWrap: 'nowrap' }}>
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
								<Group style={{ flexWrap: 'nowrap' }}>
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
								<TournamentMap position={mapPosition} />
							</Stack>
						</Group>
					</Stack>
					<Group style={{ justifyContent: 'flex-end', marginTop: 16 }}>
						<Button color='red' onClick={() => methods.reset()}>
							Reset
						</Button>
						<Button type='submit' color='green' loading={isPending}>
							Submit
						</Button>
					</Group>
				</form>
			</FormProvider>
		</PageLayout>
	);
};
