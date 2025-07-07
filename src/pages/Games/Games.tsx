import { GameCard } from '@/src/components/GameCard';
import { PageLayout } from '@/src/components/layouts/PageLayout';

export const Games = () => {
	return (
		<PageLayout>
			<GameCard
				name='CS:GO'
				imageUrl='https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1749053861'
				onClick={() => console.log()}
			/>
		</PageLayout>
	);
};
