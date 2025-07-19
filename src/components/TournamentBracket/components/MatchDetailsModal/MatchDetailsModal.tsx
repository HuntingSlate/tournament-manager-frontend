import type { FC } from 'react';

import { Flex, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { IconCalendar, IconClock, IconCrown, IconUsers } from '@tabler/icons-react';
import dayjs from 'dayjs';

import type { Match } from '@/src/api/match';
import { PlayerStatCard } from '@/src/components/TournamentBracket/components/MatchDetailsModal/components/PlayerStatCard';
import { vars } from '@/src/theme';

type MatchDetailsModalProps = {
	isOpen: boolean;
	onClose: () => void;
	match: Match;
};

export const MatchDetailsModal: FC<MatchDetailsModalProps> = ({ isOpen, onClose, match }) => {
	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			centered
			title='Match Details'
			size='900px'
			styles={{
				title: {
					fontWeight: 700,
					fontSize: '1.25rem',
				},
			}}
		>
			<Stack w='100%' gap={16}>
				<Group p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' wrap='nowrap' w='100%'>
					<Group wrap='nowrap' w='100%' gap={8}>
						{match.winningTeamId === match.firstTeamId ? (
							<Flex p={12} bg={vars.colors.yellow[1]} bdrs='50%'>
								<IconCrown size={24} color={vars.colors.yellow[4]} />
							</Flex>
						) : (
							<Flex p={12} bg={vars.colors.blue[1]} bdrs='50%'>
								<IconUsers size={24} />
							</Flex>
						)}
						<Text style={{ textWrap: 'nowrap' }} size='lg' fw={500}>
							{match.firstTeamName}
						</Text>
					</Group>
					<Title w='100%' style={{ textWrap: 'nowrap', textAlign: 'center' }} order={1} fw={700}>
						{match.firstTeamScore} : {match.secondTeamScore}
					</Title>
					<Group wrap='nowrap' w='100%' justify='flex-end' gap={8}>
						<Text style={{ textWrap: 'nowrap' }} size='lg' fw={500}>
							{match.secondTeamName}
						</Text>
						{match.winningTeamId === match.secondTeamId ? (
							<Flex p={12} bg={vars.colors.yellow[1]} bdrs='50%'>
								<IconCrown size={24} color={vars.colors.yellow[4]} />
							</Flex>
						) : (
							<Flex p={12} bg={vars.colors.red[1]} bdrs='50%'>
								<IconUsers size={24} />
							</Flex>
						)}
					</Group>
				</Group>
				<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' w='100%'>
					<Group gap={8}>
						<IconClock size={18} />
						<Text size='md' fw={500}>
							Match Details
						</Text>
					</Group>
					<Group gap={8} flex={1}>
						<Stack flex={1}>
							<Group gap={8}>
								<IconCalendar size={18} color={vars.colors.gray[6]} />
								<Stack gap={0}>
									<Text size='sm' color={vars.colors.gray[6]}>
										Start Date
									</Text>
									<Text size='md'>{dayjs(match.startDatetime).format('DD MMMM YYYY HH:mm')}</Text>
								</Stack>
							</Group>
						</Stack>
						<Stack flex={1}>
							<Group gap={8}>
								<IconCalendar size={18} color={vars.colors.gray[6]} />
								<Stack gap={0}>
									<Text size='sm' color={vars.colors.gray[6]}>
										End Date
									</Text>
									<Text size='md'>{dayjs(match.endDatetime).format('DD MMMM YYYY HH:mm')}</Text>
								</Stack>
							</Group>
						</Stack>
					</Group>
				</Stack>
				<Group wrap='nowrap'>
					<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' w='100%'>
						<Group gap={8}>
							<Text size='xl' fw={500}>
								{match.firstTeamName}
							</Text>
						</Group>
						<Stack gap={6}>
							{match.firstTeamMatchStatistics.map((stat) => (
								<PlayerStatCard key={stat.id} player={stat} bg={vars.colors.blue[0]} />
							))}
						</Stack>
					</Stack>
					<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' w='100%'>
						<Group gap={8}>
							<Text size='xl' fw={500}>
								{match.secondTeamName}
							</Text>
						</Group>
						<Stack gap={6}>
							{match.secondTeamMatchStatistics.map((stat) => (
								<PlayerStatCard key={stat.id} player={stat} bg={vars.colors.red[0]} />
							))}
						</Stack>
					</Stack>
				</Group>
			</Stack>
		</Modal>
	);
};
