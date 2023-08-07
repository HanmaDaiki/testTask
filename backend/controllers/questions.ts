import fs from 'fs';
import path from 'path';

export const getQuestions = (req, res) => {
  const questions = fs.readFileSync(path.join(__dirname, '../data/questions.json'), {
    encoding: 'utf-8',
    flag: 'r',
  });
  res.status(200).send(questions);
};
