import Joi from 'joi';
import { http } from '@google-cloud/functions-framework';
import express from 'express';

import * as pipelines from './facebook/pipeline.const';
import { pipelineService } from './facebook/facebook.service';
import { taskService } from './facebook/account.service';

const app = express();

type RunPipelineDto = {
    pipeline: keyof typeof pipelines;
    accountId: string;
    start?: string;
    end?: string;
};

app.use('/', (req, res) => {
    Joi.object<RunPipelineDto>({
        pipeline: Joi.string().valid(Object.keys(pipelines)),
        accountId: Joi.string(),
        start: Joi.string().optional(),
        end: Joi.string().optional(),
    })
        .validateAsync(req.body)
        .then(({ pipeline, accountId, start, end }) =>
            pipelineService({ accountId, start, end }, pipelines[pipeline]),
        )
        .then((result) => res.status(200).json({ result }))
        .catch((err) => res.status(500).json({ err }));
});

app.use('/task', (req, res) => {
    Joi.object<Omit<RunPipelineDto, 'accountId'>>({
        pipeline: Joi.string().valid(Object.keys(pipelines)),
        start: Joi.string().optional(),
        end: Joi.string().optional(),
    })
        .validateAsync(req.body)
        .then(({ start, end }) => taskService({ start, end }))
        .catch((err) => res.status(500).json({ err }));
});

http('main', app);
