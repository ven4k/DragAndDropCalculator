import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initStateType = {
    isConstructor: boolean,
    value: string,
    otherValue: string,
    lastValue: string,
    boardItem: string,
    currentOperation: string,
    result: string,
}
const initialState: initStateType = {
    isConstructor: true,
    value: '',
    otherValue: '',
    lastValue: '',
    boardItem: '0',
    currentOperation: '',
    result: ''
}

export const calcSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        addOperation: (state, action: PayloadAction<string>) => {
            state.currentOperation = action.payload;
            if (state.result) {
                state.value = state.result;
            }
        },
        addValues: (state, action: PayloadAction<string>) => {
            if (!state.currentOperation) {
                state.result = '';
                state.value += action.payload;
                state.lastValue = state.value;
            }
            if (state.currentOperation.length && state.value.length) {
                state.otherValue += action.payload;
            }
        },
        calcResult: (state) => {
            switch (state.currentOperation) {
                case '+': {
                    state.result = String(Number(state.value) + Number(state.otherValue));
                    state.lastValue = state.result
                    break
                }
                case '-': {
                    state.result = String(Number(state.value) - Number(state.otherValue));
                    state.lastValue = state.result
                    break
                }
                case '*': {
                    state.result = String(Number(state.value) * Number(state.otherValue));
                    state.lastValue = state.result
                    break
                }
                case '/': {
                    state.result = String(Number(state.value) / Number(state.otherValue));
                    state.lastValue = state.result
                    break
                }
                case '': {
                    if (!state.lastValue.length) {
                        state.lastValue = '0'
                    }
                    state.result = state.lastValue;
                    break
                }
                default: break
            }
            state.boardItem = state.result
            state.value = state.result;
            state.otherValue = '';
            state.currentOperation = '';

        },
        resultOfBoardItem: (state) => {
            if (!state.value && state.currentOperation) {
                state.boardItem = state.currentOperation;
            }
            if (state.boardItem.length <= 7) {
                state.boardItem = state.value + state.currentOperation + state.otherValue
            }
            if (state.boardItem.length > 7) {
                state.boardItem = state.boardItem + '...';
            }
            if(!state.value && !state.currentOperation){
                state.boardItem = '0 '
            }
        },
        setConstructor: (state, action: PayloadAction<boolean>) => {
            state.isConstructor = action.payload
        },
        allClear: (state) => {
            state.value = '';
            state.otherValue = '';
            state.lastValue = '';
            state.boardItem = '0';
            state.currentOperation = '';
            state.result = '';
        },
        clearLastItem: (state) => {
            if (!state.currentOperation) {
                state.value = state.value.slice(0, -1);
                state.lastValue = state.value;
            }
            if (!state.otherValue && !state.result) {
                state.currentOperation = state.currentOperation.slice(0, -1);
            }

            if (state.otherValue && !state.result) {
                state.otherValue = state.otherValue.slice(0, -1);
                state.lastValue = state.otherValue;
            }
        }
    }
})


export const { addOperation, calcResult, resultOfBoardItem, addValues, setConstructor, allClear, clearLastItem } = calcSlice.actions;

