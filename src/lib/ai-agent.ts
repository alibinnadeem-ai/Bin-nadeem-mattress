/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * AI AGENT INTEGRATION LIBRARY
 * JotForm AI Sleep Advisor Integration
 * 
 * Features:
 * - Picture-in-Picture support
 * - Message handling
 * - Context passing
 * - Error handling
 * - Analytics tracking
 * 
 * Total Lines: 300+ (production-ready)
 */

// Constants
const JF_AGENT_CACHE_NAME = 'jotform-agent-v1';
const JF_AGENT_SCRIPT_URL = 'https://www.jotform.com/s/umd/f871828fd7d/for-embedded-agent.js'; 

// Types
interface AgentConfig {
  agentId: string;
  contextId?: string;
  customGreeting?: string;
  autoOpen?: boolean;
}

interface PIPDimensions {
  width: number;
  height: number;
}

// Initialize Agent
export const initializeAgent = async (config: AgentConfig): Promise<void> => {
  try {
    // Check if script already loaded
    if ((window as any).JF?.Agent) {
      console.log('JotForm Agent already loaded');
      return;
    }

    // Load script
    const script = document.createElement('script');
    script.src = JF_AGENT_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      setupAgent(config);
    };
    script.onerror = () => {
      console.error('Failed to load JotForm Agent script');
    };

    document.body.appendChild(script);
  } catch (error) {
    console.error('Error initializing AI agent:', error);
  }
};

// Setup Agent Configuration
const setupAgent = (config: AgentConfig) => {
  try {
    if (!(window as any).JF?.Agent) {
      console.warn('JotForm Agent not available');
      return;
    }

    const Agent = (window as any).JF.Agent;

    // Configure agent
    Agent.setAgentId(config.agentId);

    if (config.contextId) {
      Agent.setContextId(config.contextId);
    }

    if (config.customGreeting) {
      Agent.setGreeting(config.customGreeting);
    }

    // Setup event listeners
    setupEventListeners();

    // Auto-open if specified
    if (config.autoOpen) {
      setTimeout(() => {
        Agent.open();
      }, 1000);
    }

    console.log('AI Agent initialized successfully');
  } catch (error) {
    console.error('Error setting up AI agent:', error);
  }
};

// Event Listeners
const setupEventListeners = () => {
  // Picture-in-Picture requests
  if (typeof window !== 'undefined') {
    window.addEventListener('message', handlePictureInPictureRequest);
  }
};

// Handle Picture-in-Picture Requests
const handlePictureInPictureRequest = async (event: MessageEvent): Promise<void> => {
  if (event.data.type !== 'jf-request-pip-window') {
    return;
  }

  try {
    // Check if Document Picture-in-Picture API is available
    if (!('documentPictureInPicture' in window)) {
      console.warn('Document Picture-in-Picture API not supported');
      return;
    }

    // Get dimensions
    const width = parseInt(event.data._width) || 400;
    const height = parseInt(event.data._height) || 600;

    // Return early if already in PIP mode
    if ((window as any).documentPictureInPicture?.window) {
      console.info('Already in Picture-in-Picture mode');
      return;
    }

    // Open Picture-in-Picture window
    const pipWindow = await (window as any).documentPictureInPicture.requestWindow({
      width,
      height
    });

    // Style the PIP window
    const style = document.createElement('style');
    style.textContent = `
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: white;
      }
      #jf-agent-pip {
        width: 100%;
        height: 100%;
      }
    `;
    pipWindow.document.head.appendChild(style);

    // Create container
    const container = pipWindow.document.createElement('div');
    container.id = 'jf-agent-pip';
    pipWindow.document.body.appendChild(container);

    // Copy styles
    copyStylistsToWindow(pipWindow);

    // Notify agent of PIP window ready
    if (event.source && 'postMessage' in event.source) {
      (event.source as Window).postMessage(
        {
          type: 'jf-pip-window-ready',
          success: true,
          windowHandle: pipWindow
        },
        event.origin
      );
    }

    // Handle PIP window close
    pipWindow.addEventListener('unload', () => {
      console.log('Picture-in-Picture window closed');
    });
  } catch (error) {
    console.error('Error opening Picture-in-Picture:', error);
    if (event.source && 'postMessage' in event.source) {
      (event.source as Window).postMessage(
        {
          type: 'jf-pip-window-error',
          error: error instanceof Error ? error.message : 'Unknown error'
        },
        event.origin
      );
    }
  }
};

// Copy Styles to PIP Window
const copyStylistsToWindow = (pipWindow: Window) => {
  try {
    // Copy stylesheets
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link: any) => {
      const newLink = document.createElement('link');
      newLink.rel = 'stylesheet';
      newLink.href = link.href;
      pipWindow.document.head.appendChild(newLink);
    });

    // Copy style tags
    document.querySelectorAll('style').forEach((style) => {
      const newStyle = pipWindow.document.createElement('style');
      newStyle.textContent = style.textContent;
      pipWindow.document.head.appendChild(newStyle);
    });
  } catch (error) {
    console.warn('Could not copy styles to PIP window:', error);
  }
};

// Get Contextual Greeting by Page
export const getContextualGreeting = (page: string): string => {
  const greetings: { [key: string]: string } = {
    home: 'Hi! 👋 Welcome to Master Mattresses. I\'m your sleep advisor. How can I help you find the perfect mattress?',
    shop: 'Welcome to our collection! 🛏️ Need help finding the right mattress? I\'m here to guide you.',
    'mattress-finder': 'Great! Let\'s find your perfect mattress. 😴 I can help answer any questions about your sleep needs.',
    warranty: 'Have questions about our warranty or care? 🛡️ I\'m here to help!',
    default: 'Hi! 👋 I\'m your sleep advisor. How can I help you today?'
  };

  return greetings[page] || greetings.default;
};

// Track Analytics
export const trackAIEvent = (event: string, data?: Record<string, any>) => {
  try {
    if ((window as any).gtag) {
      (window as any).gtag('event', event, {
        ...data,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.warn('Could not track event:', error);
  }
};

// Open Agent Chat
export const openAgentChat = (contextData?: Record<string, any>) => {
  try {
    const Agent = (window as any).JF?.Agent;
    if (Agent) {
      if (contextData) {
        // Pass context if available
        Object.entries(contextData).forEach(([key, value]) => {
          Agent.setCustomData(key, value);
        });
      }
      Agent.open();
      trackAIEvent('agent_opened');
    } else {
      console.warn('Agent not available');
    }
  } catch (error) {
    console.error('Error opening agent:', error);
  }
};

// Close Agent Chat
export const closeAgentChat = () => {
  try {
    const Agent = (window as any).JF?.Agent;
    if (Agent) {
      Agent.close();
      trackAIEvent('agent_closed');
    }
  } catch (error) {
    console.error('Error closing agent:', error);
  }
};

// Check if Agent is Open
export const isAgentOpen = (): boolean => {
  try {
    return (window as any).JF?.Agent?.isOpen() || false;
  } catch {
    return false;
  }
};

// Send Message to Agent
export const sendMessageToAgent = (message: string) => {
  try {
    const Agent = (window as any).JF?.Agent;
    if (Agent) {
      Agent.sendMessage(message);
      trackAIEvent('message_sent', { message_length: message.length });
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

// Declare global window extension
declare global {
  interface Window {
    JF: {
      Agent: any;
    };
    gtag: (command: string, ...args: any[]) => void;
  }
}

export default {
  initializeAgent,
  getContextualGreeting,
  trackAIEvent,
  openAgentChat,
  closeAgentChat,
  isAgentOpen,
  sendMessageToAgent
};
