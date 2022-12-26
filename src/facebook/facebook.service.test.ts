import { pipelineService } from './facebook.service';
import { ACCOUNTS, accountService } from './account.service';
import { CAMPAIGN_INSIGHTS } from './pipeline.const';

describe('Pipeline Service', () => {
    it.each(Object.values(ACCOUNTS).flat())(
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
            ).then((res) => {
                expect(res).toBeTruthy();
            });
        },
        120_000,
    );
});

it('Account Service', async () => {
    return accountService().then((rows) => expect(rows).toBeTruthy());
});
