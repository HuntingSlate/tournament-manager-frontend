import {
	ActionIcon,
	Button,
	Flex,
	Group,
	Input,
	InputWrapper,
	Loader,
	Stack,
	Textarea,
	Title,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { PageLayout } from '@/src/components/layouts/PageLayout';
import { TournamentMap } from '@/src/components/TournamentMap';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useTournamentDetailsQuery } from '@/src/pages/TournamentDetails/tournamentDetails.utils';
import { useAuthStore } from '@/src/store/authStore';

export const TournamentDetails: FC = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
	const isAdmin = useAuthStore((state) => state.isAdmin());
	const userId = useAuthStore((state) => state.user?.id);
	const { data: tournament, isLoading } = useTournamentDetailsQuery(id!);
	const isOrganizer = userId === tournament?.organizerId;
	const { register, reset } = useForm();
	const [mapPosition, setMapPosition] = useState<[number, number] | null>();

	const hasFullAddress =
		tournament?.city && tournament.postalCode && tournament.street && tournament.buildingNumber;

	useEffect(() => {
		if (tournament) {
			reset({
				name: tournament.name ?? '',
				gameName: tournament.gameName ?? '',
				description: tournament.description ?? '',
				startDate: tournament.startDate ?? '',
				endDate: tournament.endDate ?? '',
				status: tournament.status ?? '',
				maxTeams: tournament.maxTeams?.toString() ?? '',
				lanTournament: tournament.lanTournament ? 'Yes' : 'No',
				city: tournament.city ?? '',
				postalCode: tournament.postalCode ?? '',
				street: tournament.street ?? '',
				buildingNumber: tournament.buildingNumber?.toString() ?? '',
			});

			if (hasFullAddress && tournament.latitude && tournament.longitude) {
				setMapPosition([tournament.latitude, tournament.longitude]);
			}
		}
	}, [tournament, reset, hasFullAddress]);

	if (isLoading) {
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
			<Group style={{ justifyContent: 'space-between' }}>
				<Group>
					<ActionIcon variant='transparent' onClick={() => navigate(RoutePaths.Home)}>
						<IconChevronLeft size={24} />
					</ActionIcon>
					<Title order={2}>Tournament Details</Title>
				</Group>
				{((isAuthenticated && isOrganizer) || isAdmin) && (
					<Button
						variant='default'
						onClick={() => navigate(RoutePaths.EditTournament.replace(':id', id!))}
					>
						Edit Tournament
					</Button>
				)}
			</Group>
			<Group grow align='flex-start'>
				<Stack style={{ flex: 1, gap: 16 }}>
					<InputWrapper size='sm' label='Tournament Name' style={{ width: '100%' }}>
						<Input size='md' {...register('name')} readOnly variant='unstyled' />
					</InputWrapper>
					<InputWrapper size='sm' label='Description' style={{ width: '100%' }}>
						<Textarea size='md' {...register('description')} readOnly variant='unstyled' />
					</InputWrapper>
					<Group style={{ flexWrap: 'nowrap' }}>
						<InputWrapper size='sm' label='Start Date' style={{ width: '100%' }}>
							<Input size='md' {...register('startDate')} readOnly variant='unstyled' />
						</InputWrapper>
						<InputWrapper size='sm' label='End Date' style={{ width: '100%' }}>
							<Input size='md' {...register('endDate')} readOnly variant='unstyled' />
						</InputWrapper>
					</Group>
					<Group style={{ flexWrap: 'nowrap' }}>
						<Input.Wrapper size='sm' label='Game' style={{ width: '50%' }}>
							<Input size='md' {...register('gameName')} readOnly variant='unstyled' />
						</Input.Wrapper>
						<Input.Wrapper size='sm' label='Status' style={{ width: '25%' }}>
							<Input size='md' {...register('status')} readOnly variant='unstyled' />
						</Input.Wrapper>
						<Input.Wrapper size='sm' label='Max Teams' style={{ width: '25%' }}>
							<Input size='md' {...register('maxTeams')} readOnly variant='unstyled' />
						</Input.Wrapper>
					</Group>
				</Stack>
				{hasFullAddress && (
					<Stack style={{ flex: 1, gap: 16 }}>
						<Group style={{ flexWrap: 'nowrap' }}>
							<InputWrapper size='sm' label='Street' style={{ width: '70%' }}>
								<Input size='md' {...register('street')} readOnly variant='unstyled' />
							</InputWrapper>
							<InputWrapper size='sm' label='Building Number' style={{ width: '30%' }}>
								<Input size='md' {...register('buildingNumber')} readOnly variant='unstyled' />
							</InputWrapper>
						</Group>
						<Group style={{ flexWrap: 'nowrap' }}>
							<InputWrapper size='sm' label='City' style={{ width: '100%' }}>
								<Input size='md' {...register('city')} readOnly variant='unstyled' />
							</InputWrapper>
							<InputWrapper size='sm' label='Postal Code' style={{ width: '100%' }}>
								<Input size='md' {...register('postalCode')} readOnly variant='unstyled' />
							</InputWrapper>
						</Group>
						{mapPosition && <TournamentMap position={mapPosition} />}
					</Stack>
				)}
			</Group>
		</PageLayout>
	);
};
