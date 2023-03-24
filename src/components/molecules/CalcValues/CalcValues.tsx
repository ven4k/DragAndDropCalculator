import { FC } from "react"
import { addValues, resultOfBoardItem } from "../../../store/calcSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { CalcItem } from "../../atoms/CalcItem/CalcItem"
import styles from './CalcValues.module.scss'

export const CalcValues: FC = () => {
    const dispatch = useAppDispatch();
    const isConstructor = useAppSelector(state => state.calcItemsList.isConstructor)

    const handleValueClick = (value: string, ) => {
        dispatch(addValues(value))
        dispatch(resultOfBoardItem());
    }
return (
    <div className={styles.values}>
        <CalcItem text={'7'} variant={styles.valuesItem} cursorType={!isConstructor && true}  onClick={ () =>!isConstructor && handleValueClick('7')}/>
        <CalcItem text={'8'} variant={styles.valuesItem} cursorType={!isConstructor && true}  onClick={ () =>!isConstructor && handleValueClick('8')} />
        <CalcItem text={'9'} variant={styles.valuesItem} cursorType={!isConstructor && true}  onClick={ () =>!isConstructor && handleValueClick('9')} />
        <CalcItem text={'4'} variant={styles.valuesItem} cursorType={!isConstructor && true}  onClick={ () =>!isConstructor && handleValueClick('4')} />
        <CalcItem text={'5'} variant={styles.valuesItem} cursorType={!isConstructor && true}  onClick={ () =>!isConstructor && handleValueClick('5')} />
        <CalcItem text={'6'} variant={styles.valuesItem} cursorType={!isConstructor && true}  onClick={ () =>!isConstructor && handleValueClick('6')} />
        <CalcItem text={'1'} variant={styles.valuesItem} cursorType={!isConstructor && true}  onClick={ () =>!isConstructor && handleValueClick('1')} />
        <CalcItem text={'2'} variant={styles.valuesItem} cursorType={!isConstructor && true}  onClick={ () =>!isConstructor && handleValueClick('2')} />
        <CalcItem text={'3'} variant={styles.valuesItem} cursorType={!isConstructor && true}  onClick={ () =>!isConstructor && handleValueClick('3')} />
        <CalcItem text={'0'} variant={styles.valuesItem} cursorType={!isConstructor && true}  individual={styles.valuesZeroItem} onClick={() => !isConstructor && handleValueClick('0')} />
        <CalcItem text={','} variant={styles.valuesItem} cursorType={!isConstructor && true}  onClick={() => !isConstructor && handleValueClick('.')} />
    </div>
)
}