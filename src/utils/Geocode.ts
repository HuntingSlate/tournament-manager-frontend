import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useRef } from 'react';

import { geocodeAddress } from '@/src/api/geolocation';

type GeocodeHandler = (coords: { lat: number; lon: number }) => void;

export const useAutoGeocode = (addressParts: string[], onGeocode: GeocodeHandler) => {
	const fullAddress = addressParts.filter(Boolean).join(', ');
	const [debouncedAddress] = useDebouncedValue(fullAddress, 1500);
	const lastAddress = useRef<string | null>(null);

	useEffect(() => {
		const fetch = async () => {
			if (debouncedAddress.length > 5 && debouncedAddress !== lastAddress.current) {
				const result = await geocodeAddress(debouncedAddress);
				if (result) {
					const lat = parseFloat(result.lat);
					const lon = parseFloat(result.lon);
					lastAddress.current = debouncedAddress;
					onGeocode({ lat, lon });
				}
			}
		};
		fetch();
	}, [debouncedAddress, onGeocode]);
};
