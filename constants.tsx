
import { NavItem, StatItem, FeatureItem, PlanItem, ArticleItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: '처음', href: '#home' },
  { label: 'NTT 클랜 소개', href: '#about' },
  { label: 'Clan Updates', href: '#community' },
  { label: '자주 묻는 질문', href: '#faq' },
];

export const STATS: StatItem[] = [
  { value: 'Clan level 15', label: '' },
  { value: 'Clan 보급  S  class', label: '' },
  { value: '전문 Order 양성 및 운영 ', label: '' },
];

export const FEATURES: FeatureItem[] = [
  {
    id: '01.',
    title: 'Professional Coaching',
    description: '저희는 게임 실력을 향상시키고, 잠재력을 최대한 발휘하며, 승리를 극대화할 수 있도록 설계된 종합적인 지원 시스템을 제공합니다.',
  },
  {
    id: '02.',
    title: 'Strategic Scrims',
    description: '경쟁 수준 유지 및 팀워크 강화를 위해 매일 내부 및 외부 경쟁전 게임을 진행합니다.',
  },
  {
    id: '03.',
    title: 'Community',
    description: 'Discord and KakaoTalk.',
  },
  {
    id: '04.',
    title: 'Battleground Service',
    description: '일반 유저에게 즐거운 게임활동을 위한 동기부여 및 커뮤니티 가입권유.',
  },
];

export const ARTICLES: ArticleItem[] = [
  {
    id: '1',
    title: 'NTT 2대 마스터 LiveOctopus',
    category: '2대 마스터',
    date: '01, 2026',
    image: 'https://cafeptthumb-phinf.pstatic.net/MjAyNjAxMTFfMTEx/MDAxNzY4MDk4NzAwMDQw.q294RJb4WK4IsuGwEwHciCS4ESyTdAIBZw09uv-as4Yg.Ayt8FNOLk0aln7WeyJKD2xH2qaZGX5UCXF6b1I6DBRkg.JPEG/111.jpg?type=w1600',
  },
  {
    id: '2',
    title: 'NTT 1대 마스터 NTT_Cinderella ',
    category: '1대 마스터',
    date: '3, 2023',
    image: 'https://cafeptthumb-phinf.pstatic.net/MjAyNjAxMTFfMjQ3/MDAxNzY4MDk4NzAwMDM4.Ovu-5BuuItJtkvpTNErAmtE4sn1soXETuthT88Lf-2Yg.XmP3qRQUJ2hs4J2f-xAvSNa__c9iyFotpZdsdM3ee3Ug.JPEG/222.jpg?type=w1600',
  },
  {
    id: '3',
    title: 'NTT Clan was founded by 5 people. NTT 클랜은 5명의 사람들에 의해 설립되었습니다.',
    category: '창단',
    date: '3, 2023',
    image: 'https://cafeptthumb-phinf.pstatic.net/MjAyNjAxMTFfMTcx/MDAxNzY4MDk4NzAwMDM5.83x7uH3ZmF0-xeiJ5Whx6TTonalyKZu4kr3kp6OsTKMg.WQOcY7YvNjjAzJkbMen9rR9Gr4n6EI6iJsJGkvXhnCUg.JPEG/333.jpg?type=w1600',
  },
];