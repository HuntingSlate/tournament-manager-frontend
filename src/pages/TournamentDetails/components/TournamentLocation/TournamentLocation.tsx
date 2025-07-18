import { Stack, InputWrapper, Input, Group, Text, Flex, Loader } from '@mantine/core';
import { useEffect, useState, type FC } from 'react';

import type { Tournament } from '@/src/api/tournament';
import type { TournamentMapProps } from '@/src/components/TournamentMap';
import { TournamentMap } from '@/src/components/TournamentMap';
import { vars } from '@/src/theme';
import { useAutoGeocode } from '@/src/utils/Geocode';

type TournamentLocationProps = {
	tournament?: Tournament;
};

export const TournamentLocation: FC<TournamentLocationProps> = ({ tournament }) => {
	const [mapPosition, setMapPosition] = useState<TournamentMapProps['position']>(null);

	useAutoGeocode(
		[
			tournament?.street,
			tournament?.buildingNumber,
			tournament?.city,
			tournament?.postalCode,
		].filter(Boolean) as string[],
		({ lat, lon }) => {
			setMapPosition([lat, lon]);
		}
	);

	useEffect(() => {
		if (tournament?.latitude && tournament?.longitude) {
			setMapPosition([Number(tournament.latitude), Number(tournament.longitude)]);
		}
	}, [tournament?.latitude, tournament?.longitude]);

	const hasLocationData =
		tournament?.city || tournament?.postalCode || tournament?.street || tournament?.buildingNumber;

	if (!hasLocationData) {
		return (
			<Stack
				p={24}
				style={{ borderRadius: 4, backgroundColor: vars.colors.white, border: '1px solid #ced4de' }}
			>
				<Text size='lg' fw={500}>
					Location - Online
				</Text>
			</Stack>
		);
	}

	const shouldShowMapLoader = hasLocationData && !mapPosition;

	return (
		<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
			<Text size='lg' fw={500}>
				Location
			</Text>
			<Stack>
				<Group w='100%' wrap='nowrap'>
					<InputWrapper label='Street' size='sm' w='80%'>
						<Input size='md' readOnly value={tournament?.street} />
					</InputWrapper>
					<InputWrapper label='Building Number' size='sm' w='20%'>
						<Input size='md' readOnly value={tournament?.buildingNumber} />
					</InputWrapper>
				</Group>
				<Group w='100%' wrap='nowrap'>
					<InputWrapper label='City' size='sm' w='80%'>
						<Input size='md' readOnly value={tournament?.city} />
					</InputWrapper>
					<InputWrapper label='Postal Code' size='sm' w='20%'>
						<Input size='md' readOnly value={tournament?.postalCode} />
					</InputWrapper>
				</Group>
				{shouldShowMapLoader ? (
					<Flex justify='center' align='center' h={360}>
						<Loader color='blue' />
					</Flex>
				) : (
					<TournamentMap position={mapPosition} />
				)}
			</Stack>
		</Stack>
	);
};
