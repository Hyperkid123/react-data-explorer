import {
    ChartKind,
    ChartLegendOrientation,
    ChartLegendPosition,
    ChartSchemaElement,
    ChartThemeColor,
    ChartTooltipType,
    ChartTopLevelType,
    ChartType
} from '../../src/';

export const dashboard: ChartSchemaElement[] = [
    {
        id: 100,
        kind: ChartKind.wrapper,
        type: ChartTopLevelType.chart,
        parent: null,
        props: {
            height: 300
        },
        xAxis: {
            label: 'Date',
            tickFormat: 'formatDateAsDayMonth'
        },
        yAxis: {
            label: 'Total jobs'
        },
        api: {
            params: {
                status: [],
                quick_date_range: 'last_30_days',
                job_type: ['workflowjob', 'job'],
                group_by_time: true,
                org_id: [],
                cluster_id: [],
                template_id: [],
                only_root_workflows_and_standalone_jobs: false,
                attributes: ['failed_count']
            },
            url: '/demo/api/anomaly.json',
            method: 'GET'
        }
    },
    {
        id: 110,
        kind: ChartKind.group,
        parent: 100,
        props: {}
    },
    {
        id: 112,
        kind: ChartKind.simple,
        type: ChartType.line,
        parent: 110,
        props: {
            x: 'created_date',
            y: 'failed_count'
        }
    },
    {
        id: 111,
        kind: ChartKind.simple,
        type: ChartType.scatter,
        parent: 110,
        props: {
            x: 'created_date',
            y: 'failed_anomaly',
            size: 7,
            style: {
                data: { fill: "#c43a31" }
            }
        }
    },
    {
        id: 1000,
        kind: ChartKind.wrapper,
        type: ChartTopLevelType.chart,
        parent: null,
        props: {
            height: 300,
            domainPadding: 20
        },
        xAxis: {
            label: 'Date',
            tickFormat: 'formatDateAsDayMonth'
        },
        yAxis: {
            label: 'Jobs across all clusters'
        },
        api: {
            params: {
                status: ['successful', 'failed'],
                quick_date_range: 'last_30_days',
                job_type: ['workflowjob', 'job'],
                group_by_time: true,
                org_id: [],
                cluster_id: [],
                template_id: [],
                only_root_workflows_and_standalone_jobs: false,
                attributes: ['failed_count', 'successful_count']
            },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/'
        }
    },
    {
        id: 1100,
        kind: ChartKind.stack,
        parent: 1000,
        props: {}
    },
    {
        id: 1002,
        kind: ChartKind.simple,
        type: ChartType.bar,
        parent: 1100,
        props: {
            x: 'created_date',
            y: 'failed_count',
            style: {
                data: {
                    fill: '#A30000'
                }
            }
        },
        tooltip: {
            type: ChartTooltipType.default,
            props: {},
            labelName: 'Failed'
        },
        onClick: 'consoleLog'
    },
    {
        id: 1001,
        kind: ChartKind.simple,
        type: ChartType.bar,
        parent: 1100,
        props: {
            x: 'created_date',
            y: 'successful_count',
            style: {
                data: {
                    fill: '#6EC664'
                }
            }
        },
        tooltip: {
            type: ChartTooltipType.default,
            props: {}
        }
    },
    {
        id: 2000,
        kind: ChartKind.wrapper,
        type: ChartTopLevelType.chart,
        parent: null,
        props: {
            height: 300
        },
        xAxis: {
            label: 'Date',
            tickFormat: 'formatDateAsDayMonth'
        },
        yAxis: {
            label: 'Job runs'
        },
        tooltip: {
            cursor: true
        },
        api: {
            params: {
                status: ['successful', 'failed'],
                quick_date_range: 'last_30_days',
                job_type: ['workflowjob', 'job'],
                group_by_time: true,
                org_id: [],
                cluster_id: [],
                template_id: [],
                only_root_workflows_and_standalone_jobs: false,
                attributes: ['failed_count', 'successful_count']
            },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/'
        }
    },
    {
        id: 2100,
        kind: ChartKind.group,
        parent: 2000,
        props: {}
    },
    {
        id: 2002,
        kind: ChartKind.simple,
        type: ChartType.line,
        parent: 2100,
        props: {
            x: 'created_date',
            y: 'failed_count',
            style: {
                data: {
                    stroke: '#A30000'
                }
            }
        },
        tooltip: {
            labelName: 'Failed'
        },
        onClick: 'consoleLog'
    },
    {
        id: 2001,
        kind: ChartKind.simple,
        type: ChartType.line,
        parent: 2100,
        props: {
            x: 'created_date',
            y: 'successful_count',
            style: {
                data: {
                    stroke: '#6EC664'
                }
            }
        }
    },
    {
        id: 3000,
        kind: ChartKind.wrapper,
        type: ChartTopLevelType.chart,
        parent: null,
        props: {
            height: 300,
            themeColor: ChartThemeColor.green
        },
        xAxis: {
            label: 'Date',
            tickFormat: 'formatDateAsDayMonth'
        },
        yAxis: {
            label: 'Jobs across organizations'
        },
        api: {
            params: {
                status: [],
                org_id: [],
                quick_date_range: 'last_2_weeks',
                job_type: ['workflowjob', 'job'],
                cluster_id: [],
                template_id: [],
                start_date: null,
                end_date: null,
                attributes: ['total_count'],
                group_by_time: true,
                group_by: 'org',
                sort_by: `total_count:desc`
            },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/?limit=5'
        },
        legend: {
            interactive: true,
            orientation: ChartLegendOrientation.vertical,
            position: ChartLegendPosition.right
        }
    },
    {
        id: 3100,
        kind: ChartKind.group,
        parent: 3000,
        props: {},
        template: {
            id: 0,
            kind: ChartKind.simple,
            type: ChartType.bar,
            parent: 0,
            props: {
                x: 'created_date',
                y: 'total_count'
            },
            tooltip: {
                type: ChartTooltipType.default,
                props: {}
            }
        }
    },
    {
        id: 4000,
        kind: ChartKind.wrapper,
        type: ChartTopLevelType.pie,
        parent: null,
        props: {
            height: 300,
            x: '',
            y: 'host_count'
        },
        api: {
            params: {
                group_by: 'org',
                include_others: true,
                attributes: ['host_count'],
                sort_by: `total_count:desc`
            },
            url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/?limit=5'
        },
        legend: {
            interactive: true,
            orientation: ChartLegendOrientation.vertical,
            position: ChartLegendPosition.right
        }
    }
];