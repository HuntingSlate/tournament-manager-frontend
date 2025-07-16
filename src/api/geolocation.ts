type GeocodeResult = {
	lat: string;
	lon: string;
};

export const geocodeAddress = async (address: string): Promise<GeocodeResult | null> => {
	if (!address.trim()) return null;
	const response = await fetch(
		`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
	);
	const data = await response.json();
	return data[0] || null;
};
