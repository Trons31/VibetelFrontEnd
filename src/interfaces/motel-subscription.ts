import { SubscriptionTier } from "./plans.interface";

export type SubscriptionPeriod = "MONTHLY" | "SEMESTRAL" | "ANNUAL";

export interface MotelSubscriptionApi {
  id: string;
  startDate: Date; // O Date, dependiendo de cómo manejes las fechas en el frontend
  endDate: Date; // O Date
  isActive: boolean;
  tier: SubscriptionTier;// O un enum si lo defines en el frontend
  period: SubscriptionPeriod // O un enum
  price: number;
  commissionPercentage: number;
  description: string;
  benefits: SubscriptionBenefit[];
}

export interface SubscriptionBenefit {
  id: string;
  name: string;
  description: string;
}