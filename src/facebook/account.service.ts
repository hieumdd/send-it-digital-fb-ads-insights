import { getClient } from './api.service';

type ListAccountsResponse = { data: { account_id: string; id: string; name: string }[] };

export const getAccounts = async (businessId: string) => {
    const client = await getClient();

    return Promise.all(
        ['client_ad_accounts', 'owned_ad_accounts'].map(async (edge) => {
            return client
                .request<ListAccountsResponse>({
                    method: 'GET',
                    params: { fields: 'name,account_id', limit: 500 },
                    url: `/${businessId}/${edge}`,
                })
                .then((response) => {
                    return response.data.data.map((row) => ({
                        account_id: row.account_id,
                        account_name: row.name,
                    }));
                });
        }),
    ).then((accountGroups) => accountGroups.flat());
};
