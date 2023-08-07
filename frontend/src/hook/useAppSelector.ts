import { useSelector } from 'react-redux';
import { AppSelector } from '../store/store';

export const useAppSelector = () => useSelector<AppSelector>;