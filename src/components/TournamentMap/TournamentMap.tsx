import { Box } from '@mantine/core';
import L from 'leaflet';
import { useEffect, type FC } from 'react';
import { MapContainer, Marker, useMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
	iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapFlyTo: FC<{ position: [number, number] }> = ({ position }) => {
	const map = useMap();
	useEffect(() => {
		map.flyTo(position, 15);
	}, [position, map]);
	return null;
};

export const TournamentMap: FC<{ position: [number, number] }> = ({ position }) => {
	return (
		<Box>
			<MapContainer center={position} zoom={13} style={{ height: 360, width: '100%' }}>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				<Marker position={position} />
				<MapFlyTo position={position} />
			</MapContainer>
		</Box>
	);
};
