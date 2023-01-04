import { pipelineService } from './facebook.service';
import { ACCOUNTS, accountService, taskService } from './account.service';
import { CAMPAIGN_INSIGHTS } from './pipeline.const';

describe('Pipeline Service', () => {
    it.concurrent.each(Object.values(ACCOUNTS).flat())(
        'account %p',
        async (accountId) => {
            console.log(accountId);
            return pipelineService(
                {
                    accountId: String(accountId),
                    start: '2022-12-01',
                    end: '2023-01-01',
                },
                CAMPAIGN_INSIGHTS,
            )
                .then((res) => {
                    expect(res).toBeTruthy();
                })
                .catch((err) => {
                    console.error({ accountId });
                });
        },
        60_000,
    );
});

it('Account Service', async () => {
    return accountService().then((rows) => expect(rows).toBeTruthy());
});

it('Task Service', async () => {
    return taskService({
        pipeline: 'CAMPAIGN_INSIGHTS',
        start: '2022-01-01',
        end: '2022-02-01',
    }).then((num) => expect(num).toBeGreaterThan(0));
});
