import { getAccounts } from './account.service';

it('get-accounts', async () => {
    return getAccounts('211142348565945')
        .then((result) => {
            expect(result).toBeDefined();
        })
        .catch((error) => {
            console.error({ error });
            return Promise.reject(error);
        });
});
