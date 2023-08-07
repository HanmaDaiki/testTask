import { configureStore } from '@reduxjs/toolkit';
import { questionsReducer } from './questionsSlice';

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
  },
});

export type AppDispath = typeof store.dispatch;
