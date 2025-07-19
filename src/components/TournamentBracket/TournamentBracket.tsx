import { Box } from '@mantine/core';
import { useState, type FC } from 'react';

import type { Match } from '@/src/api/match';
import { MatchDetailsModal } from '@/src/components/TournamentBracket/components/MatchDetailsModal';
import { MatchEditModal } from '@/src/components/TournamentBracket/components/MatchEditModal';
import { MatchCard } from '@/src/components/TournamentBracket/MatchCard';
import { PlaceholderCard } from '@/src/components/TournamentBracket/PlaceholderCard';
import '@/src/components/TournamentBracket/TournamentBracket.css';

const generateFullBracket = (apiMatches: Match[]): (Partial<Match> | null)[][] => {
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

	const fullBracket: (Partial<Match> | null)[][] = [];
	let matchesInCurrentRound = initialTeamCount / 2;
	let roundNumber = 1;

	const matchesMap = new Map<string, Match>();
	apiMatches.forEach((m) => {
		const matchKey = `${m.bracketLevel}-${m.matchNumberInRound}`;
		matchesMap.set(matchKey, m);
	});

	while (matchesInCurrentRound >= 1) {
		const roundSlots: (Partial<Match> | null)[] = [];
		const previousRound = roundNumber > 1 ? fullBracket[roundNumber - 2] : [];

		for (let i = 1; i <= matchesInCurrentRound; i++) {
			const matchKey = `${roundNumber}-${i}`;
			const foundMatch = matchesMap.get(matchKey);

			if (foundMatch) {
				roundSlots.push(foundMatch);
			} else if (roundNumber > 1) {
				const parentMatch1 = previousRound[(i - 1) * 2];
				const parentMatch2 = previousRound[(i - 1) * 2 + 1];

				const getWinner = (match: Partial<Match> | null) => {
					if (!match || match.status !== 'COMPLETED' || match.winningTeamId == null) {
						return null;
					}
					const isFirstTeamWinner = match.winningTeamId === match.firstTeamId;
					return {
						id: match.winningTeamId,
						name: isFirstTeamWinner ? match.firstTeamName : match.secondTeamName,
					};
				};

				const winner1 = getWinner(parentMatch1);
				const winner2 = getWinner(parentMatch2);

				if (winner1 || winner2) {
					const partialMatch: Partial<Match> = {
						bracketLevel: roundNumber,
						matchNumberInRound: i,
						status: 'SCHEDULED',
						firstTeamId: winner1?.id ?? undefined,
						firstTeamName: winner1?.name ?? undefined,
						secondTeamId: winner2?.id ?? undefined,
						secondTeamName: winner2?.name ?? undefined,
					};
					roundSlots.push(partialMatch);
				} else {
					roundSlots.push(null);
				}
			} else {
				roundSlots.push(null);
			}
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

	const handleSelectMatch = (match: Partial<Match>) => {
		if (typeof match.id !== 'number') {
			return;
		}
		setSelectedMatch(match as Match);
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
									<MatchCard
										key={match.id ?? `partial-${roundIndex}-${matchIndex}`}
										match={match}
										onClick={handleSelectMatch}
									/>
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
