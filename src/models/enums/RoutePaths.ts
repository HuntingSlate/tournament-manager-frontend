export enum RoutePaths {
	Login = '/login',
	Register = '/register',

	Games = '/games',

	Players = '/players',

	Leaderboard = '/leaderboard',
	LeaderboardByGame = '/leaderboard/:id',

	Home = '/',
	CreateTournament = '/tournaments/create',
	TournamentDetails = '/tournaments/:id',
	TournamentByGame = '/tournaments/game/:gameId',
	EditTournament = '/tournaments/:id/edit',

	Profile = '/profile',
	ProfileDetails = '/profile/:id',
	ProfileEdit = '/profile/edit',

	Teams = '/teams',
	TeamDetails = '/teams/:id',
	EditTeam = '/teams/:id/edit',

	Matches = '/matches',
	MatchDetails = '/matches/:id',
	EditMatch = '/matches/:id/edit',
}
