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
	Text,
	Stack,
	Textarea,
	Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconChevronLeft } from '@tabler/icons-react';
import { useEffect, type FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import z from 'zod';

import { useGetGamesQuery } from '@/src/api/mutations/gameMutations';
import {
	useEditTournamentMutation,
	useGetTournamentApplicationsQuery,
	useGetTournamentByIdQuery,
} from '@/src/api/mutations/tournamentMutations';
import type { Tournament } from '@/src/api/tournament';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { TournamentMap } from '@/src/components/TournamentMap';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { EditTournamentApplications } from '@/src/pages/EditTournament/components/EditTournamentApplications';
import { EditTournamentTeams } from '@/src/pages/EditTournament/components/EditTournamentTeams';
import { useAuthStore } from '@/src/store/authStore';
import { vars } from '@/src/theme';
import { useAutoGeocode } from '@/src/utils/Geocode';

type DateRangeValue = [Date | null, Date | null];

const editTournamentSchema = z.object({
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
	status: z.enum(['PENDING', 'ACTIVE', 'COMPLETED', 'CANCELED']),
});

type EditTournamentFormValues = Omit<z.infer<typeof editTournamentSchema>, 'dateRange'> & {
	dateRange: DateRangeValue;
};

export const EditTournament: FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const isAdmin = useAuthStore((state) => state.isAdmin());
	const userId = useAuthStore((state) => state.user?.id);
	const { data: games, isLoading: isGamesLoading } = useGetGamesQuery();
	const { data: tournament, isLoading: isTournamentLoading } = useGetTournamentByIdQuery(id!);
	const isOrganizer = userId === tournament?.organizerId;
	const { data: tournamentApplications, isLoading: isApplicationsLoading } =
		useGetTournamentApplicationsQuery(id!, isOrganizer || isAdmin);
	const { mutate, isPending } = useEditTournamentMutation(id!);

	const methods = useForm({
		resolver: zodResolver(editTournamentSchema),
		defaultValues: {
			name: '',
			description: '',
			gameId: '',
			city: '',
			street: '',
			buildingNumber: '',
			postalCode: '',
			maxTeams: 4,
			status: 'PENDING',
			dateRange: [null, null],
		},
	});

	const {
		control,
		formState: { isDirty },
		reset,
		setValue,
		watch,
	} = methods;

	const [latitude, longitude] = watch(['latitude', 'longitude']);

	useEffect(() => {
		if (tournament) {
			reset({
				name: tournament.name,
				description: tournament.description || '',
				gameId: tournament.gameId.toString(),
				city: tournament.city || '',
				postalCode: tournament.postalCode || '',
				street: tournament.street || '',
				buildingNumber: tournament.buildingNumber?.toString() || '',
				maxTeams: tournament.maxTeams,
				status: tournament.status,
				dateRange: [new Date(tournament.startDate), new Date(tournament.endDate)],
				latitude: tournament.latitude ? Number(tournament.latitude) : undefined,
				longitude: tournament.longitude ? Number(tournament.longitude) : undefined,
			});
		}
	}, [tournament, reset]);

	const watchedAddress = watch(['city', 'postalCode', 'street', 'buildingNumber']);
	useAutoGeocode(
		watchedAddress.map((v) => v ?? ''),
		({ lat, lon }) => {
			setValue('latitude', lat, { shouldValidate: true });
			setValue('longitude', lon, { shouldValidate: true });
		}
	);

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
		if (!tournament) {
			return;
		}

		const { dateRange, ...rest } = data;

		const updatedFields = {
			...rest,
			gameId: Number(rest.gameId),
			buildingNumber: Number(rest.buildingNumber),
			startDate: dateRange[0]!.toISOString().split('T')[0],
			endDate: dateRange[1]!.toISOString().split('T')[0],
		};

		const finalSubmissionData: Tournament = {
			...tournament,
			...updatedFields,
		};

		mutate(finalSubmissionData, {
			onSuccess: () => {
				methods.reset();
			},
		});
	};

	if (isTournamentLoading || isApplicationsLoading || isGamesLoading) {
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
					<Group justify='space-between'>
						<Group gap={8}>
							<ActionIcon
								variant='transparent'
								onClick={() => navigate(RoutePaths.TournamentDetails.replace(':id', id!))}
							>
								<IconChevronLeft size={24} />
							</ActionIcon>
							<Title order={2}>Edit Tournament</Title>
						</Group>
						<Group gap={8}>
							<Button
								color='red'
								variant='light'
								onClick={() => methods.reset()}
								disabled={!isDirty || isPending}
							>
								Reset
							</Button>
							<Button
								color='green'
								variant='light'
								type='submit'
								loading={isPending}
								disabled={!isDirty || isPending}
							>
								Submit
							</Button>
						</Group>
					</Group>
					<Stack gap={16} mt={16}>
						<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
							<Text size='lg' fw={500}>
								Information
							</Text>
							<Stack>
								<InputWrapper size='sm' label='Name' error={methods.formState.errors.name?.message}>
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
								<Controller
									name='dateRange'
									control={control}
									render={({ field, fieldState }) => (
										<InputWrapper label='Date Range' error={fieldState.error?.message}>
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
								<Group w='100%' wrap='nowrap'>
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
						</Stack>
						<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
							<Text size='lg' fw={500}>
								Location
							</Text>
							<Stack>
								<Group w='100%' wrap='nowrap'>
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
								<Group w='100%' wrap='nowrap'>
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
								{isAddressComplete && !latitude && !longitude && (
									<Flex justify='center' align='center' h={300} bg='gray.0'>
										<Loader />
									</Flex>
								)}
								{latitude && longitude && <TournamentMap position={[latitude, longitude]} />}
							</Stack>
						</Stack>
						<EditTournamentTeams
							tournamentId={Number(id)}
							tournament={tournament?.participatingTeams}
							maxTeams={tournament?.maxTeams}
						/>
						<EditTournamentApplications applications={tournamentApplications} />
					</Stack>
				</form>
			</FormProvider>
		</PageLayout>
	);
};
