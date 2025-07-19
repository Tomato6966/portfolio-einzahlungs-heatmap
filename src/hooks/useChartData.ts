import { useMemo } from "react";

import type { JahresEinzahlungen } from '../Types/Heatmap';

export const useChartData = (daten: JahresEinzahlungen, viewMode: "perYear" | "perMonth" | "allMonths") => {
    const monateLabels = useMemo(() => Array.from({ length: 12 }, (_, i) =>
        new Date(2000, i).toLocaleString('de-AT', { month: 'short' })
    ), []);

    const sortedYears = useMemo(() => Object.keys(daten).sort(), [daten]);

    const chartData = useMemo(() => {
        if (viewMode === 'perYear') {
            return {
                labels: monateLabels,
                datasets: sortedYears.map(jahr => ({
                    label: jahr,
                    data: monateLabels.map((_, monat) =>
                        daten[parseInt(jahr)]?.[monat]?.betrag ?? 0
                    ),
                    borderColor: `hsl(${(parseInt(jahr) * 53) % 360}, 70%, 50%)`, // Random color based on the year
                    backgroundColor: 'transparent',
                })),
            };
        } else if (viewMode === 'perMonth') {
            return {
                labels: monateLabels,
                datasets: [{
                    label: "Ø pro Monat über alle Jahre",
                    data: monateLabels.map((_, monat) => {
                        const werte = sortedYears.map(jahr => daten[parseInt(jahr)]?.[monat]?.betrag ?? 0);
                        const avg = werte.length > 0 ? werte.reduce((a, b) => a + b, 0) / werte.length : 0;
                        return avg;
                    }),
                    borderColor: '#007acc',
                    backgroundColor: 'transparent',
                }]
            };
        } else {
            const allMonthsLabels: string[] = [];
            const allMonthsData: number[] = [];

            sortedYears.forEach((jahr) => {
                for (let monat = 0; monat < 12; monat++) {
                    const monthShortName = new Date(parseInt(jahr), monat).toLocaleString(
                        "de-AT",
                        { month: "short" }
                    );
                    allMonthsLabels.push(`${jahr}-${monthShortName}`);
                    allMonthsData.push(daten[parseInt(jahr)]?.[monat]?.betrag ?? 0);
                }
            });

            return {
                labels: allMonthsLabels,
                datasets: [
                    {
                        label: "Alle monatlichen Einzahlungen",
                        data: allMonthsData,
                        borderColor: "#28a745",
                        backgroundColor: "transparent",
                        pointRadius: 3,
                        pointHoverRadius: 5,
                    },
                ],
            };
        }
    }, [daten, viewMode, monateLabels, sortedYears]);

    const chartTitle = useMemo(() => {
        if (viewMode === 'perYear') return 'Einzahlungen pro Monat & Jahr';
        if (viewMode === 'perMonth') return 'Ø Einzahlung pro Monat (alle Jahre)';
        return 'Alle monatlichen Einzahlungen chronologisch';
    }, [viewMode]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: chartTitle }
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: viewMode === 'allMonths' ? 20 : undefined,
                }
            }
        }
    }), [chartTitle, viewMode]);

    return { chartData, chartOptions, sortedYears };
};
