import Joi from 'joi';

import { InsightsConfig } from '../facebook/insights.service';

export type Pipeline = {
    name: string;
    insightsConfig: InsightsConfig;
    validationSchema: Joi.Schema;
    schema: Record<string, any>[];
};

const actionBreakdownSchema = Joi.array()
    .items({ action_type: Joi.string(), value: Joi.number() })
    .optional();
    
export const CAMPAIGN_HOURLY_INSIGHTS: Pipeline = {
    name: 'CampaignHourlyInsights',
    insightsConfig: {
        level: 'campaign',
        breakdowns: 'hourly_stats_aggregated_by_advertiser_time_zone',
        fields: [
            'date_start',
            'date_stop',
            'account_currency',
            'account_id',
            'account_name',
            'campaign_id',
            'campaign_name',
            'action_values',
            'actions',
            'clicks',
            'cpc',
            'cpm',
            'ctr',
            'frequency',
            'impressions',
            'inline_link_click_ctr',
            'inline_link_clicks',
            'reach',
            'spend',
        ],
    },
    validationSchema: Joi.object({
        date_start: Joi.string(),
        date_stop: Joi.string(),
        account_currency: Joi.string(),
        account_id: Joi.string(),
        account_name: Joi.string(),
        hourly_stats_aggregated_by_advertiser_time_zone: Joi.string(),
        campaign_id: Joi.string(),
        campaign_name: Joi.string(),
        action_values: actionBreakdownSchema.optional(),
        actions: actionBreakdownSchema.optional(),
        clicks: Joi.number().optional(),
        cpc: Joi.number().optional(),
        cpm: Joi.number().optional(),
        ctr: Joi.number().optional(),
        frequency: Joi.number().optional(),
        impressions: Joi.number().optional(),
        inline_link_click_ctr: Joi.number().optional(),
        inline_link_clicks: Joi.number().optional(),
        reach: Joi.number().optional(),
        spend: Joi.number().optional(),
    }),
    schema: [
        { name: 'date_start', type: 'DATE' },
        { name: 'date_stop', type: 'DATE' },
        { name: 'account_currency', type: 'STRING' },
        { name: 'account_id', type: 'NUMERIC' },
        { name: 'account_name', type: 'STRING' },
        { name: 'hourly_stats_aggregated_by_advertiser_time_zone', type: 'STRING' },
        { name: 'campaign_id', type: 'NUMERIC' },
        { name: 'campaign_name', type: 'STRING' },
        {
            name: 'action_values',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        { name: 'clicks', type: 'NUMERIC' },
        { name: 'cpc', type: 'NUMERIC' },
        { name: 'cpm', type: 'NUMERIC' },
        { name: 'ctr', type: 'NUMERIC' },
        { name: 'frequency', type: 'NUMERIC' },
        { name: 'impressions', type: 'NUMERIC' },
        { name: 'inline_link_click_ctr', type: 'NUMERIC' },
        { name: 'inline_link_clicks', type: 'NUMERIC' },
        { name: 'reach', type: 'NUMERIC' },
        { name: 'spend', type: 'NUMERIC' },
    ],
};
