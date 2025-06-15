export type Tier = 'FREE' | 'BASIC' | 'PREMIUM' | 'ENTERPRISE';

export interface Benefit {
  id: string;
  name: string;
  description: string;
}

export interface Plan {
  id: string;
  tier: Tier;
  period: 'SEMESTRAL' | 'ANNUAL';
  price: number;
  commissionPercentage: number;
  description: string;
  benefits: Benefit[];
  createdAt: Date;
  updatedAt: Date;
}
