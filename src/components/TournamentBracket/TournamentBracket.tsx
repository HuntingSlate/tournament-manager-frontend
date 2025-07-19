import { Box } from '@mantine/core';
import { useState, type FC } from 'react';

import type { Match } from '@/src/api/match';
import { MatchDetailsModal } from '@/src/components/TournamentBracket/components/MatchDetailsModal';
import { MatchEditModal } from '@/src/components/TournamentBracket/components/MatchEditModal';
import { MatchCard } from '@/src/components/TournamentBracket/MatchCard';
import { PlaceholderCard } from '@/src/components/TournamentBracket/PlaceholderCard';
import '@/src/components/TournamentBracket/TournamentBracket.css';

const generateFullBracket = (apiMatches: Match[]): (Match | null)[][] => {
	if (!apiMatches || apiMatches.length === 0) {
		return [];
	}

	const firstRoundMatches = apiMatches.filter((m) => m.bracketLevel === 1);
	if (firstRoundMatches.length === 0) return [];

	const initialTeamCount = firstRoundMatches.length * 2;
	const isPowerOfTwo = initialTeamCount > 0 && (initialTeamCount & (initialTeamCount - 1)) === 0;

	if (!isPowerOfTwo) {
		return [];
	}

	const fullBracket: (Match | null)[][] = [];
	let matchesInCurrentRound = initialTeamCount / 2;
	let roundNumber = 1;

	const matchesMap = new Map<string, Match>();
	apiMatches.forEach((m) => {
		const matchKey = `${m.bracketLevel}-${m.matchNumberInRound}`;
		matchesMap.set(matchKey, m);
	});

	while (matchesInCurrentRound >= 1) {
		const roundSlots: (Match | null)[] = [];
		for (let i = 1; i <= matchesInCurrentRound; i++) {
			const matchKey = `${roundNumber}-${i}`;
			const foundMatch = matchesMap.get(matchKey);
			roundSlots.push(foundMatch || null);
		}
		fullBracket.push(roundSlots);

		matchesInCurrentRound /= 2;
		roundNumber++;
	}

	return fullBracket;
};

export type TournamentBracketProps = {
	matches: Match[];
	canEditMatch?: boolean;
};

export const TournamentBracket: FC<TournamentBracketProps> = ({ matches, canEditMatch }) => {
	const fullBracket = generateFullBracket(matches);
	const [isMatchDetailsModalOpen, setIsMatchDetailsModalOpen] = useState(false);
	const [isEditMatchModalOpen, setIsEditMatchModalOpen] = useState(false);
	const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

	const handleSelectMatch = (match: Match) => {
		setSelectedMatch(match);
		if (canEditMatch) {
			setIsEditMatchModalOpen(true);
			return;
		}
		setIsMatchDetailsModalOpen(true);
	};

	return (
		<>
			<Box
				className='tournament-bracket'
				style={{ gridTemplateColumns: `repeat(${fullBracket.length}, 1fr)` }}
			>
				{fullBracket.map((round, roundIndex) => (
					<div className='round' key={roundIndex}>
						<h3 className='round-title'>Round {roundIndex + 1}</h3>
						<div className='matches-container'>
							{round.map((match, matchIndex) =>
								match ? (
									<MatchCard key={match.id} match={match} onClick={handleSelectMatch} />
								) : (
									<PlaceholderCard key={`placeholder-${roundIndex}-${matchIndex}`} />
								)
							)}
						</div>
					</div>
				))}
			</Box>
			{selectedMatch && canEditMatch ? (
				<MatchEditModal
					isOpen={isEditMatchModalOpen}
					onClose={() => setIsEditMatchModalOpen(false)}
					match={selectedMatch}
				/>
			) : selectedMatch ? (
				<MatchDetailsModal
					isOpen={isMatchDetailsModalOpen}
					onClose={() => setIsMatchDetailsModalOpen(false)}
					match={selectedMatch}
				/>
			) : null}
		</>
	);
};
