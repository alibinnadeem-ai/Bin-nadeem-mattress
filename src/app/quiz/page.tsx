import React from 'react';
import AIAgentContainer from '@/components/AI/AIAgentContainer';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-8">
      <AIAgentContainer enabled={true} />
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-master-navy mb-8">Sleep Prescription Quiz</h1>
        <p className="text-xl text-gray-600 mb-12">
          Answer 5 quick questions to get your personalized mattress recommendation.
        </p>
        
        <div className="bg-gray-50 p-8 rounded-lg shadow-inner text-left">
          <h2 className="text-xl font-semibold mb-4">Question 1 of 5</h2>
          <p className="mb-6 text-lg">What is your primary sleeping position?</p>
          
          <div className="space-y-4">
            {['Side', 'Back', 'Stomach', 'Combination'].map((opt) => (
              <button key={opt} className="w-full text-left p-4 bg-white border rounded hover:border-master-blue hover:bg-blue-50 transition">
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
