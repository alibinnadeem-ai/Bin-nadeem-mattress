'use client';

import React from 'react';
import { openAgentChat, trackAIEvent } from '@/lib/ai-agent';

/**
 * AI ADVISOR CALL-TO-ACTION BUTTON
 * Consistent entry point for AI chat across the site
 */

interface Props {
  variant?: 'primary' | 'secondary' | 'minimal';
  text?: string;
  page?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export const AIAdvisorCTA: React.FC<Props> = ({
  variant = 'primary',
  text = 'Chat with Sleep Advisor',
  page = 'unknown',
  size = 'md',
  fullWidth = false,
  className = ''
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-master-blue text-white hover:bg-master-navy focus:ring-master-blue shadow-md hover:shadow-lg",
    secondary: "bg-white border-2 border-master-blue text-master-blue hover:bg-blue-50 focus:ring-master-blue",
    minimal: "bg-transparent text-master-blue hover:text-master-navy underline p-0 hover:bg-transparent shadow-none"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const handleClick = () => {
    trackAIEvent('cta_clicked', {
      variant,
      page,
      text
    });
    
    // Open agent with context
    openAgentChat({
      source_page: page,
      cta_text: text
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${variant !== 'minimal' ? sizes[size] : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      <span className="mr-2 text-lg">💬</span>
      {text}
    </button>
  );
};
