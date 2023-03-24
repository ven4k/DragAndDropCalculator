import { FC } from "react"
import clsx from 'clsx';
import styles from './CalcItem.module.scss';
import { ICalcItem } from "../../../types/typesComponents";



export const CalcItem:FC<ICalcItem> = ({
    variant, text, individual, onClick, cursorType
}: ICalcItem) => {


    return (
        <div className={clsx(styles.calcItem, variant, individual, {[styles.touchItem] : cursorType})} 
            onClick={onClick}>
            {text}
        </div>
    )
}