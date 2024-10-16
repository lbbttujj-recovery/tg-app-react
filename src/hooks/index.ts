import { AppDispatch, RootState } from '../store/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export { useBackUrl } from './useBackUrl'
export { useTelegram } from './useTelegram'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
