import { load } from '../bigquery/bigquery.service';
import { createTasks } from '../task/cloud-tasks.service';

export const ACCOUNTS = {
    JLGroup: [
        416993897295187, 422066470100479, 648502823155363, 1258078711691446, 643063843913629,
        876025106713453, 624023195950543, 633341670989297, 904060087155756, 934950914089549,
        349570086863179, 540837370556578,
    ],
    MuscleCarJones: [
        1064471510891137, 883796449276568, 4722720184445228, 1027298821176435, 907326030096105,
    ],
    SendItDigital: [
        653217049297801, 465065705554396, 630911871926901, 1736924576692419, 816024992903492,
        774071530278666, 617226029420645, 660417055265920, 391149609679355, 453244979893497,
        993547414623170, 398807984914113, 2755119634784299, 300056358866221, 269483125374955,
        494111905590939, 3125258524423679, 487537913097761, 514792223504122, 902531113776569,
        197235202620821, 2844607015831501, 307470751255519, 1516967425341866, 261648942696186,
        1158214444709651, 1233180433826874, 279590747240576, 1123422391745929, 679646459946876,
        861300364573180, 392314148981685, 4957263227623112, 2945837019015078, 123005286,
        1497617930434557,
    ],
};

export const accountService = () => {
    const data = Object.entries(ACCOUNTS).flatMap(([businessName, accountIds]) =>
        accountIds.map((accountId) => ({
            business_name: businessName,
            account_id: accountId,
        })),
    );
    const schema = [
        { name: 'account_id', type: 'NUMERIC' },
        { name: 'business_name', type: 'STRING' },
    ];

    return load(data, { table: 'Accounts', schema });
};

export type TaskOptions = {
    start?: string;
    end?: string;
};

export const taskService = ({ start, end }: TaskOptions) => {
    const data = Object.values(ACCOUNTS)
        .flat()
        .map((accountId) => ({ accountId: String(accountId), start, end }));

    return createTasks(data, (task) => task.accountId);
};
