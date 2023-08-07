import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../hook/useAppDispatch';
import { Form } from './Simple/Form';
import { QuestionsState, getQuestions, testStart } from '../store/questionsSlice';

function App() {
  const { status } = useSelector((state: { questions: QuestionsState }) => state.questions);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getQuestions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'waitingStart') {
    return (
      <>
        <main className='px-10 flex flex-col align-center justify-center w-full'>
          <button className='mt-5' onClick={() => dispatch(testStart())}>Начать тестирование</button>
        </main>
      </>
    );
    
  }

  return (
    <>
      <main className='px-10 flex flex-col align-center justify-center w-full'>
        <Form />
      </main>
    </>
  );
}

export default App;
