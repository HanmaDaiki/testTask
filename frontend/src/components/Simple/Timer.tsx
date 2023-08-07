import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../hook/useAppDispatch';
import { QuestionsState, postResult } from '../../store/questionsSlice';

export const Timer: FC = () => {
  const [timer, setTimer] = useState(120);
  const { userAnswer } = useSelector((state: { questions: QuestionsState }) => state.questions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  useEffect(() => {
    if(timer === 0) {
      dispatch(postResult(userAnswer));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer])

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return(
    <div>
      {formatTime(timer)}
    </div>
  );
}