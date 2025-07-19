import { ActionIcon, Flex, Group, Loader, Title } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useGetTournamentMatchesQuery } from '@/src/api/mutations/matchMutations';
import { useGetTournamentByIdQuery } from '@/src/api/mutations/tournamentMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { TournamentBracket } from '@/src/components/TournamentBracket';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useAuthStore } from '@/src/store/authStore';
import { vars } from '@/src/theme';

export const MatchDetails: FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const userId = useAuthStore((state) => state.user?.id);
	const isAdmin = useAuthStore((state) => state.isAdmin());
	const { data, isLoading } = useGetTournamentMatchesQuery(Number(id));
	const { data: tournamentData } = useGetTournamentByIdQuery(id!);
	const canEditMatch = userId === tournamentData?.organizerId || isAdmin;

	if (isLoading) {
		return (
			<PageLayout>
				<Flex justify='center' align='center' h='100%'>
					<Loader color='blue' />
				</Flex>
			</PageLayout>
		);
	}

	return (
		<PageLayout>
			<Group wrap='nowrap' justify='space-between'>
				<Group gap={8}>
					<ActionIcon
						variant='transparent'
						onClick={() => navigate(RoutePaths.TournamentDetails.replace(':id', id!))}
					>
						<IconChevronLeft size={24} />
					</ActionIcon>
					<Title order={2}>
						{data && data[0]?.tournamentName ? `${data[0].tournamentName} - Ladder` : 'Ladder'}
					</Title>
				</Group>
			</Group>
			<Flex p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
				<TournamentBracket matches={data || []} canEditMatch={canEditMatch} />
			</Flex>
		</PageLayout>
	);
};
