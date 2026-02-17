/** Format a number as Hungarian Forint, e.g. 3300 → "3 300 Ft" */
export function formatHuf(amount: number): string {
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
  return formatted + ' Ft'
}
