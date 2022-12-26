import Joi from 'joi';

import { InsightsOptions } from './facebook.repository';

export type Pipeline = {
    name: string;
    insightsOptions: InsightsOptions;
    validationSchema: Joi.Schema;
    schema: Record<string, any>[];
};

const actionBreakdownSchema = Joi.array()
    .items({ action_type: Joi.string(), value: Joi.number() })
    .optional();

export const CAMPAIGN_INSIGHTS: Pipeline = {
    name: 'CampaignInsights',
    insightsOptions: {
        level: 'campaign',
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
            'conversion_values',
            'conversions',
            'cost_per_action_type',
            'cost_per_conversion',
            'cost_per_unique_action_type',
            'unique_actions',
            'cost_per_unique_click',
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
            'unique_clicks',
            'unique_ctr',
            'unique_link_clicks_ctr',
        ],
    },
    validationSchema: Joi.object({
        date_start: Joi.string(),
        date_stop: Joi.string(),
        account_currency: Joi.string(),
        account_id: Joi.number().unsafe(),
        account_name: Joi.string(),
        campaign_id: Joi.number().unsafe(),
        campaign_name: Joi.string(),
        action_values: actionBreakdownSchema.optional(),
        actions: actionBreakdownSchema.optional(),
        conversion_values: actionBreakdownSchema.optional(),
        conversions: actionBreakdownSchema.optional(),
        cost_per_action_type: actionBreakdownSchema.optional(),
        cost_per_conversion: actionBreakdownSchema.optional(),
        cost_per_unique_action_type: actionBreakdownSchema.optional(),
        unique_actions: actionBreakdownSchema.optional(),
        clicks: Joi.number().optional(),
        cost_per_unique_click: Joi.number().optional(),
        cpc: Joi.number().optional(),
        cpm: Joi.number().optional(),
        ctr: Joi.number().optional(),
        frequency: Joi.number().optional(),
        impressions: Joi.number().optional(),
        inline_link_click_ctr: Joi.number().optional(),
        inline_link_clicks: Joi.number().optional(),
        reach: Joi.number().optional(),
        spend: Joi.number().optional(),
        unique_clicks: Joi.number().optional(),
        unique_ctr: Joi.number().optional(),
        unique_link_clicks_ctr: Joi.number().optional(),
    }),
    schema: [
        { name: 'date_start', type: 'DATE' },
        { name: 'date_stop', type: 'DATE' },
        { name: 'account_currency', type: 'STRING' },
        { name: 'account_id', type: 'NUMERIC' },
        { name: 'account_name', type: 'STRING' },
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
        {
            name: 'conversion_values',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'conversions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'cost_per_action_type',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'cost_per_conversion',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'cost_per_unique_action_type',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'unique_actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        { name: 'clicks', type: 'NUMERIC' },
        { name: 'cost_per_unique_click', type: 'NUMERIC' },
        { name: 'cpc', type: 'NUMERIC' },
        { name: 'cpm', type: 'NUMERIC' },
        { name: 'ctr', type: 'NUMERIC' },
        { name: 'frequency', type: 'NUMERIC' },
        { name: 'impressions', type: 'NUMERIC' },
        { name: 'inline_link_click_ctr', type: 'NUMERIC' },
        { name: 'inline_link_clicks', type: 'NUMERIC' },
        { name: 'reach', type: 'NUMERIC' },
        { name: 'spend', type: 'NUMERIC' },
        { name: 'unique_clicks', type: 'NUMERIC' },
        { name: 'unique_ctr', type: 'NUMERIC' },
        { name: 'unique_link_clicks_ctr', type: 'NUMERIC' },
    ],
};
