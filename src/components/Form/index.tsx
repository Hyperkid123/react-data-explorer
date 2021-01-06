import React, { FunctionComponent, useEffect } from 'react';
import { Card, CardTitle, CardBody } from '@patternfly/react-core';
import Select from './Select';
import { FormOption, Chart } from '../../types';
import {
    apiOptionsToFormOptions,
    useTypedSelector
} from '../helpers';
import useDataReducer from '../useDataReducer';
import { useDispatch } from 'react-redux';
import { ReducerType, ChartType } from '../../types';
import { updateChart } from '../../store/charts/actions';

interface PropType {
    chartId: number,
    fields?: FormOption[],
}

const options = {
    chartTypes: [
        {
            'key': ChartType.bar,
            'value':  'Bar Chart'
        },
        {
            'key': ChartType.line,
            'value':  'Line Chart'
        }
    ],
    attributes: [
        {
            'key': 'host_count',
            'value': 'Host count'
        },
        {
            'key': 'failed_host_count',
            'value': 'Failed host count'
        },
        {
            'key': 'unreachable_host_count',
            'value': 'Unreachable host count'
        },
        {
            'key': 'average_elapsed_per_host',
            'value': 'Average elapsed time per host'
        },
        {
            'key': 'average_host_task_count_per_host',
            'value': 'Average tasks count per host'
        }
    ]
}


const Form: FunctionComponent<PropType> = ({ chartId }) => {
    const [ state, dispatch ] = useDataReducer();
    const dispatchChart = useDispatch();

    const fieldValue = (n: string) =>
        state.find(({ name }) => name === n).value

    const chart = useTypedSelector(store =>
        store.charts.find(({ id }) => id === chartId));

    useEffect(() => {
        dispatch({
            type: ReducerType.setForm,
            payload: apiOptionsToFormOptions(options, dispatch)
        });
    }, [])

    useEffect(() => {
        if (state.length <= 0) return;

        dispatchChart(updateChart({
            ...chart,
            type: fieldValue('chartTypes'),
            y: fieldValue('attributes')
        } as Chart));
    }, [ state ]);

    return (
        <Card>
            <CardTitle>Options</CardTitle>
            <CardBody>
                { state.map((item, idx) => <Select key={idx} {...item} />) }
            </CardBody>
        </Card>
    );
};

export default Form;
