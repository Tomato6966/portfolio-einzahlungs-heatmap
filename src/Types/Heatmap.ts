export interface Einzahlung {
    datum: Date;
    betrag: number;
    steuer: number;
    gebühren: number;
}

export interface MonatsSummen {
    betrag: number;
    steuer: number;
    gebühren: number;
}

export type JahresEinzahlungen = {
    [jahr: number]: {
        [monat: number]: MonatsSummen;
    };
};

// Raw data extracted from the csv
export type TransactionData = {
  Datum: string;
  /** @deprecated value */
  Betrag?: string;
  /** @deprecated value */
  Buchungstag?: string;
  Typ: string;
  Wert: string;
  Buchungswährung: string;
  Bruttobetrag: string;
  "Währung Bruttobetrag": string;
  Wechselkurs: string;
  Gebühren: string;
  Steuern: string;
  Stück: string;
  ISIN: string;
  WKN: string;
  "Ticker-Symbol": string;
  Wertpapiername: string;
  Notiz: string;
};
