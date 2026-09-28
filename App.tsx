
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

        {/* About Us Section */}
        <Section id="about" title="NTT 클랜 소개 (About NTT Clan)">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold leading-tight">
                We are a competitive-focused gaming organization 
                delivering powerful <span className="text-[#ff6b35]">clutch performances</span> 
                through thoughtful strategy and skilled execution.
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                2020년에 설립된 NTT는 PUBG 커뮤니티에서 빠르게 인지도를 높였습니다. 
                저희의 사명은 재능과 규율이 조화를 이루는 전문적인 환경을 조성하는 것입니다.
                함께 성장하고 경쟁하며 승리를 쟁취할 동료들을 기다립니다.
              </p>
              <div className="flex gap-4">
                <div className="h-1 w-20 bg-[#ff6b35]"></div>
                <div className="h-1 w-10 bg-zinc-800"></div>
                <div className="h-1 w-5 bg-zinc-800"></div>
              </div>
            </div>
            
            {/* Image Collage Side */}
            <div className="relative grid grid-cols-2 gap-4 h-[500px] items-center">
              <div className="relative z-10 group mt-[-40px]">
                <img 
                  src="https://cafeptthumb-phinf.pstatic.net/MjAyNjAxMTFfMTQg/MDAxNzY4MTAyNTk0NzEx.ouzBLHMwC9oTDr1PamwQ6o4U8zeprNViBUYya1OVUJgg.V7xWET6XfHMCKjG2PyHCuWlQAEKGx4rwQ4PaCQDTow4g.JPEG/unnamed_%2810%29.jpg?type=w1600" 
                  alt="NTT Activity"
                  className="rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 w-full aspect-[3/4] object-cover shadow-2xl border border-white/10"
                />
              </div>
              <div className="relative z-20 group mt-[40px]">
                <img 
                  src="https://cafeptthumb-phinf.pstatic.net/MjAyNjAxMTFfMjgz/MDAxNzY4MTAyNTk0NzA4.rBiEQaDSDQ7ATFoFTQNuLHmnT8w6bpekASUC150c6tcg.O4pBLfMJed9u1zGuQd1myo34eBgIW7CdBNxTmhmUc3Yg.JPEG/unnamed_%289%29.jpg?type=w1600" 
                  alt="NTT Players"
                  className="rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 w-full aspect-[3/4] object-cover shadow-2xl border border-white/10"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#ff6b35]/20 rounded-full blur-2xl -z-10 group-hover:bg-[#ff6b35]/40 transition-colors"></div>
              </div>
            </div>
          </div>
        </Section>

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
