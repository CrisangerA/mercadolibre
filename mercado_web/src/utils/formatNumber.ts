export const fCurrency = (value: number) => {  
  return new Intl.NumberFormat('es-CO', {
    currency: 'COP',
    style: 'currency',
    minimumFractionDigits: 0
  }).format(value);
}
