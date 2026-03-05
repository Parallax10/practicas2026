import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShopState {
    isLoggedIn: boolean;
    currentUser: string | null;
    cart: Record<string, any[]>;
    favorites: Record<string, any[]>;
}

const initialState: ShopState = { isLoggedIn: false, currentUser: null, cart: {}, favorites: {} };

export const shopSlice = createSlice({
    name: 'shop', 
    initialState,
    reducers: {
        // NUEVO: Acción para cargar los datos guardados al entrar a la web
        setHydratedState: (state, action: PayloadAction<ShopState>) => {
            return { ...state, ...action.payload };
        },
        login: (state, action: PayloadAction<string>) => { state.isLoggedIn = true; state.currentUser = action.payload; },
        logout: (state) => { state.isLoggedIn = false; state.currentUser = null; },
        addToCart: (state, action) => {
            const { site, product } = action.payload;
            if (!state.cart[site]) state.cart[site] = [];
            state.cart[site].push(product);
        },
        removeFromCart: (state, action) => {
            const { site, id } = action.payload;
            state.cart[site] = state.cart[site].filter(i => i.id !== id);
        },
        toggleFavorite: (state, action) => {
            const { site, product } = action.payload;
            if (!state.favorites[site]) state.favorites[site] = [];
            const idx = state.favorites[site].findIndex(i => i.id === product.id);
            if (idx >= 0) state.favorites[site].splice(idx, 1);
            else state.favorites[site].push(product);
        }
    }
});

export const { login, logout, addToCart, removeFromCart, toggleFavorite, setHydratedState } = shopSlice.actions;
export default shopSlice.reducer;