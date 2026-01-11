
import React from 'react';
import { PlanItem } from '../types';

const PlanCard: React.FC<PlanItem> = ({ name, price, period, description, features, isHighlighted }) => {
  return (
    <div className={`p-10 rounded-3xl border ${isHighlighted ? 'border-[#ff6b35] bg-white/[0.03]' : 'border-white/10 bg-black'} flex flex-col h-full hover:scale-[1.02] transition-transform`}>
      <h4 className="text-2xl font-bold mb-2">{name}</h4>
      <p className="text-zinc-400 text-sm mb-6 h-12 line-clamp-2">{description}</p>
      
      <div className="mb-8">
        <span className="text-4xl font-black">{price}</span>
        <span className="text-zinc-500 text-sm">{period}</span>
      </div>

      <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">What's Included</div>
      
      <ul className="space-y-4 mb-10 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
            <span className={`w-1.5 h-1.5 rounded-full ${isHighlighted ? 'bg-[#ff6b35]' : 'bg-zinc-700'}`}></span>
            {feature}
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 rounded-xl font-bold transition-all ${isHighlighted ? 'bg-[#ff6b35] text-white hover:bg-[#e85a20]' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
        Get Started
      </button>
    </div>
  );
};

export default PlanCard;
