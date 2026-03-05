import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './slices/shopSlice';

export const store = configureStore({
  reducer: { shop: shopReducer }
});

// NUEVO: Suscribirse a los cambios. Cada vez que el estado cambia, lo guardamos en el navegador.
store.subscribe(() => {
    if (typeof window !== 'undefined') {
        const state = store.getState().shop;
        localStorage.setItem('miTiendaState', JSON.stringify(state));
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

