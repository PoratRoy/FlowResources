import { Pricing, Usage } from '../types/website';

export const pricingBadgesTitle: Record<Pricing, string> = {
  free: 'Free',
  cost: 'Cost',
  trial: 'With Trial',
  credits: 'Credits',
};

export const pricingBadgesArray = Object.keys(pricingBadgesTitle);

export const usageBadgesTitle: Record<Usage, string> = {
  new: 'New',
  often: 'Often used',
  recommend: 'Recommend',
  not_in_use: 'Not in use'
};

export const usageBadgesArray = Object.keys(usageBadgesTitle);