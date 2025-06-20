"use client";

import { useState, useRef } from 'react';

type TooltipHookResult = {
  showTooltip: boolean;
  tooltipHandlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
};

/**
 * Custom hook for handling tooltip display with delay
 * @param delayMs - Delay in milliseconds before showing the tooltip (default: 1000ms)
 * @returns Object containing tooltip state and event handlers
 */
export const useTooltip = (delayMs = 1000): TooltipHookResult => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const tooltipTimerRef = useRef<NodeJS.Timeout | null>(null);

  const tooltipHandlers = {
    onMouseEnter: () => {
      tooltipTimerRef.current = setTimeout(() => {
        setShowTooltip(true);
      }, delayMs);
    },
    onMouseLeave: () => {
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current);
        tooltipTimerRef.current = null;
      }
      setShowTooltip(false);
    },
  };

  return { showTooltip, tooltipHandlers };
};
