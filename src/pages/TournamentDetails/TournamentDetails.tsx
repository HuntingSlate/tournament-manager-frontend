import { ActionIcon, Button, Flex, Group, Loader, Title } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useState, type FC } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
	useGetTournamentApplicationsQuery,
	useGetTournamentByIdQuery,
} from '@/src/api/mutations/tournamentMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { JoinTournamentModal } from '@/src/pages/TournamentDetails/components/JoinTournamentModal';
import { TournamentApplications } from '@/src/pages/TournamentDetails/components/TournamentApplications';
import { TournamentInformation } from '@/src/pages/TournamentDetails/components/TournamentInformation';
import { TournamentLocation } from '@/src/pages/TournamentDetails/components/TournamentLocation';
import { TournamentTeams } from '@/src/pages/TournamentDetails/components/TournamentTeams';
import { useAuthStore } from '@/src/store/authStore';

export const TournamentDetails: FC = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
	const isAdmin = useAuthStore((state) => state.isAdmin());
	const userId = useAuthStore((state) => state.user?.id);
	const { data, isLoading } = useGetTournamentByIdQuery(id!);
	const isOrganizer = userId === data?.organizerId;
	const { data: tournamentApplications, isLoading: isApplicationsLoading } =
		useGetTournamentApplicationsQuery(id!, isOrganizer || isAdmin);
	const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

	const canJoinTeam =
		isAuthenticated &&
		!isOrganizer &&
		data?.status === 'PENDING' &&
		data?.participatingTeams.length < data?.maxTeams;

	const canEditTournament =
		(isAuthenticated && isOrganizer) ||
		(isAdmin && (data?.status === 'CANCELED' || data?.status === 'PENDING'));

	const canGoToMatches = data?.status === 'ACTIVE' || data?.status === 'COMPLETED';

	return (
		<>
			<PageLayout>
				<Group style={{ justifyContent: 'space-between' }}>
					<Group>
						<ActionIcon variant='transparent' onClick={() => navigate(RoutePaths.Home)}>
							<IconChevronLeft size={24} />
						</ActionIcon>
						<Title order={2}>Tournament Details</Title>
					</Group>
					<Group>
						{canJoinTeam && (
							<Button variant='subtle' onClick={() => setIsJoinModalOpen(true)}>
								Join
							</Button>
						)}
						{canGoToMatches && (
							<Button variant='subtle' onClick={() => navigate(RoutePaths.Matches)}>
								Ladder
							</Button>
						)}
						{canEditTournament && (
							<Button
								variant='default'
								onClick={() => navigate(RoutePaths.EditTournament.replace(':id', id!))}
							>
								Edit Tournament
							</Button>
						)}
					</Group>
				</Group>
				{isLoading || isApplicationsLoading ? (
					<Flex justify='center' align='center' h='100%'>
						<Loader color='blue' />
					</Flex>
				) : (
					<>
						<TournamentInformation tournament={data} />
						<TournamentLocation tournament={data} />
						<TournamentTeams tournament={data?.participatingTeams} maxTeams={data?.maxTeams} />
						{isAuthenticated && isAdmin && isOrganizer && (
							<TournamentApplications applications={tournamentApplications} />
						)}
					</>
				)}
			</PageLayout>
			<JoinTournamentModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
		</>
	);
};
