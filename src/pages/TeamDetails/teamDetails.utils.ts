import { useQuery } from '@tanstack/react-query';

import { getTeamById } from '@/src/api/team';

export const useGetTeamDetailsQuery = (id: string) => {
	return useQuery({
		queryKey: ['teamDetails', id],
		queryFn: () => getTeamById(Number(id)),
	});
};
