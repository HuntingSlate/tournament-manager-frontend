import { zodResolver } from '@hookform/resolvers/zod';
import {
	Group,
	ActionIcon,
	Title,
	Stack,
	Input,
	InputWrapper,
	Text,
	Select,
	Button,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useState, type FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import z from 'zod';

import type { TeamLink as TeamLinkType } from '@/src/api/team';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useGamesQuery } from '@/src/pages/Games/games.utils';
import { useGetTeamDetailsQuery } from '@/src/pages/TeamDetails/teamDetails.utils';
import { AddLinkModal } from '@/src/pages/TeamEdit/components/AddLinkModal';
import { AddMemberModal } from '@/src/pages/TeamEdit/components/AddMemberModal';
import { EditLinkModal } from '@/src/pages/TeamEdit/components/EditLinkModal';
import { TeamLink } from '@/src/pages/TeamEdit/components/TeamLink';
import { TeamMember } from '@/src/pages/TeamEdit/components/TeamMember';
import { useEditTeamMutation } from '@/src/pages/TeamEdit/teamEdit.utils';
import { useAuthStore } from '@/src/store/authStore';
import { vars } from '@/src/theme';

const editTeamSchema = z.object({
	name: z
		.string()
		.min(1, 'Team name is required')
		.max(255, 'Team name must not exceed 255 characters'),
	gameId: z.string().min(1, { message: 'You must select a game.' }),
});

type EditTeamFormValues = z.infer<typeof editTeamSchema>;

export const TeamEdit: FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const userId = useAuthStore((state) => state.user?.id);

	const { data: teamDetails } = useGetTeamDetailsQuery(id!);
	const { data: gamesData } = useGamesQuery();
	const { mutate: updateTeamMutation, isPending: isUpdating } = useEditTeamMutation();

	const [editingLink, setEditingLink] = useState<TeamLinkType | null>(null);
	const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
	const [isAddTeamLinkModalOpen, setIsAddTeamLinkModalOpen] = useState(false);
	const [isEditTeamLinkModalOpen, setIsEditTeamLinkModalOpen] = useState(false);

	const methods = useForm<EditTeamFormValues>({
		resolver: zodResolver(editTeamSchema),
		defaultValues: {
			name: '',
			gameId: '',
		},
	});

	const {
		formState: { isDirty },
		reset,
	} = methods;

	useEffect(() => {
		if (teamDetails) {
			reset({
				name: teamDetails.name,
				gameId: teamDetails.gameId.toString(),
			});
		}
	}, [teamDetails, reset]);

	const selectGamesData =
		gamesData?.map((game) => ({
			value: game.id.toString(),
			label: game.name,
		})) || [];

	const onSubmit = (formData: EditTeamFormValues) => {
		updateTeamMutation(
			{
				teamId: Number(id),
				payload: {
					name: formData.name,
					gameId: Number(formData.gameId),
					teamLinks: teamDetails?.teamLinks || [],
				},
			},
			{
				onSuccess: () => {
					navigate(RoutePaths.TeamDetails.replace(':id', id!));
				},
			}
		);
	};

	const isTeamLocked =
		teamDetails?.tournaments?.some((t) => t.status === 'ACTIVE' || t.status === 'COMPLETED') ??
		false;

	const handleEditLinkClick = (link: TeamLinkType) => {
		setEditingLink(link);
		setIsEditTeamLinkModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setIsEditTeamLinkModalOpen(false);
		setEditingLink(null);
	};

	return (
		<>
			<PageLayout>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						<Stack gap={16}>
							<Group justify='space-between' pb={16} w='100%'>
								<Group gap={8} justify='space-between'>
									<ActionIcon
										color='blue'
										variant='transparent'
										onClick={() => navigate(RoutePaths.TeamDetails.replace(':id', id!))}
									>
										<IconChevronLeft size={24} />
									</ActionIcon>
									<Title order={2}>Edit Team Details</Title>
								</Group>
								<Button variant='light' color='red' disabled={isTeamLocked}>
									Delete Team
								</Button>
							</Group>
							<Stack gap={16}>
								<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
									<Text size='lg' fw={500}>
										Team Information
									</Text>
									<Group wrap='nowrap'>
										<InputWrapper label='Team Name' size='sm' w='100%'>
											<Input {...methods.register('name')} />
										</InputWrapper>
										<Controller
											name='gameId'
											control={methods.control}
											render={({ field, fieldState }) => (
												<InputWrapper
													label='Game'
													size='sm'
													w='100%'
													error={fieldState.error?.message}
												>
													<Select
														placeholder='Select a game'
														data={selectGamesData}
														searchable
														{...field}
													/>
												</InputWrapper>
											)}
										/>
									</Group>
								</Stack>
							</Stack>
							<Stack gap={16}>
								<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
									<Group justify='space-between'>
										<Text size='lg' fw={500}>
											Team Members ({teamDetails?.teamMembers.length || 0}/5)
										</Text>
										<Button
											variant='subtle'
											size='sm'
											onClick={() => setIsAddMemberModalOpen(true)}
											disabled={(teamDetails?.teamMembers?.length ?? 0) >= 5}
										>
											Add Member
										</Button>
									</Group>
									{teamDetails?.teamMembers.map((member) => (
										<TeamMember
											key={member.userId}
											isLeader={userId === member.userId || member.userId === teamDetails.leaderId}
											startDate={member.startDate}
											userNickname={member.userNickname}
											userId={member.userId}
											teamId={teamDetails.id}
										/>
									))}
								</Stack>
							</Stack>
							<Stack gap={16}>
								<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
									<Group justify='space-between'>
										<Text size='lg' fw={500}>
											Team Links ({teamDetails?.teamLinks.length || 0})
										</Text>
										<Button
											variant='subtle'
											size='sm'
											onClick={() => setIsAddTeamLinkModalOpen(true)}
										>
											Add Link
										</Button>
									</Group>
									{teamDetails?.teamLinks.map((link) => (
										<TeamLink
											key={link.id}
											id={link.id}
											type={link.type}
											platformUsername={link.platformUsername}
											url={link.url}
											teamId={teamDetails.id}
											onEditClick={() => handleEditLinkClick(link)}
										/>
									))}
								</Stack>
							</Stack>
							<Group justify='flex-end'>
								<Button
									variant='filled'
									color='red'
									onClick={() => navigate(RoutePaths.TeamDetails.replace(':id', id!))}
								>
									Cancel
								</Button>
								<Button
									type='submit'
									variant='filled'
									loading={isUpdating}
									color='green'
									disabled={!isDirty || isUpdating}
								>
									Save Changes
								</Button>
							</Group>
						</Stack>
					</form>
				</FormProvider>
			</PageLayout>
			<AddMemberModal
				teamId={Number(id)}
				isOpen={isAddMemberModalOpen}
				onClose={() => setIsAddMemberModalOpen(false)}
			/>
			<AddLinkModal
				isOpen={isAddTeamLinkModalOpen}
				onClose={() => setIsAddTeamLinkModalOpen(false)}
				teamId={Number(id)}
			/>
			<EditLinkModal
				teamId={Number(id)}
				isOpen={isEditTeamLinkModalOpen}
				onClose={handleCloseEditModal}
				link={editingLink}
			/>
		</>
	);
};
