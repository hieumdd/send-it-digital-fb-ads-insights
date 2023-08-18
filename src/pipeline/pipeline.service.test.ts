import * as pipelines from './pipeline.const';
import { createPipelineTasks, runPipeline } from './pipeline.service';

it('pipeline', async () => {
    return runPipeline(
        {
            accountId: '392314148981685',
            start: '2023-04-01',
            end: '2023-05-01',
        },
        pipelines.CAMPAIGN_HOURLY_INSIGHTS,
    )
        .then((results) => expect(results).toBeDefined())
        .catch((error) => {
            console.error({ error });
            throw error;
        });
});

it('create-tasks', async () => {
    return createPipelineTasks({
        start: '2023-08-01',
        end: '2023-09-01',
    })
        .then((result) => expect(result).toBeDefined())
        .catch((error) => {
            console.error({ error });
            throw error;
        });
});
