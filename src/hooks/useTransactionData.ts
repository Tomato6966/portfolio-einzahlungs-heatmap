import Papa from "papaparse";
import { useCallback, useState } from "react";

import { parseEuro } from "../utils/Heatmap";

import type { Einzahlung, JahresEinzahlungen, TransactionData } from "../Types/Heatmap";

export const useTransactionData = () => {
    const [daten, setDaten] = useState<JahresEinzahlungen>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            setDaten({});
            return;
        }

        setIsLoading(true);
        setError(null);
        const aggregatedData: JahresEinzahlungen = {};
        let filesProcessed = 0;
        const totalFiles = files.length;

        const processFile = (file: File) => {
            Papa.parse<TransactionData>(file, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    const einzahlungen: Einzahlung[] = result.data
                        .filter((row) => (row?.Buchungstag || row?.Datum) && (row?.Betrag || row.Wert))
                        .map((row) => ({
                            datum: new Date(row?.Buchungstag || row?.Datum),
                            betrag: parseEuro(row?.Betrag || row.Wert),
                            steuer: parseEuro(row.Steuern || '0,00'),
                            gebühren: parseEuro(row.Gebühren || '0,00'),
                        }));

                    einzahlungen.forEach(({ datum, betrag, steuer, gebühren }) => {
                        const jahr = datum.getFullYear();
                        const monat = datum.getMonth();

                        if (!aggregatedData[jahr]) aggregatedData[jahr] = {};
                        if (!aggregatedData[jahr][monat]) {
                            aggregatedData[jahr][monat] = { betrag: 0, steuer: 0, gebühren: 0 };
                        }

                        aggregatedData[jahr][monat].betrag += betrag;
                        aggregatedData[jahr][monat].steuer += steuer;
                        aggregatedData[jahr][monat].gebühren += gebühren;
                    });

                    filesProcessed++;
                    if (filesProcessed === totalFiles) {
                        setDaten(aggregatedData);
                        setIsLoading(false);
                    }
                },
                error: (err) => {
                    console.error("Error parsing CSV:", err);
                    setError(`Error parsing file: ${err.message}`);
                    filesProcessed++;
                    if (filesProcessed === totalFiles) {
                        setIsLoading(false);
                    }
                }
            });
        };

        Array.from(files).forEach(processFile);
    }, []);

    return { daten, isLoading, error, handleFileUpload };
};
