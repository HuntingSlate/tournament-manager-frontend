import type { DefaultMantineColor, StyleProp } from '@mantine/core';

import { zodResolver } from '@hookform/resolvers/zod';
import { ActionIcon, Group, Stack, Text, TextInput } from '@mantine/core';
import {
	IconUser,
	IconSword,
	IconTarget,
	IconShield,
	IconCheck,
	IconX,
	IconPencil,
} from '@tabler/icons-react';
import { useEffect, useState, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import z from 'zod';

import type { MatchStatistics } from '@/src/api/match';
import { useUpdateMatchPlayerStatisticsMutation } from '@/src/api/mutations/matchMutations';
import { vars } from '@/src/theme';

const playerStatisticsSchema = z.object({
	kills: z.number().min(0),
	deaths: z.number().min(0),
	assists: z.number().min(0),
});

type PlayerStatisticsFormValues = z.infer<typeof playerStatisticsSchema>;

type MatchEditPlayerStatProps = {
	matchId: number;
	stat: MatchStatistics;
	bg: StyleProp<DefaultMantineColor>;
};

export const MatchEditPlayerStat: FC<MatchEditPlayerStatProps> = ({ stat, bg, matchId }) => {
	const [isEdit, setIsEdit] = useState(false);
	const { id } = useParams<{ id: string }>();
	const { mutate, isPending } = useUpdateMatchPlayerStatisticsMutation();

	const methods = useForm<PlayerStatisticsFormValues>({
		resolver: zodResolver(playerStatisticsSchema),
		defaultValues: {
			kills: stat.kills,
			deaths: stat.deaths,
			assists: stat.assists,
		},
	});

	useEffect(() => {
		methods.reset({
			kills: stat.kills,
			deaths: stat.deaths,
			assists: stat.assists,
		});
	}, [stat, methods]);

	const handleCancel = () => {
		methods.reset();
		setIsEdit(false);
	};

	const handleSubmit = (data: PlayerStatisticsFormValues) => {
		mutate(
			{
				id: matchId,
				statisticId: stat.id,
				statistics: { playerId: stat.playerId, ...data },
				tournamentId: Number(id!),
			},
			{
				onSuccess: () => {
					setIsEdit(false);
				},
			}
		);
	};

	if (isEdit) {
		return (
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(handleSubmit)}>
					<Group bg={bg} p={12} bdrs={4} gap={4} justify='space-between' wrap='nowrap' h={65}>
						<Group gap={10} wrap='nowrap'>
							<TextInput
								type='number'
								size='xs'
								w={60}
								leftSection={<IconSword size={14} color={vars.colors.green[8]} />}
								{...methods.register('kills', { valueAsNumber: true })}
							/>
							<TextInput
								type='number'
								size='xs'
								w={60}
								leftSection={<IconTarget size={14} color={vars.colors.red[8]} />}
								{...methods.register('deaths', { valueAsNumber: true })}
							/>
							<TextInput
								type='number'
								size='xs'
								w={60}
								leftSection={<IconShield size={14} color={vars.colors.blue[8]} />}
								{...methods.register('assists', { valueAsNumber: true })}
							/>
						</Group>
						<Group gap={6}>
							<ActionIcon variant='outline' color='green' type='submit' loading={isPending}>
								<IconCheck size={16} />
							</ActionIcon>
							<ActionIcon variant='outline' color='blue' onClick={handleCancel}>
								<IconX size={16} />
							</ActionIcon>
						</Group>
					</Group>
				</form>
			</FormProvider>
		);
	}

	return (
		<Group bg={bg} p={12} bdrs={4} gap={4} justify='space-between' h={65}>
			<Stack gap={4}>
				<Group gap={6}>
					<IconUser size={16} />
					<Text size='sm' fw={500}>
						{stat.playerNickname}
					</Text>
				</Group>
				<Group gap={36}>
					<Group gap={4}>
						<IconSword size={14} color={vars.colors.green[8]} />
						<Text size='xs' color={vars.colors.green[8]}>
							{stat.kills}
						</Text>
					</Group>
					<Group gap={4}>
						<IconTarget size={14} color={vars.colors.red[8]} />
						<Text size='xs' w='10px' color={vars.colors.red[8]}>
							{stat.deaths}
						</Text>
					</Group>
					<Group gap={4}>
						<IconShield size={14} color={vars.colors.blue[8]} />
						<Text size='xs' color={vars.colors.blue[8]}>
							{stat.assists}
						</Text>
					</Group>
				</Group>
			</Stack>
			<ActionIcon variant='outline' onClick={() => setIsEdit(true)}>
				<IconPencil size={16} />
			</ActionIcon>
		</Group>
	);
};
