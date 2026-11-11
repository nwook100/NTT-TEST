import React from 'react';
import { ArticleItem } from '../types';

const ArticleCard: React.FC<ArticleItem> = ({ title, category, date, image, href }) => {
  const content = (
    <>
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        {href && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
              <span className="text-xs font-bold">VIEW</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-tighter text-zinc-500 mb-3">
        <span>{date}</span>
        <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
        <span className="text-[#ff6b35]">{category}</span>
      </div>
      <h4 className="text-xl font-bold leading-snug group-hover:text-[#ff6b35] transition-colors">
        {title}
      </h4>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
        {content}
      </a>
    );
  }

  return <article className="group">{content}</article>;
};

export default ArticleCard;
