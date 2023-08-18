import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import ndjson from 'ndjson';

import dayjs from '../dayjs';
import { logger } from '../logging.service';
import { createLoadStream } from '../bigquery.service';
import { createTasks } from '../cloud-tasks.service';
import { getAccounts } from '../facebook/account.service';
import { ReportOptions, get } from '../facebook/insights.service';
import * as pipelines from './pipeline.const';

export const runPipeline = async (reportOptions: ReportOptions, pipeline_: pipelines.Pipeline) => {
    logger.info({ action: 'start', pipeline: pipeline_.name });

    const stream = await get(reportOptions, pipeline_.insightsConfig);

    return pipeline(
        stream,
        new Transform({
            objectMode: true,
            transform: (row, _, callback) => {
                const { value, error } = pipeline_.validationSchema.validate(row, {
                    stripUnknown: true,
                    abortEarly: false,
                });

                if (error) {
                    callback(error);
                    return;
                }

                callback(null, { ...value, _batched_at: dayjs().utc().toISOString() });
            },
        }),
        ndjson.stringify(),
        createLoadStream({
            table: `p_${pipeline_.name}__${reportOptions.accountId}`,
            schema: [...pipeline_.schema, { name: '_batched_at', type: 'TIMESTAMP' }],
            writeDisposition: 'WRITE_APPEND',
        }),
    ).then(() => {
        logger.info({ action: 'done', pipeline: pipeline_.name });
        return true;
    });
};

export type CreatePipelineTasksOptions = {
    start?: string;
    end?: string;
};

export const createPipelineTasks = async ({ start, end }: CreatePipelineTasksOptions) => {
    const businesses = {
        JLGroup: '1140688266460121',
        MuscleCarJones: '254828986334614',
        HGPS1: '939019287079336',
        SendItDigital: '402052360914388',
        SendItDigital2: '211142348565945',
    };

    const accounts = await Promise.all(
        Object.values(businesses).map((businessId) => getAccounts(businessId)),
    ).then((accounts) => accounts.flat());

    return Promise.all([
        // createTasks(
        //     Object.keys(pipelines).flatMap((pipeline) => {
        //         return accounts.map((account) => ({ accountId: account.account_id, start, end, pipeline }));
        //     }),
        //     (task) => [task.pipeline, task.accountId].join('-'),
        // ),
        pipeline(
            Readable.from(accounts),
            ndjson.stringify(),
            createLoadStream({
                table: `Accounts`,
                schema: [
                    { name: 'account_name', type: 'STRING' },
                    { name: 'account_id', type: 'INT64' },
                ],
                writeDisposition: 'WRITE_TRUNCATE',
            }),
        ),
    ]).then(() => true);
};
