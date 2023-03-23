import clsx from "clsx";
import { FC } from "react";
import { calcResult } from "../../../store/calcSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CalcItem } from "../../atoms/CalcItem/CalcItem";
import styles from './CalcEqual.module.scss';

export const CalcEqual:FC = () => {
    const isConstructor = useAppSelector(state => state.calcItemsList.isConstructor)

    const dispatch = useAppDispatch();

    const handleClickEqual = () => {
        dispatch(calcResult())
    }

    return (
    <div className={styles.equal}>
        <CalcItem text={'='} variant={styles.equalItem} cursorType={!isConstructor && true} onClick={() => !isConstructor && handleClickEqual()}/>
    </div>
    )
}