import { pipelineService } from './facebook.service';
import { ACCOUNTS, accountService } from './account.service';
import { CAMPAIGN_INSIGHTS } from './pipeline.const';

const cases = [CAMPAIGN_INSIGHTS];

describe('Pipeline Service', () => {
    it.each(cases)('$name', async (pipeline) => {
        return Promise.all(
            Object.values(ACCOUNTS)
                .flat()
                .map(async (accountId) => {
                    return pipelineService(
                        {
                            accountId: String(accountId),
                            start: '2022-12-01',
                            end: '2023-01-01',
                        },
                        pipeline,
                    );
                }),
        ).then((ress) => {
            ress.forEach((res) => expect(res).toBeTruthy());
        });
    });
});

it('Account Service', async () => {
    return accountService().then((rows) => expect(rows).toBeTruthy());
});
