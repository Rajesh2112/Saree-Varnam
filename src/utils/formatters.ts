import { CURRENCY_RATES } from '../data/sareesData';
import { Currency } from '../types';

export function formatPrice(inrAmount: number, currency: Currency = 'INR'): string {
  const config = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
  const converted = inrAmount * config.rate;

  if (currency === 'INR') {
    return `₹${inrAmount.toLocaleString('en-IN')}`;
  }

  return `${config.symbol}${Math.round(converted).toLocaleString('en-US')}`;
}

export function calculateDiscount(originalPrice: number, price: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
