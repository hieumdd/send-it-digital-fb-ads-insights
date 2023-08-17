import Joi from 'joi';

import dayjs from '../dayjs'
import * as pipelines from './pipeline.const';
import { CreatePipelineTasksOptions } from './pipeline.service';

export const CreatePipelineTasksBodySchema = Joi.object<CreatePipelineTasksOptions>({
    start: Joi.string()
        .optional()
        .empty(null)
        .allow(null)
        .default(dayjs.utc().subtract(7, 'day').format('YYYY-MM-DD')),
    end: Joi.string().optional().empty(null).allow(null).default(dayjs.utc().format('YYYY-MM-DD')),
});

type RunPipelineBody = {
    accountId: string;
    start: string;
    end: string;
    pipeline: keyof typeof pipelines;
};

export const RunPipelineBodySchema = Joi.object<RunPipelineBody>({
    accountId: Joi.string(),
    start: Joi.string(),
    end: Joi.string(),
    pipeline: Joi.string(),
});
