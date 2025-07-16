import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthResponse } from '@/src/api/auth';

type User = {
	id: number;
	email: string;
	nickname: string;
	fullName?: string;
	isAdmin: boolean;
};

type AuthStateProperties = {
	token: string | null;
	user: User | null;
};

type AuthActions = {
	loginSuccess: (data: AuthResponse) => void;
	logout: () => void;
	isAuthenticated: () => boolean;
	isAdmin: () => boolean;
};

type AuthState = AuthStateProperties & AuthActions;

type PersistedAuthState = AuthStateProperties;

export const useAuthStore = create(
	persist<AuthState, [], [], PersistedAuthState>(
		(set, get) => ({
			token: null,
			user: null,
			loginSuccess: (data: AuthResponse) => {
				const user: User = {
					id: data.userId,
					email: data.email,
					nickname: data.nickname,
					isAdmin: data.role === 'ROLE_ADMIN',
				};
				set({ token: data.token, user: user });
			},
			logout: () => {
				set({ token: null, user: null });
			},
			isAuthenticated: () => !!get().token,
			isAdmin: () => !!get().user?.isAdmin,
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
