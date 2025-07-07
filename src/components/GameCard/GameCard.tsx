import type { FC } from 'react';

import { Image, Stack, Text } from '@mantine/core';

type GameCardProps = {
	name: string;
	imageUrl: string;
	onClick?: () => void;
};

export const GameCard: FC<GameCardProps> = ({ name, imageUrl, onClick }) => {
	return (
		<Stack style={{ cursor: 'pointer' }} onClick={onClick}>
			<Text size='sm'>{name}</Text>
			<Image
				src={imageUrl}
				alt={name}
				style={{ width: '150px', height: '150px', objectFit: 'cover' }}
			/>
		</Stack>
	);
};
