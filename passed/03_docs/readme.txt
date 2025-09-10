digital_real_estate_innovation/
├── real_estate_innovation_engine/  # Backend-Verzeichnis
│   ├── venv/                       # Virtuelle Python-Umgebung (wird automatisch erstellt)
│   ├── src/
│   │   ├── main.py                 # Haupt-Flask-Anwendung
│   │   ├── models/                 # Datenbankmodelle
│   │   │   ├── __init__.py
│   │   │   ├── user.py             # Benutzermodell
│   │   │   ├── content.py          # Content-Modell (Trends, Technologien, Inspirationen)
│   │   │   └── trend_management.py # Neue Trendmanagement-Modelle
│   │   └── routes/                 # API-Routen
│   │       ├── __init__.py
│   │       ├── user.py
│   │       ├── content.py          # Routen für Content-Management
│   │       └── trend_management.py # Neue Routen für Trendmanagement
│   ├── database/                   # Datenbankdateien (z.B. app.db, wird automatisch erstellt)
│   ├── requirements.txt            # Python-Abhängigkeiten (generiert)
│   └── ... weitere Flask-Dateien
│
├── real_estate_frontend/   # Frontend-Verzeichnis
│   ├── public/
│   │   └── index.html              # Haupt-HTML-Datei
│   ├── src/
│   │   ├── App.jsx                 # Haupt-React-Komponente
│   │   ├── main.jsx                # React-Einstiegspunkt
│   │   ├── App.css                 # Allgemeine CSS-Datei
│   │   ├── components/             # Wiederverwendbare UI-Komponenten
│   │   │   ├── Header.jsx          # Navigationsleiste
│   │   │   ├── ContentCard.jsx     # Karte für Content-Anzeige
│   │   │   └── ui/                 # shadcn/ui Komponenten
│   │   └── components/modules/     # Modul-spezifische Komponenten
│   │       ├── AddConnect.jsx
│   │       ├── ExploreSelect.jsx
│   │       ├── IdeateRealize.jsx
│   │       ├── RateCreate.jsx
│   │       ├── TrendDashboard.jsx  # Neues Trend Dashboard
│   │       └── TrendAnalytics.jsx  # Neues Trend Analytics Modul
│   ├── package.json                # Node.js-Abhängigkeiten und Skripte
│   ├── vite.config.js              # Vite-Konfiguration
│   └── ... weitere React-Dateien
│
└── docs/                           # Dokumentationsdateien (optional, von mir generiert)
    ├── prototype_summary.md
    ├── prototype_documentation.md
    ├── architecture.mmd
    ├── architecture.png
    ├── er_diagram.mmd
    ├── er_diagram.png
    ├── test_results.md
    └── final_documentation.md
