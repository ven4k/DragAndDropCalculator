import { FC } from "react"
import clsx from 'clsx';
import styles from './CalcItem.module.scss';

import { ICalcItem } from "../../../types/typesComponents";
import { useAppSelector } from "../../../store/hooks";


export const CalcItem:FC<ICalcItem> = ({
    variant, text, individual, onClick, cursorType
}: ICalcItem) => {
    const isConstructor = useAppSelector(state => state.calcItemsList.isConstructor);

    return (
        <div className={clsx(styles.calcItem, variant, individual, {[styles.touchItem] : cursorType})} 
            onClick={onClick}>
            {text}
        </div>
    )
}