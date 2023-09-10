import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import pageReducer from '../features/pages/pageSlice'
import noteReducer from '../features/notes/noteSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    auth: authReducer,
    pages: pageReducer,
    notes: noteReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)