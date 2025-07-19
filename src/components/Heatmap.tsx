import "./heatmap.css";

import { Chart, registerables } from "chart.js";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";

import { useChartData } from "../hooks/useChartData";
import { useTransactionData } from "../hooks/useTransactionData";
import { formatCurrency } from "../utils/Heatmap";
import YearHeatmap from "./YearHeatmap";

Chart.register(...registerables);

const Heatmap: React.FC = () => {
    const { daten, isLoading, error, handleFileUpload } = useTransactionData();
    const [viewMode, setViewMode] = useState<"perYear" | "perMonth" | "allMonths">("perYear");
    const [collapsedYears, setCollapsedYears] = useState<Set<string>>(new Set());

    const { chartData, chartOptions, sortedYears } = useChartData(daten, viewMode);

    const allBeträge = React.useMemo(() => Object.values(daten).flatMap(monats => Object.values(monats).map(summen => summen.betrag)), [daten]);
    const totalAverage = React.useMemo(() => allBeträge.length > 0 ? allBeträge.reduce((a, b) => a + b, 0) / allBeträge.length : 0, [allBeträge]);

    const toggleYearCollapse = (year: string) => {
        setCollapsedYears(prev => {
            const newSet = new Set(prev);
            if (newSet.has(year)) newSet.delete(year);
            else newSet.add(year);
            return newSet;
        });
    };

    const toggleAllYears = (collapse: boolean) => setCollapsedYears(collapse ? new Set(sortedYears) : new Set());

    React.useEffect(() => {
        if (!isLoading && Object.keys(daten).length > 0) {
            setCollapsedYears(new Set());
        }
    }, [isLoading, daten]);


    return (
        <div className="container">
            <div className="title">
                <img src="/portfolio-performance.png" />
                <h1>Portfolio Einzahlungs-Heatmap</h1>
            </div>
            <div className="how-to-info">
                <i><b>Wie bekomme ich die CSV?</b> <br />Portfolio-Performance → Datei → Exportieren → CSV-Dateien → Depotumsätze/Kontoumsätze</i>

                <input type="file" accept=".csv" onChange={handleFileUpload} multiple />
            </div>

            {isLoading && <p style={{textAlign: 'center', color: '#007bff'}}>Dateien werden verarbeitet...</p>}
            {error && <p style={{textAlign: 'center', color: '#ff4d4d'}}>Fehler: {error}</p>}

            {allBeträge.length > 0 && (
                <>
                    <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
                        Gesamt-Ø: {formatCurrency(totalAverage)}
                    </h2>
                    <div className="button-group">
                        <button
                            onClick={() => setViewMode("perYear")}
                            className={viewMode === "perYear" ? "active-btn" : ""}
                        >
                            Pro Jahr
                        </button>
                        <button
                            onClick={() => setViewMode("perMonth")}
                            className={viewMode === "perMonth" ? "active-btn" : ""}
                        >
                            Pro Monat
                        </button>
                        <button
                            onClick={() => setViewMode("allMonths")}
                            className={viewMode === "allMonths" ? "active-btn" : ""}
                        >
                            Alle Monate
                        </button>
                    </div>
                    <div className="chart-wrapper">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                    <div className="button-group" style={{ marginTop: '10px' }}>
                        <button onClick={() => toggleAllYears(true)}>Alle Jahre einklappen</button>
                        <button onClick={() => toggleAllYears(false)}>Alle Jahre ausklappen</button>
                    </div>
                </>
            )}

            {sortedYears.map((jahr) => {
                const yearData = daten[parseInt(jahr)] || {};

                const yearTotalBetrag = Object.values(yearData).reduce((sum, data) => sum + data.betrag, 0);
                const monthsInYearData = Object.keys(yearData).length; // Actual months with data
                const yearAverageBetrag = monthsInYearData > 0 ? yearTotalBetrag / monthsInYearData : 0;

                const isCollapsed = collapsedYears.has(jahr);

                return (
                    <YearHeatmap
                        key={jahr}
                        jahr={jahr}
                        yearData={yearData}
                        isCollapsed={isCollapsed}
                        toggleCollapse={toggleYearCollapse}
                        yearAverageBetrag={yearAverageBetrag}
                    />
                );
            })}
        </div>
    );
};

export default Heatmap;
