import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
	id: number;
	email: string;
	nickname: string;
	fullName?: string;
};

type AuthStateProperties = {
	token: string | null;
	user: User | null;
};

type AuthActions = {
	loginSuccess: (token: string, user: User) => void;
	logout: () => void;
	isAuthenticated: () => boolean;
};

type AuthState = AuthStateProperties & AuthActions;

type PersistedAuthState = AuthStateProperties;

export const useAuthStore = create(
	persist<AuthState, [], [], PersistedAuthState>(
		(set, get) => ({
			token: null,
			user: null,
			loginSuccess: (token, user) => {
				set({ token, user });
			},
			logout: () => {
				set({ token: null, user: null });
			},
			isAuthenticated: () => !!get().token,
		}),
		{
			name: 'auth-storage',
			partialize: (state): PersistedAuthState => ({
				token: state.token,
				user: state.user,
			}),
		}
	)
);
