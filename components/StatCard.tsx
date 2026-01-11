
import React from 'react';
import { StatItem } from '../types';

const StatCard: React.FC<StatItem> = ({ value, label }) => {
  return (
    <div className="p-8">
      <div className="text-6xl md:text-7xl font-black mb-2">{value}</div>
      <div className="text-zinc-500 text-lg uppercase tracking-widest">{label}</div>
    </div>
  );
};

export default StatCard;
