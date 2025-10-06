/**
 * Format currency for Albanian market
 * @param amount Amount in Albanian Lek (ALL)
 * @param options Formatting options
 */
export function formatCurrency(
  amount: number,
  options: {
    currency?: 'ALL' | 'EUR';
    showSymbol?: boolean;
    compact?: boolean;
  } = {}
): string {
  const { currency = 'ALL', showSymbol = true, compact = false } = options;

  if (currency === 'EUR') {
    // Convert from ALL to EUR (approximate rate: 1 EUR = 100 ALL)
    const eurAmount = amount / 100;
    
    if (compact && eurAmount >= 1000) {
      if (eurAmount >= 1000000) {
        return `${(eurAmount / 1000000).toFixed(1)}M €`;
      }
      return `${(eurAmount / 1000).toFixed(0)}K €`;
    }
    
    return new Intl.NumberFormat('sq-AL', {
      style: showSymbol ? 'currency' : 'decimal',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(eurAmount);
  }

  // Format as Albanian Lek
  if (compact && amount >= 1000000) {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}Mld L`;
    }
    return `${(amount / 1000000).toFixed(1)}M L`;
  }

  if (showSymbol) {
    return new Intl.NumberFormat('sq-AL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' L';
  }

  return new Intl.NumberFormat('sq-AL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Convert EUR to ALL (approximate conversion)
 */
export function eurToAll(eurAmount: number): number {
  return eurAmount * 100; // Approximate rate: 1 EUR = 100 ALL
}

/**
 * Convert ALL to EUR (approximate conversion)
 */
export function allToEur(allAmount: number): number {
  return allAmount / 100; // Approximate rate: 1 EUR = 100 ALL
}