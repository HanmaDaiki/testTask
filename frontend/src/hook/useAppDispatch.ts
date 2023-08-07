import { useDispatch } from 'react-redux';

import { AppDispath } from "../store/store";

export const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispath>();
  return dispatch;
};
