
export interface DistributionEntry {
  name: string;
  percent: number;
  amount?: number;
}

export interface PolicyType {
  COMMISSION_RATE: number;
  BASE_DISTRIBUTION: DistributionEntry[];
}

export interface TransactionDistribution {
  commission: number;
  totalDistributed: number;
  distribution: DistributionEntry[];
}

export interface TransactionLog {
  id: number;
  source: string;
  amount: number;
  commission: number;
  totalDistributed: number;
  distribution: DistributionEntry[];
  timestamp: string;
   raisedByChapter: boolean;
}

// 🧮 Policy Configuration
export const POLICY: PolicyType = {
  COMMISSION_RATE: 5, // 5% deducted first
  BASE_DISTRIBUTION: [
    { name: "NESA HQ", percent: 65 },
    { name: "SCEF", percent: 5 },
    { name: "EduAid", percent: 5 },
    { name: "Local Chapters", percent: 5 },
    { name: "Referral Bonuses", percent: 5 },
    { name: "CVO Discretionary Fund", percent: 5 },
  ],
}as const;

// 🔢 Main Calculation Logic
export function calculateDistribution(
  amount: number,
  raisedByChapter: boolean = false
): TransactionDistribution {
  const commission = (POLICY.COMMISSION_RATE / 100) * amount;
  const netAmount = amount - commission;

  // Adjust Local Chapter share
  const updatedPolicy = POLICY.BASE_DISTRIBUTION.map((entry) =>
    entry.name === "Local Chapters"
      ? { ...entry, percent: raisedByChapter ? 20 : 5 }
      : entry
  );

  // Normalize total percent (some entries might change dynamically)
  const totalPercent = updatedPolicy.reduce((sum, e) => sum + e.percent, 0);

  const distribution: DistributionEntry[] = updatedPolicy.map((entry) => ({
    name: entry.name,
    amount: parseFloat(((entry.percent / totalPercent) * netAmount).toFixed(2)),
    percent: parseFloat(entry.percent.toFixed(2)),
  }));

  return {
    commission: parseFloat(commission.toFixed(2)),
    totalDistributed: parseFloat(netAmount.toFixed(2)),
    distribution,
  };
}

// 🧾 Transaction Log Generator
export function generateTransactionLog(
  source: string,
  amount: number,
  raisedByChapter: boolean = false
): TransactionLog {
  const { commission, totalDistributed, distribution } = calculateDistribution(
    amount,
    raisedByChapter
  );

  return {
    id: crypto.randomUUID(),
    source,
    amount,
    commission,
    totalDistributed,
    distribution,
    timestamp: new Date().toISOString(),
    raisedByChapter,
  };
}
