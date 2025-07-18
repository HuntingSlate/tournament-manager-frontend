import {
	ActionIcon,
	Button,
	Flex,
	Group,
	Input,
	InputWrapper,
	Loader,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router';

import { useGetTeamTournamentApplicationsQuery } from '@/src/api/mutations/teamMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { TeamLinks } from '@/src/pages/TeamDetails/components/TeamLinks';
import { TeamMember } from '@/src/pages/TeamDetails/components/TeamMember';
import { TeamTournament } from '@/src/pages/TeamDetails/components/TeamTournament/TeamTournament';
import { TeamTournamentApplications } from '@/src/pages/TeamDetails/components/TeamTournamentApplications';
import { useGetTeamDetailsQuery } from '@/src/pages/TeamDetails/teamDetails.utils';
import { useAuthStore } from '@/src/store/authStore';
import { vars } from '@/src/theme';

export const TeamDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { data, isLoading } = useGetTeamDetailsQuery(id!);

	const teamMembersCount = data?.teamMembers?.length ?? 0;
	const teamLinksCount = data?.teamLinks?.length || 0;
	const teamTournamentsCount = data?.tournaments?.length || 0;

	const userId = useAuthStore((state) => state.user?.id);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
	const isAdmin = useAuthStore((state) => state.isAdmin());
	const isTeamLeader = userId === data?.leaderId;

	const { data: tournamentApplications, isLoading: isTournamentApplicationsLoading } =
		useGetTeamTournamentApplicationsQuery(id!, isTeamLeader || isAdmin);

	return (
		<PageLayout>
			<Group pb={16} w='100%' justify='space-between'>
				<Group gap={8}>
					<ActionIcon color='blue' variant='transparent' onClick={() => navigate(RoutePaths.Teams)}>
						<IconChevronLeft size={24} />
					</ActionIcon>
					<Title order={2}>Team Details</Title>
				</Group>
				{((isAuthenticated && isTeamLeader) || isAdmin) && (
					<Button variant='light' onClick={() => navigate(RoutePaths.EditTeam.replace(':id', id!))}>
						Edit Team
					</Button>
				)}
			</Group>
			{isLoading && isTournamentApplicationsLoading ? (
				<Flex justify='center' align='center' h='100%'>
					<Loader color='blue' />
				</Flex>
			) : (
				<Stack gap={16}>
					<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
						<Text size='lg' fw={500}>
							Team Information
						</Text>
						<Group wrap='nowrap'>
							<InputWrapper label='Team Name' size='sm' w='100%'>
								<Input readOnly value={data?.name} />
							</InputWrapper>
							<InputWrapper label='Game Name' size='sm' w='100%'>
								<Input readOnly value={data?.gameName} />
							</InputWrapper>
						</Group>
					</Stack>
					<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
						<Text size='lg' fw={500}>
							Team Members ({teamMembersCount}/5)
						</Text>
						{data?.teamMembers?.map((member) => (
							<TeamMember
								key={member.userId}
								userNickname={member.userNickname}
								isLeader={userId === member.userId || member.userId === data?.leaderId}
								userId={member.userId}
								startDate={member.startDate}
							/>
						))}
					</Stack>
					<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
						<Text size='lg' fw={500}>
							Team Links ({teamLinksCount})
						</Text>
						{data?.teamLinks?.map((link) => (
							<TeamLinks key={link.id} type={link.type} url={link.url} />
						))}
					</Stack>
					<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
						<Text size='lg' fw={500}>
							Team Tournaments ({teamTournamentsCount})
						</Text>
						{data?.tournaments?.map((tournament) => (
							<TeamTournament
								key={tournament.tournamentId}
								tournamentId={tournament.tournamentId}
								status={tournament.status}
								tournamentName={tournament.tournamentName}
							/>
						))}
					</Stack>
					{(isTeamLeader || isAdmin) && (
						<TeamTournamentApplications applications={tournamentApplications} />
					)}
				</Stack>
			)}
		</PageLayout>
	);
};
