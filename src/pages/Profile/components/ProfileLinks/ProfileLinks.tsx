import { Button, Group, Stack, Title } from '@mantine/core';
import { useState, type FC } from 'react';

import { ProfileLink } from '@/src/components/ProfileLink';
import { AddPlayerLinkModal } from '@/src/pages/Profile/components/ProfileLinks/components/AddPlayerLinkModal';
import { EditPlayerLinkModal } from '@/src/pages/Profile/components/ProfileLinks/components/EditPlayerLinkModal';
import { useProfileLinksQuery } from '@/src/pages/Profile/components/ProfileLinks/profileLinks.utils';

type ProfileLinkData = {
	id: number;
	platformUsername?: string;
	url: string;
	type: string;
};

export const ProfileLinks: FC = () => {
	const { data } = useProfileLinksQuery();
	const [selectedLink, setSelectedLink] = useState<ProfileLinkData | null>(null);
	const [isAddModalOpen, setAddModalOpen] = useState(false);

	return (
		<Stack>
			<Group style={{ justifyContent: 'space-between' }}>
				<Title order={2}>Profile Links</Title>
				<Button variant='default' onClick={() => setAddModalOpen(true)}>
					Add
				</Button>
			</Group>
			<Stack>
				{data?.map((link) => (
					<ProfileLink key={link.id} link={link} onClick={(link) => setSelectedLink(link)} />
				))}
			</Stack>
			{selectedLink && (
				<EditPlayerLinkModal
					isOpen={!!selectedLink}
					link={selectedLink}
					onCancel={() => setSelectedLink(null)}
				/>
			)}
			<AddPlayerLinkModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
		</Stack>
	);
};
