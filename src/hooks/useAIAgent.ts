import { useEffect, useRef } from 'react';
import { initializeAgent, trackAIEvent } from '@/lib/ai-agent';

/**
 * CUSTOM HOOK: useAIAgent
 * Manages the lifecycle of the AI agent script and initialization
 */

interface UseAIAgentProps {
  agentId: string;
  contextId?: string;
  customGreeting?: string;
  autoOpen?: boolean;
  enabled?: boolean;
}

export const useAIAgent = ({
  agentId,
  contextId,
  customGreeting,
  autoOpen = false,
  enabled = true
}: UseAIAgentProps) => {
  const initialized = useRef(false);

  useEffect(() => {
    // Skip if disabled or already initialized
    if (!enabled || initialized.current) return;

    // Initialize agent
    const init = async () => {
      try {
        await initializeAgent({
          agentId,
          contextId,
          customGreeting,
          autoOpen
        });
        
        initialized.current = true;
        trackAIEvent('agent_hook_initialized', { autoOpen });
        
      } catch (error) {
        console.error('Failed to initialize AI agent hook:', error);
      }
    };

    init();

    // Cleanup not typically needed for script injection, 
    // but good practice to track unmounts if needed
    return () => {
      // Cleanup logic if agent supports destroy()
    };
  }, [agentId, contextId, customGreeting, autoOpen, enabled]);

  return {
    isInitialized: initialized.current
  };
};
