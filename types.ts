
export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface PlanItem {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isHighlighted?: boolean;
}

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}
