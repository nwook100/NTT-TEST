
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

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  /** Optional external link (e.g. a cafe post). The card is only clickable when set. */
  href?: string;
}
