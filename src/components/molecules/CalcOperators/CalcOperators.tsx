import { FC } from "react";
import { addOperation, resultOfBoardItem } from "../../../store/calcSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CalcItem } from "../../atoms/CalcItem/CalcItem";
import styles from './CalcOperators.module.scss';

export const CalcOperators: FC = () => {
    const dispatch = useAppDispatch();
    const isConstructor = useAppSelector(state => state.calcItemsList.isConstructor)
    const handleOperatorClick = (operator: string) => {
        dispatch(addOperation(operator))
        dispatch(resultOfBoardItem())
    }
    return (
        <div className={styles.operators}> 
            <CalcItem text={'/'} variant={styles.operatorsItem} cursorType={!isConstructor && true} onClick={() => !isConstructor && handleOperatorClick('/')}/>
            <CalcItem text={'*'} variant={styles.operatorsItem} cursorType={!isConstructor && true} onClick={() => !isConstructor && handleOperatorClick('*')}/>
            <CalcItem text={'-'} variant={styles.operatorsItem} cursorType={!isConstructor && true} onClick={() => !isConstructor && handleOperatorClick('-')}/>
            <CalcItem text={'+'} variant={styles.operatorsItem} cursorType={!isConstructor && true} onClick={() => !isConstructor && handleOperatorClick('+')}/>
        </div>
    )
}