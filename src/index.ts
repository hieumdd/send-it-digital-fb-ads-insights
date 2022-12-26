import Joi from 'joi';
import { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';

import * as pipelines from './facebook/pipeline.const';
import { pipelineService } from './facebook/facebook.service';
import { taskService } from './facebook/account.service';

type Body = {
    pipeline: keyof typeof pipelines;
    accountId?: string;
    start?: string;
    end?: string;
};

export const main: HttpFunction = async ({ body }, res) => {
    Joi.object<Body>({
        pipeline: Joi.string().valid(Object.keys(pipelines)),
        accountId: Joi.string().optional(),
        start: Joi.string().optional(),
        end: Joi.string().optional(),
    })
        .validateAsync(body)
        .then((_body) => {
            if (_body.accountId) {
                pipelineService(
                    {
                        accountId: _body.accountId,
                        start: _body.start,
                        end: _body.end,
                    },
                    pipelines[_body.pipeline],
                )
                    .then((result) => res.status(200).json({ result }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                taskService(body)
                    .then((result) => res.status(200).json({ result }))
                    .catch((err) => res.status(500).json({ err }));
            }
        })
        .catch((err) => res.status(400).json({ err }));
};
