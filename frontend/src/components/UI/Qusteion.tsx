import React, { FC, useState } from 'react';

import { useAppDispatch } from '../../hook/useAppDispatch';
import { setUserAnswer } from '../../store/questionsSlice';

interface Props {
  options: string[];
  question: string;
  indexQuestion: number;
}

export const Question: FC<Props> = ({ options, question, indexQuestion }) => {
  const [answer, setAnswer] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
    dispatch(setUserAnswer({ index: indexQuestion, text: event.target.value }));
  };

  return (
    <div>
      <label className='text-xl'>{question}</label>
      {options.map((option, index) => (
        <div key={index}>
          <label className='flex gap-2' htmlFor={`answer-${index}-${indexQuestion}`}>
            <input
              id={`answer-${index}-${indexQuestion}`}
              type='radio'
              name={`answer-${indexQuestion}`}
              value={option}
              checked={answer === option}
              onChange={handleRadioChange}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
