import { writable } from 'svelte/store';
import request from './api';

export type User = { id: string; phone?: string; name?: string } | null;

const initialToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const auth = writable<{ user: User; token: string | null }>({
    user: null,
    token: initialToken,
});

export function setToken(token: string | null, user?: User) {
    if (typeof window !== 'undefined') {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');

        if (user) localStorage.setItem('user_id', user.id);
        else localStorage.removeItem('user_id');
    }
    auth.set({ user: user || null, token });
}

export async function loadUserFromToken() {
    const t = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!t) {
        auth.set({ user: null, token: null });
        return;
    }
    try {
        const user = await request('/auth/me', { method: 'GET' });
        auth.set({ user, token: t });
    } catch {
        setToken(null, null);
    }
}
