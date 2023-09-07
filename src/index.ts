import express from 'express';
import { http } from '@google-cloud/functions-framework';

import { logger } from './logging.service';
import {
    CreatePipelineTasksBodySchema,
    RunPipelineBodySchema,
} from './pipeline/pipeline.request.dto';
import * as pipelines from './pipeline/pipeline.const';
import { runPipeline, createPipelineTasks } from './pipeline/pipeline.service';

const app = express();

app.use(({ headers, path, body }, _, next) => {
    logger.info({ headers, path, body });
    next();
});

app.use('/task', ({ body }, res) => {
    const { value, error } = CreatePipelineTasksBodySchema.validate(body);

    if (error) {
        logger.warn(error);
        res.status(400).json({ error });
        return;
    }

    createPipelineTasks(value)
        .then((result) => {
            res.status(200).json({ result });
        })
        .catch((error) => {
            logger.error(error);
            res.status(500).json({ error });
        });
});

app.use('/', ({ body }, res) => {
    const { value, error } = RunPipelineBodySchema.validate(body);

    if (error) {
        logger.warn(error);
        res.status(400).json({ error });
        return;
    }

    runPipeline(
        { accountId: value.accountId, start: value.start, end: value.end },
        pipelines[value.pipeline],
    )
        .then((result) => {
            res.status(200).json({ result });
        })
        .catch((error) => {
            logger.error(error);
            res.status(500).json({ error });
        });
});

http('main', app);
