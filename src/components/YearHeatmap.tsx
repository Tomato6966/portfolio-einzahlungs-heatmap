import React from "react";

import { formatCurrency, getColor } from "../utils/Heatmap";

import type { MonatsSummen } from '../Types/Heatmap';

interface YearHeatmapProps {
    jahr: string;
    yearData: { [month: number]: MonatsSummen };
    isCollapsed: boolean;
    toggleCollapse: (year: string) => void;
    yearAverageBetrag: number;
}

const YearHeatmap: React.FC<YearHeatmapProps> = ({
    jahr,
    yearData,
    isCollapsed,
    toggleCollapse,
    yearAverageBetrag,
}) => {
    const monthDetails = React.useMemo(() => Array.from({ length: 12 }, (_, monat) => yearData[monat] ?? { betrag: 0, steuer: 0, gebühren: 0 }), [yearData]);

    return (
        <div className="jahr">
            <h2 onClick={() => toggleCollapse(jahr)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {jahr} Ø {formatCurrency(yearAverageBetrag)}
                <span>{isCollapsed ? '►' : '▼'}</span>
            </h2>
            {!isCollapsed && (
                <div className="monate">
                    {monthDetails.map((data, monat) => (
                        <div
                            key={monat}
                            className="zelle"
                            style={{ backgroundColor: getColor(data.betrag) }}
                        >
                            <span>
                                {new Date(2000, monat).toLocaleString("de-AT", {
                                    month: "short",
                                })}
                            </span>
                            <strong>{data.betrag ? formatCurrency(data.betrag) : "–"}</strong>
                            {data.gebühren > 0 && (
                                <small>Gebühren: {formatCurrency(data.gebühren)}</small>
                            )}
                            {data.steuer > 0 && (
                                <small>Steuern: {formatCurrency(data.steuer)}</small>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YearHeatmap;
