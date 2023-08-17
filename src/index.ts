import express, { Handler } from 'express';
import { Schema } from 'joi';
import { http } from '@google-cloud/functions-framework';

import { logger } from './logging.service';
import {
    CreatePipelineTasksBodySchema,
    RunPipelineBodySchema,
} from './pipeline/pipeline.request.dto';
import * as pipelines from './pipeline/pipeline.const';
import { runPipeline, createPipelineTasks } from './pipeline/pipeline.service';

const app = express();

app.use(({ path, body }, _, next) => {
    logger.debug({ path, body });
    next();
});

const validationMiddleware = (schema: Schema): Handler => {
    return ({ body }, res, next) => {
        const { error } = schema.validate(body);

        if (error) {
            logger.warn(error);
            res.status(400).json({ error });
            return;
        }

        next();
    };
};

app.use('/task', validationMiddleware(CreatePipelineTasksBodySchema), ({ body }, res) => {
    createPipelineTasks(body)
        .then((result) => {
            res.status(200).json({ result });
        })
        .catch((error) => {
            logger.error(error);
            res.status(500).json({ error });
        });
});

app.use('/', validationMiddleware(RunPipelineBodySchema), ({ body }, res) => {
    runPipeline(
        { accountId: body.accountId, start: body.start, end: body.end },
        pipelines[body.pipeline as keyof typeof pipelines],
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
