import fs from 'fs';
import path from 'path';

export const analyzeResult = (req, res) => {
  const { answers } = req.body;
  const result = {};
  let correctAnswersCount = 0;

  const questionsDB = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/questions.json'), {
      encoding: 'utf-8',
      flag: 'r',
    })
  );

  questionsDB.forEach((question, index) => {
    if (question.answer === answers[index]) {
      result[question.question] = {
        correct: true,
        answer: question.answer,
      };
      correctAnswersCount++;
    } else {
      result[question.question] = {
        correct: false,
        answer: question.answer,
      };;
    }
  });

  fs.writeFileSync(
    path.join(__dirname, '../data/result.json'),
    JSON.stringify({ accuracy: Math.floor((correctAnswersCount / questionsDB.length) * 100), result })
  );
  res
    .status(200)
    .send(JSON.stringify({ accuracy: Math.floor((correctAnswersCount / questionsDB.length) * 100), result }));
};
