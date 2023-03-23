import clsx from "clsx";
import { FC } from "react"
import { allClear, clearLastItem, resultOfBoardItem } from "../../../store/calcSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CalcItem } from "../../atoms/CalcItem/CalcItem"
import styles from './CalcClear.module.scss';


export const CalcClear: FC = () => {
    const isConstructor = useAppSelector(state => state.calcItemsList.isConstructor);
    const dispatch = useAppDispatch();

    const handleClickAC = () => {
        dispatch(allClear())
    }
    const handleClickClear = () => {
        dispatch(clearLastItem())
        dispatch(resultOfBoardItem());
    }
    return (
        <div className={styles.clear}>
            <CalcItem variant={styles.clearItem} text={"AC"} cursorType={!isConstructor && true}  onClick={() => !isConstructor && handleClickAC()} />
            <CalcItem variant={styles.clearItem} text={"C"} cursorType={!isConstructor && true}  onClick={() => !isConstructor && handleClickClear()} />
        </div>
    )
}