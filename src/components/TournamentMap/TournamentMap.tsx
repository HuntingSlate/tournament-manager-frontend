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

const MapViewUpdater: FC<{ position: [number, number] }> = ({ position }) => {
	const map = useMap();
	useEffect(() => {
		map.setView(position, 15);
	}, [position, map]);
	return null;
};

export type TournamentMapProps = {
	position: [number, number] | null;
};

export const TournamentMap: FC<TournamentMapProps> = ({ position }) => {
	const defaultCenter: [number, number] = [52.237, 21.017];
	const mapCenter = position || defaultCenter;
	const zoomLevel = position ? 13 : 6;

	return (
		<Box>
			<MapContainer
				center={mapCenter}
				zoom={zoomLevel}
				style={{ height: 360, width: '100%', zIndex: 0 }}
			>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					updateWhenIdle={true}
				/>
				{position && (
					<>
						<Marker position={position} />
						<MapViewUpdater position={position} />
					</>
				)}
			</MapContainer>
		</Box>
	);
};
