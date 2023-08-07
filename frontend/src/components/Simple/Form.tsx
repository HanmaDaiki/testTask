import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { QuestionsState, postResult } from '../../store/questionsSlice';
import { Question } from '../UI/Qusteion';
import { Timer } from './Timer';

export const Form: FC = () => {
  const { questions, userAnswer, status, resulted } = useSelector(
    (state: { questions: QuestionsState }) => state.questions
  );
  const [finalResult, setFinalResult] = useState<{ question: string; answer: string; correct: boolean }[]>(
    []
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const resultedArray = [];
    for (const key in resulted.result) {
      resultedArray.push({
        question: key,
        answer: resulted.result[key].answer,
        correct: resulted.result[key].correct,
      });
    }
    setFinalResult(resultedArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(postResult(userAnswer));
  };

  if (status === 'completed') {
    return (
      <form>
        <p>Вы ответили правильно на {resulted.accuracy}% вопросов</p>
        {finalResult.map((item, index) => {
          return (
            <div key={index} className={`${item.correct ? 'text-green-500' : 'text-red-500'} border`}>
              <p>Вопрос - {item.question}</p>
              {
                item.correct && <p>Вы ответили верно!</p>
              }
              {
                !item.correct && <p>Ваш ответ не верный! Правильный ответ: {item.answer}</p>
              }
              
            </div>
          );
        })}
        <button>Завершить тест</button>
      </form>
    );
  }

  return (
    <form className='flex flex-col gap-2' onSubmit={handleSumbit}>
      <Timer />
      {questions.map((question, index) => (
        <Question
          key={question.question}
          options={question.options}
          question={question.question}
          indexQuestion={index}
        />
      ))}

      <button type='submit'>Проверить ответы</button>
    </form>
  );
};
