export type HospitalCategory = "general" | "maternity" | "emergency" | "specialized";

export interface Hospital {
  id: number;
  name: string;
  category: HospitalCategory;
  address: string;
  isEmergency24h: boolean;
  contact?: string;
}
