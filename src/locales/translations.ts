
export interface Translations {
    [key: string]: {
        en: string;
        de: string;
    };
}

export const translations: Translations = {
    "appTitle": {
        en: "Portfolio Deposit Heatmap",
        de: "Portfolio Einzahlungs-Heatmap",
    },
    "howToGetCsv": {
        en: "How to get CSV? <br />Portfolio-Performance → File → Export → CSV Files → Account Transactions/Securities Account Transactions",
        de: "Wie bekomme ich die CSV? <br />Portfolio-Performance → Datei → Exportieren → CSV-Dateien → Depotumsätze/Kontoumsätze",
    },
    "clientSideInfo": {
        en: "Deposit data is used only client-side in the browser.",
        de: "Die Depot-Daten werden nur client-seitig im Browser verwendet.",
    },
    "chooseFiles": {
        en: "Choose Files",
        de: "Dateien auswählen",
    },
    "processingFiles": {
        en: "Processing files...",
        de: "Dateien werden verarbeitet...",
    },
    "errorOccurred": {
        en: "Error:",
        de: "Fehler:",
    },
    "totalAverage": {
        en: "Total Avg",
        de: "Gesamt-Ø",
    },
    "perYear": {
        en: "Per Year",
        de: "Pro Jahr",
    },
    "perMonth": {
        en: "Per Month",
        de: "Pro Monat",
    },
    "allMonths": {
        en: "All Months",
        de: "Alle Monate",
    },
    "collapseAllYears": {
        en: "Collapse All Years",
        de: "Alle Jahre einklappen",
    },
    "expandAllYears": {
        en: "Expand All Years",
        de: "Alle Jahre ausklappen",
    },
    "githubRepoLinkText": {
        en: "GitHub Repository",
        de: "GitHub Repository",
    },
    "avgShort": {
        en: "Avg. Ø",
        de: "Ø",
    },
    "fees": {
        en: "Fees",
        de: "Gebühren",
    },
    "taxes": {
        en: "Taxes",
        de: "Steuern",
    },
};

export type Locale = 'en' | 'de';
