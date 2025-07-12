import { Pricing, Usage } from '../types/website';

export const pricingBadgesTitle: Record<Pricing, string> = {
  free: 'Free',
  trial: 'Trial',
  credits: 'Credits',
  cost: 'Cost',
  paying: 'Paying',
};

export const pricingBadgesArray = Object.keys(pricingBadgesTitle);

export const usageBadgesTitle: Record<Usage, string> = {
  new: 'New',
  often: 'Often used',
  recommend: 'Recommend',
  not_in_use: 'Not in use'
};

export const usageBadgesArray = Object.keys(usageBadgesTitle);