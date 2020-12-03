import { useReducer } from 'react';
import { ReducerType, State, ChartState, Action, FormOption } from '../types';

const initial = {
    charts: [] as ChartState[],
    form: [] as FormOption[]
};

const setFormOptionValue = (
    form: FormOption[],
    { key, value }: { key: string, value: string }
): FormOption[] =>
    form.map(item => {
        if (item.name === key) {
            item.value = value;
        }
        return item;
    });

const reducer = (state: State, { type, payload }: Action) => {
    switch (type) {
        case ReducerType.set:
            return ({ ...payload } as State);
        case ReducerType.setForm:
            return { ...state, form: payload as FormOption[] };
        case ReducerType.setFormOptionValue:
            /* Update the chart value */
            // TODO

            return { ...state, form: setFormOptionValue(state.form, payload) };
        case ReducerType.reset:
            return { ...initial };
        default:
            return state;
    }
};

type CustomReducerType = () => [ State, React.Dispatch<Action> ];

const useDataReducer: CustomReducerType = () => useReducer(reducer, { ...initial });

export default useDataReducer;
