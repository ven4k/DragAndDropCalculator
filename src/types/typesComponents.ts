export interface ICalcItem{
    variant: string,
    text: string,
    cursorType: boolean,
    individual?: string,
    onClick?: () => void;
}
export interface IData {
    id: number,
    order: number,
    draggable: boolean,
    visible: boolean,
    element: JSX.Element
}