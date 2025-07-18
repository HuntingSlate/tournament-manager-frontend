import { useQuery } from '@tanstack/react-query';

import { getTeamTournamentApplications } from '@/src/api/team';

export const useGetTeamTournamentApplicationsQuery = (teamId: string, isOrganizer: boolean) => {
	return useQuery({
		queryKey: ['team-tournament-applications', teamId],
		queryFn: () => getTeamTournamentApplications(Number(teamId)),
		enabled: !!isOrganizer,
	});
};
