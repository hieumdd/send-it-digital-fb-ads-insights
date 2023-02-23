import { pipelineService } from './facebook.service';
import { ACCOUNTS, accountService, taskService } from './account.service';
import {
    ACCOUNT_HOURLY_INSIGHTS,
    CAMPAIGN_INSIGHTS,
    CAMPAIGN_HOURLY_INSIGHTS,
} from './pipeline.const';

describe('Pipeline Service', () => {
    it.concurrent.each(Object.values(ACCOUNTS).flat())(
        'account %p',
        async (accountId) => {
            console.log(accountId);
            return pipelineService(
                {
                    accountId: String(accountId),
                    start: '2023-02-22',
                    end: '2023-03-01',
                },
                CAMPAIGN_HOURLY_INSIGHTS,
            ).catch((err) => {
                console.error({ err, accountId });
                return Promise.reject(err);
            });
        },
        540_000,
    );
});

it('Account Service', async () => {
    return accountService().then((rows) => expect(rows).toBeTruthy());
});

it('Task Service', async () => {
    return taskService({
        pipeline: 'CAMPAIGN_HOURLY_INSIGHTS',
        start: '2022-02-01',
        end: '2022-02-07',
    }).then((num) => expect(num).toBeGreaterThan(0));
});
