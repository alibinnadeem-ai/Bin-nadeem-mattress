'use client';

import React from 'react';
import { useAIAgent } from '@/hooks/useAIAgent';
import { getContextualGreeting } from '@/lib/ai-agent';
import { usePathname } from 'next/navigation';

/**
 * AI AGENT CONTAINER COMPONENT
 * Handles initialization and rendering of JotForm AI Agent
 */

interface Props {
  enabled?: boolean;
}

const AIAgentContainer: React.FC<Props> = ({ enabled = true }) => {
  const pathname = usePathname();
  
  // Get greeting based on current page
  const pageKey = pathname?.split('/')[1] || 'home';
  const greeting = getContextualGreeting(pageKey);

  // Initialize agent hook
  useAIAgent({
    agentId: process.env.NEXT_PUBLIC_JOTFORM_AGENT_ID || '019b8571bf0f7a51beb30033c800476847b5',
    contextId: process.env.NEXT_PUBLIC_JOTFORM_CONTEXT_ID,
    customGreeting: greeting,
    autoOpen: false, // Don't auto-open to be less intrusive
    enabled
  });

  if (!enabled) return null;

  return (
    <div 
      id="jf-agent-container" 
      className="fixed bottom-4 right-4 z-50 print:hidden"
      aria-label="AI Sleep Advisor"
    />
  );
};

export default AIAgentContainer;
