import { pricingBadgesTitle } from '@/models/constants/badeges';
import { Pricing } from '@/models/types/website';

export const getPriceBadges = (pricing: Pricing) => {
  return pricingBadgesTitle[pricing];
};
