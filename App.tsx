
import React from 'react';
import { 
  NAV_ITEMS, 
  STATS, 
  FEATURES, 
  ARTICLES 
} from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import Section from './components/Section';
import FeatureRow from './components/FeatureRow';
import StatCard from './components/StatCard';
import ArticleCard from './components/ArticleCard';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div id="home" className="min-h-screen bg-[#050505] text-white">
      <Header />
      
      <main>
        {/* Hero Section with Spline */}
        <Hero />

        {/* Stats Summary */}
        <section className="py-20 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {STATS.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </section>

        {/* Services/Strengths Section */}
        <Section id="features" title="Our Strengths" subtitle="PUBG Kakao Battleground This is the NTT Clan, where there are some really cool people.">
          <div className="space-y-1">
            {FEATURES.map((feature) => (
              <FeatureRow key={feature.id} {...feature} />
            ))}
          </div>
        </Section>

        {/* Articles Section */}
        <Section id="community" title="Clan Updates" subtitle="">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </Section>

        {/* FAQ Section */}
        <Section id="faq" title="자주 묻는 질문">
          <FAQ />
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
