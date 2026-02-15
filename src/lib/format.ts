/** Format a number as Hungarian Forint, e.g. 3300 → "3 300 Ft" */
export function formatHuf(amount: number): string {
  return amount.toLocaleString('hu-HU') + ' Ft'
}
