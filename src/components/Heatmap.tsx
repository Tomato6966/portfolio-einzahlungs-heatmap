import "./heatmap.css";

import { Chart, registerables } from "chart.js";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";

import { useLocale } from "../contexts/LocaleContext";
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

    const { locale, setLocale, t } = useLocale();

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
                <img src={`${import.meta.env.BASE_URL}portfolio-performance.png`} alt="Portfolio Performance Logo" />
                <h1>{t("appTitle")}</h1>
            </div>

            <div className="language-selector">
                <button
                    onClick={() => setLocale('de')}
                    className={locale === 'de' ? 'active-btn' : ''}
                >
                    🇩🇪
                </button>
                <button
                    onClick={() => setLocale('en')}
                    className={locale === 'en' ? 'active-btn' : ''}
                >
                    🇬🇧 / 🇺🇸
                </button>
            </div>
            <div className="credits">
                Made with ♥️ <a
                    href="https://github.com/Tomato6966/portfolio-einzahlungs-heatmap/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                >
                    ({t("githubRepoLinkText")})
                </a>
            </div>


            <div className="how-to-info">
                <i dangerouslySetInnerHTML={{ __html: `<b>${t("howToGetCsv")}</b>` }}></i>
                <i>{t("clientSideInfo")}</i>

                <label htmlFor="file-upload" className="custom-file-upload">
                    {t("chooseFiles")}
                </label>
                <input id="file-upload" type="file" accept=".csv" onChange={handleFileUpload} multiple />
            </div>

            {isLoading && <p style={{ textAlign: 'center', color: '#007bff' }}>{t("processingFiles")}</p>}
            {error && <p style={{ textAlign: 'center', color: '#ff4d4d' }}>{t("errorOccurred")} {error}</p>}

            {allBeträge.length > 0 && (
                <>
                    <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
                        {t("totalAverage")}: {formatCurrency(totalAverage)}
                    </h2>
                    <div className="button-group">
                        <button
                            onClick={() => setViewMode("perYear")}
                            className={viewMode === "perYear" ? "active-btn" : ""}
                        >
                            {t("perYear")}
                        </button>
                        <button
                            onClick={() => setViewMode("perMonth")}
                            className={viewMode === "perMonth" ? "active-btn" : ""}
                        >
                            {t("perMonth")}
                        </button>
                        <button
                            onClick={() => setViewMode("allMonths")}
                            className={viewMode === "allMonths" ? "active-btn" : ""}
                        >
                            {t("allMonths")}
                        </button>
                    </div>
                    <div className="chart-wrapper">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                    <div className="button-group" style={{ marginTop: '10px' }}>
                        <button onClick={() => toggleAllYears(true)}>{t("collapseAllYears")}</button>
                        <button onClick={() => toggleAllYears(false)}>{t("expandAllYears")}</button>
                    </div>
                </>
            )}

            {sortedYears.map((jahr) => {
                const yearData = daten[parseInt(jahr)] || {};

                const yearTotalBetrag = Object.values(yearData).reduce((sum, data) => sum + data.betrag, 0);
                const monthsInYearData = Object.keys(yearData).length;
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
