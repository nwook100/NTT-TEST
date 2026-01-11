
import React from 'react';
import { FeatureItem } from '../types';

const FeatureRow: React.FC<FeatureItem> = ({ id, title, description }) => {
  return (
    <div className="group border-b border-white/5 py-12 transition-all hover:bg-white/[0.02] px-4 cursor-default">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
        <div className="md:col-span-1 text-zinc-500 font-mono text-lg group-hover:text-[#ff6b35]">
          {id}
        </div>
        <div className="md:col-span-5">
          <h4 className="text-3xl font-bold group-hover:translate-x-2 transition-transform duration-300">
            {title}
          </h4>
        </div>
        <div className="md:col-span-6">
          <p className="text-zinc-400 text-lg leading-relaxed group-hover:text-zinc-200 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureRow;
