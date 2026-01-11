
import React from 'react';

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children }) => {
  return (
    <section id={id} className="py-24 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <h2 className="text-4xl md:text-6xl font-bold max-w-xl leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-zinc-400 max-w-sm text-lg">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
