import clsx from "clsx";
import { FC } from "react"
import { useAppSelector } from "../../../store/hooks";
import { CalcItem } from "../../atoms/CalcItem/CalcItem"
import styles from './CalcBoard.module.scss';



export const CalcBoard: FC = () => {
    const boardText = useAppSelector(state => state.calcItemsList.boardItem)
    const isConstructor = useAppSelector(state => state.calcItemsList.isConstructor);


    return (
        <div className={clsx(styles.board, {[styles.boardGrab] : isConstructor})}>
            <CalcItem variant={clsx(styles.boardItem, {[styles.boardItemStart] : boardText.length > 7})} cursorType={false} text={boardText} />
        </div>
    )
}