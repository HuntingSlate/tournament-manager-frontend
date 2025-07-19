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
	TournamentLadder = '/tournaments/:id/ladder',

	Profile = '/profile',
	ProfileDetails = '/profile/:id',
	ProfileEdit = '/profile/edit',

	Teams = '/teams',
	TeamDetails = '/teams/:id',
	EditTeam = '/teams/:id/edit',
}
