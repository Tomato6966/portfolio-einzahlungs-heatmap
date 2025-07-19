export const parseEuro = (wert: string): number =>
    parseFloat(wert.replace(".", "").replace(",", ".").replace("€", "").trim());

export const formatCurrency = (val: number): string =>
    val.toLocaleString('de-AT', { style: 'currency', currency: 'EUR' });

export const getColor = (betrag: number): string => {
    if (betrag > 3000) return '#167a1a'; // Darker Green
    if (betrag > 2000) return '#2aa02e'; // Medium Dark Green
    if (betrag > 1000) return '#4CAF50'; // Vibrant Green (original for >1000)
    if (betrag > 200) return '#81C784';  // Lighter Green (original for >0)
    if (betrag > 0) return '#A5D6A7';   // Pale Green (new category)
    return '#424242'; // Grey for zero/negative
};
