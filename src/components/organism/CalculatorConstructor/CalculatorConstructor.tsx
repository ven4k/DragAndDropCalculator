import { DragEvent, useState, FC, MouseEvent } from "react";
import clsx from "clsx";
import { IData } from "../../../types/typesComponents";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setConstructor } from "../../../store/calcSlice";
import pictureIco from '../../../assets/svg/pictureIco.svg';
import eye from '../../../assets/svg/eye.svg';
import selector from '../../../assets/svg/selector.svg';
import { CalcBoard } from "../../molecules/CalcBoard/CalcBoard";
import { CalcClear } from "../../molecules/CalcClear/CalcClear";
import { CalcOperators } from "../../molecules/CalcOperators/CalcOperators";
import { CalcValues } from "../../molecules/CalcValues/CalcValues";
import { CalcEqual } from "../../molecules/CalcEqual/CalcEqual";
import styles from './CalculatorConstructor.module.scss';


export const CalculatorConstructor: FC = () => {
    // const [isConstructor, setIsConstructor] = useState(true);
    const dispatch = useAppDispatch();
    const isConstructor = useAppSelector(state => state.calcItemsList.isConstructor)

    const [isDragging, setIsDragging] = useState<boolean>(false);

    const [items, setItems] = useState<IData[]>([
        { id: 1, order: 1, draggable: true, visible: true, element: <CalcBoard /> },
        { id: 2, order: 2, draggable: true, visible: true, element: <CalcClear /> },
        { id: 3, order: 3, draggable: true, visible: true, element: <CalcOperators /> },
        { id: 4, order: 4, draggable: true, visible: true, element: <CalcValues /> },
        { id: 5, order: 5, draggable: true, visible: true, element: <CalcEqual /> }
    ]);



    const [currItem, setCurrItem] = useState<IData>();
    const [calcItems, setCalcItems] = useState<IData[]>([])

    const handleDragStart = (el: IData) => {
        setCurrItem(el);
        setIsDragging(true);
    }
    const constructorItemShadow = String(styles.constructorItemShadow);
    const HandleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.currentTarget.className === constructorItemShadow) {
            e.currentTarget.style.boxShadow = '0 4px 4px gray'
        }
    }
    const handleDragEnd = () => {
        setIsDragging(false);
    }
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.boxShadow = 'none'
    }

    const handleDropCalcConstructorItem = (e: DragEvent<HTMLDivElement>, el: IData) => {
        e.preventDefault();
        e.currentTarget.style.boxShadow = 'none'
        setCalcItems(calcItems.map(item => {
            if (currItem && item.id === currItem.id) {
                return { ...item, order: el.order }
            }
            if (currItem && item.id === el.id) {
                return { ...item, order: currItem.order }
            }
            return item
        }))
    }
    const handleDropCalcConstructor = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setItems(items.map(el => {
            if (currItem && el.id === currItem.id) {
                return { ...el, draggable: false }
            }
            return el
        }))
        const currTargetItem = calcItems.map(el => el.id);
        const newCurrItem = { ...currItem, order: calcItems.length + 1 }
        if (currItem && !currTargetItem.includes(currItem.id)) {
            setCalcItems([...calcItems, newCurrItem as IData])
        }
    };
    const handleDoubleClickConstructorItem = (e: MouseEvent<HTMLDivElement>, item: IData) => {
        const newItem = calcItems.filter(el => el.id !== item.id);
        setCalcItems(newItem);
        setItems(items.map(el => {
            if (currItem && el.id === item.id) {
                return { ...el, draggable: true }
            }
            return el
        }))
    }
    const sortItems = (a: IData, b: IData) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }



    const handleBtnConstructorClick = () => {
        dispatch(setConstructor(true));
        setItems(items.map(item => {
            if (!item.draggable) {
                return { ...item, visible: true }
            }
            return item
        }));
    }
    const handleBtnCalculatorClick = () => {
        dispatch(setConstructor(false))
        setItems(items.map(item => {
            if (!item.draggable) {
                return { ...item, visible: false }
            }
            return item
        }));
    }

    return (
        <div className={styles.calculator}>
            <div className={styles.calc}>
                {items.sort(sortItems).map((el) => (
                    <div draggable={isConstructor && el.draggable} key={el.id}
                        className={clsx({
                            [styles.grabItem]: isConstructor,
                            [styles.disabledItem]: !el.draggable && el.visible,
                            [styles.noVisibleDisabledItem]: !el.visible,
                        })}
                        onDragStart={() => isConstructor && handleDragStart(el)}
                        onDragEnd={handleDragEnd}
                    >
                        {el.element}
                    </div>
                ))}
            </div>
            <div className={clsx(styles.calculatorConstructor, { [styles.calcConstructorHaveItems]: calcItems.length, [styles.calcConstructorHaveNoItems]: !calcItems.length, [styles.dragging]: isDragging })}
                onDrop={(e) => isConstructor && handleDropCalcConstructor(e)} onDragOver={(e) => e.preventDefault()}>
                {calcItems && calcItems.sort(sortItems).map(item => (
                    <div draggable={isConstructor} key={item.id} className={constructorItemShadow}
                        onDragOver={HandleDragOver}
                        onDragStart={() => isConstructor && handleDragStart(item)}
                        onDragEnd={handleDragEnd}
                        onDrop={(e) => isConstructor && handleDropCalcConstructorItem(e, item)}
                        onDoubleClick={(e) => { isConstructor && handleDoubleClickConstructorItem(e, item) }}
                        onDragLeave={handleDragLeave}
                    >
                        {item.element}
                    </div>
                ))}
                {!calcItems.length && (
                    <div className={styles.constructorInfo}>
                        <div><img src={pictureIco} alt='ico' /> </div>
                        <h4>Перетащите сюда</h4>
                        <p>любой элемент <br /> из левой панели</p>
                    </div>
                )}
            </div>
            <div className={styles.switcher}>
                <div onClick={handleBtnCalculatorClick} className={clsx(styles.switchRuntime, { [styles.switchItemisActive]: !isConstructor })}><img src={eye} alt='eye' /><span>Runtime</span></div>
                <div onClick={handleBtnConstructorClick} className={clsx(styles.switchConstructor, { [styles.switchItemisActive]: isConstructor })}><img src={selector} alt='selector' /><span>Constructor</span></div>
            </div>
            <div className={styles.info}>
                *Двойное нажатие удаляет элемент
            </div>
        </div>
    )
}
