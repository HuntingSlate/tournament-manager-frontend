import { Stack, Group, Button, Text, Flex, Loader } from '@mantine/core';
import { useState, type FC } from 'react';

import { useGetUserProfileQuery } from '@/src/api/mutations/userMutations';
import { AddProfileLinkModal } from '@/src/pages/ProfileEdit/components/AddProfileLinkModal';
import { EditProfileLinkModal } from '@/src/pages/ProfileEdit/components/EditProfileLinkModal';
import { ProfileLink } from '@/src/pages/ProfileEdit/components/ProfileLink/ProfileLink';
import { vars } from '@/src/theme';

type ProfileLinkData = {
	id: number;
	platformUsername?: string;
	url: string;
	type: string;
};

export const ProfileLinks: FC = () => {
	const { data, isLoading } = useGetUserProfileQuery();

	const [isAddLinkModalOpen, setAddLinkModalOpen] = useState(false);
	const [isEditLinkModalOpen, setEditLinkModalOpen] = useState(false);
	const [selectedLink, setSelectedLink] = useState<ProfileLinkData | null>(null);

	const handleEditLinkClick = (link: ProfileLinkData) => {
		setSelectedLink(link);
		setEditLinkModalOpen(true);
	};

	return (
		<>
			<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
				<Group w='100%' justify='space-between'>
					<Text size='lg' fw={500}>
						Links ({data?.links.length || 0})
					</Text>
					<Button variant='light' color='blue' onClick={() => setAddLinkModalOpen(true)}>
						Add Link
					</Button>
				</Group>
				<Stack gap={16}>
					{isLoading ? (
						<Flex justify='center' align='center' w='100%'>
							<Loader color='blue' />
						</Flex>
					) : (
						data?.links.map((link) => (
							<ProfileLink key={link.id} {...link} onEditClick={() => handleEditLinkClick(link)} />
						))
					)}
				</Stack>
			</Stack>
			<EditProfileLinkModal
				isOpen={isEditLinkModalOpen}
				onClose={() => setEditLinkModalOpen(false)}
				link={selectedLink ?? undefined}
			/>
			<AddProfileLinkModal isOpen={isAddLinkModalOpen} onClose={() => setAddLinkModalOpen(false)} />
		</>
	);
};
