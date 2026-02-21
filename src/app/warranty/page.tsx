import React from 'react';
import AIAgentContainer from '@/components/AI/AIAgentContainer';

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-8">
      <AIAgentContainer enabled={true} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-master-navy mb-8">10-Year Warranty</h1>
        <p className="text-xl text-gray-600 mb-12">
          We stand behind our products with a comprehensive 10-year warranty.
        </p>
        
        <div className="prose max-w-none text-gray-700">
          <h3>What is covered?</h3>
          <ul className="list-disc pl-5 mb-8">
            <li>Manufacturing defects in materials and workmanship</li>
            <li>Sagging greater than 1.5 inches</li>
            <li>Coil failure or breakage</li>
          </ul>
          
          <h3>How to make a claim?</h3>
          <p>
            Contact our support team or use the AI Advisor to start your warranty claim process.
          </p>
        </div>
      </div>
    </div>
  );
}
