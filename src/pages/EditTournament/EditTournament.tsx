import { zodResolver } from '@hookform/resolvers/zod';
import {
	ActionIcon,
	Button,
	Flex,
	Group,
	Input,
	InputWrapper,
	Loader,
	Select,
	Stack,
	Textarea,
	Title,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useState, type FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import z from 'zod';

import { PageLayout } from '@/src/components/layouts/PageLayout';
import { TournamentMap } from '@/src/components/TournamentMap';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useEditTournamentMutation } from '@/src/pages/EditTournament/editTournament.utils';
import { useGamesQuery } from '@/src/pages/Games/games.utils';
import { useTournamentDetailsQuery } from '@/src/pages/TournamentDetails/tournamentDetails.utils';
import { useAutoGeocode } from '@/src/utils/Geocode';

const editTournamentSchema = z.object({
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
		.optional()
		.or(z.literal('')),
	gameId: z.string().min(1, { message: 'You must select a game.' }),
	city: z.string().min(1, { message: 'City is required' }),
	street: z.string().min(1, { message: 'Street is required' }),
	buildingNumber: z.string().min(1, { message: 'Building number is required' }),
	postalCode: z.string().min(1, { message: 'Postal code is required' }),
	maxTeams: z.coerce
		.number()
		.min(2, { message: 'Minimum 2 teams required' })
		.max(16)
		.refine((n) => n > 0 && (n & (n - 1)) === 0, {
			message: 'The number of teams must be a power of 2',
		}),
	latitude: z.number().optional(),
	longitude: z.number().optional(),
	status: z.enum(['PENDING', 'ACTIVE', 'COMPLETED', 'CANCELED']).optional(),
});

type EditTournamentFormValues = z.infer<typeof editTournamentSchema>;

export const EditTournament: FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { data: games, isLoading: isGamesLoading } = useGamesQuery();
	const { data: tournament, isLoading: isTournamentLoading } = useTournamentDetailsQuery(id!);
	const { mutate, isPending } = useEditTournamentMutation(id!);

	const [mapPosition, setMapPosition] = useState<[number, number] | undefined>();

	const methods = useForm({
		resolver: zodResolver(editTournamentSchema),
	});

	const {
		formState: { isDirty },
		reset,
	} = methods;

	const handleReset = () => {
		reset();
		if (tournament?.latitude && tournament?.longitude) {
			setMapPosition([Number(tournament.latitude), Number(tournament.longitude)]);
		}
	};

	useEffect(() => {
		if (tournament) {
			reset({
				name: tournament.name,
				description: tournament.description,
				startDate: tournament.startDate,
				endDate: tournament.endDate,
				gameId: tournament.gameId.toString(),
				city: tournament.city,
				postalCode: tournament.postalCode,
				street: tournament.street,
				buildingNumber: tournament.buildingNumber?.toString(),
				maxTeams: tournament.maxTeams,
				status: tournament.status,
			});

			if (tournament.latitude && tournament.longitude) {
				setMapPosition([Number(tournament.latitude), Number(tournament.longitude)]);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tournament, methods.reset]);

	const watchedAddress = methods.watch(['city', 'postalCode', 'street', 'buildingNumber']);
	useAutoGeocode(watchedAddress, ({ lat, lon }) => {
		setMapPosition([lat, lon]);
		methods.setValue('latitude', lat, { shouldValidate: true });
		methods.setValue('longitude', lon, { shouldValidate: true });
	});

	const isAddressComplete = watchedAddress.some(Boolean);

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

	const onSubmit = (data: EditTournamentFormValues) => {
		const submissionData = {
			...data,
			gameId: Number(data.gameId),
			buildingNumber: Number(data.buildingNumber),
		};
		mutate(submissionData as any);
	};

	if (isTournamentLoading) {
		return (
			<PageLayout>
				<Flex style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
					<Loader color='blue' />
				</Flex>
			</PageLayout>
		);
	}

	return (
		<PageLayout>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Stack style={{ gap: 16 }}>
						<Group>
							<ActionIcon
								variant='transparent'
								onClick={() => navigate(RoutePaths.TournamentDetails.replace(':id', id!))}
							>
								<IconChevronLeft size={24} />
							</ActionIcon>
							<Title order={2}>Edit Tournament</Title>
						</Group>
						<Group grow align='flex-start'>
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
										style={{ width: '100%' }}
										error={methods.formState.errors.startDate?.message}
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
										style={{ width: '100%' }}
										error={methods.formState.errors.endDate?.message}
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
												error={fieldState.error?.message}
												style={{ width: '50%' }}
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
												label='Status'
												style={{ width: '25%' }}
												size='md'
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
									<InputWrapper size='sm' label='Postal Code' style={{ width: '100%' }}>
										<Input
											size='md'
											placeholder='Type postal code'
											{...methods.register('postalCode')}
										/>
									</InputWrapper>
								</Group>
								{isAddressComplete && mapPosition && <TournamentMap position={mapPosition} />}
							</Stack>
						</Group>
						<Group style={{ justifyContent: 'flex-end', marginTop: 16 }}>
							{isDirty ? (
								<Button color='red' onClick={handleReset}>
									Reset
								</Button>
							) : (
								<Button
									color='blue'
									onClick={() => navigate(RoutePaths.TournamentDetails.replace(':id', id!))}
								>
									Cancel
								</Button>
							)}

							<Button
								type='submit'
								color='green'
								loading={isPending}
								disabled={!isDirty || isPending}
							>
								Submit
							</Button>
						</Group>
					</Stack>
				</form>
			</FormProvider>
		</PageLayout>
	);
};
