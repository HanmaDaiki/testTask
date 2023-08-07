import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface QuestionsState {
  questions: Question[];
  userAnswer: string[];
  status: 'waitingStart' | 'testing' | 'completed';
  resulted: {
    accuracy: number;
    result: { [key: string]: {
      correct: boolean;
      answer: string;
    } };
  };
}

const initialState: QuestionsState = {
  questions: [],
  userAnswer: [],
  status: 'waitingStart',
  resulted: { accuracy: 0, result: { } },
};

const PORT = import.meta.env.VITE_URL_BACKEND_PORT;

export const getQuestions = createAsyncThunk('questions/getQuestions', async () => {
  const response = await fetch(`http://localhost:${PORT}/api/questions`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Something went wrong');
  }
});

export const postResult = createAsyncThunk('questions/postResult', async (answers: string[]) => {
  const response = await fetch(`http://localhost:${PORT}/api/result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      answers,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Something went wrong');
  }
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    testStart: (state) => {
      state.status = 'testing';
    },

    setUserAnswer: (state, action) => {
      state.userAnswer[action.payload.index] = action.payload.text;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
      state.userAnswer = ['', '', ''];
    });
    builder.addCase(postResult.fulfilled, (state, action) => {
      state.status = 'completed';
      state.resulted = action.payload;
    })
  },
});

export const { setUserAnswer, testStart } = questionsSlice.actions;
export const questionsReducer = questionsSlice.reducer;
