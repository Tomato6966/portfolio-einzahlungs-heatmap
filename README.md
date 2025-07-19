# Portfolio Einzahlungs-Heatmap

---

## 🚀 Overview

The **Portfolio Einzahlungs-Heatmap** is a powerful and intuitive React application designed to help you visualize and analyze your monthly portfolio deposits. By simply uploading CSV export files from your portfolio management software (like Portfolio Performance), you can generate a detailed heatmap and interactive line charts that reveal your deposit trends over time. Understand your average deposits per year, month, and observe chronological flows at a glance.

**Try it yourself:** https://tomato6966.github.io/portfolio-einzahlungs-heatmap/

## ✨ Features

* **Multi-CSV Upload**: Easily upload one or more CSV files containing your transaction data.
* **Automated Data Aggregation**: Processes and consolidates deposit data by year and month.
* **Interactive Heatmap**: Visualize monthly deposits with a color-coded heatmap, indicating deposit amounts.
* **Dynamic Line Charts**:
    * **Per Year**: View monthly deposits for each individual year.
    * **Per Month**: See the average monthly deposit across all years.
    * **All Months**: A chronological line chart showing all monthly deposits over the entire data range.
* **Yearly Averages**: Displays the average monthly deposit for each year.
* **Collapsible Year Sections**: Collapse or expand individual year sections in the heatmap for better navigation.
* **Comprehensive Data Parsing**: Accurately extracts transaction dates (`Buchungstag` / `Datum`), amounts (`Betrag` / `Wert`), and optional `Steuern` (taxes) and `Gebühren` (fees).

## 🛠️ Technologies Used

* **React**: A declarative, component-based JavaScript library for building user interfaces.
* **Chart.js & React-Chartjs-2**: For creating responsive and interactive data visualizations.
* **PapaParse**: A robust CSV parser for browser and Node.js environments.
* **Vite**: A next-generation frontend tooling that provides an extremely fast development experience.
* **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
* **Oxlint**: A highly performant and modern linter for JavaScript and TypeScript.

## 📦 Installation & Setup

To get this project up and running on your local machine, follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone [https://github.com/Tomato6966/portfolio-heatmap.git](https://github.com/Tomato6966/portfolio-heatmap.git)
    cd portfolio-heatmap
    ```
    *(Replace `https://github.com/Tomato6966/portfolio-heatmap.git` with the actual repository URL if it's hosted.)*

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

## 🚀 Usage

1.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
    This will typically open the application in your browser at `http://localhost:5173/`.

2.  **Upload Your CSV Files**:
    * On the application page, locate the "Choose Files" input.
    * Click it and select one or more CSV export files from your portfolio management software.

    **💡 Tip for Portfolio Performance Users**:
    You can export the necessary CSVs by navigating to:
    `File` → `Export` → `CSV Files` →  `Securities/Account Transactions`.

3.  **Explore the Visualizations**:
    * Use the **"Pro Jahr"**, **"Pro Monat"**, and **"Alle Monate"** buttons to switch between different chart views.
    * Click on a year's heading (e.g., **"2023 Ø 1.234,56 €"**) to **collapse or expand** its detailed monthly heatmap.
    * Use the **"Alle Jahre einklappen"** and **"Alle Jahre ausklappen"** buttons to quickly manage the visibility of all year sections.

## 🧹 Linting

This project uses [Oxlint](https://oxlint.rs/) for fast and efficient code linting.

## Preview:

<img width="1042" height="1293" alt="image" src="https://github.com/user-attachments/assets/dbe4e717-986e-4763-bcea-6786b7d1a0fa" />

## Info About Portfolio Performance

- Website: https://www.portfolio-performance.info/
- Repository: https://github.com/portfolio-performance/portfolio
