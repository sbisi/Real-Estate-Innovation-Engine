# Setup-Anleitung für Visual Studio Code

## 1. ZIP-Datei entpacken

Entpacken Sie die `digital_real_estate_innovation_engine.zip` Datei in Ihren gewünschten Arbeitsordner.

## 2. Visual Studio Code öffnen

### Option A: Workspace-Datei verwenden (Empfohlen)
1. Öffnen Sie Visual Studio Code
2. Gehen Sie zu `File > Open Workspace from File...`
3. Wählen Sie die Datei `digital-real-estate-innovation.code-workspace` aus dem entpackten Ordner

### Option B: Ordner öffnen
1. Öffnen Sie Visual Studio Code
2. Gehen Sie zu `File > Open Folder...`
3. Wählen Sie den `digital_real_estate_innovation_engine` Ordner

## 3. Empfohlene Extensions installieren

VS Code wird automatisch vorschlagen, die empfohlenen Extensions zu installieren. Klicken Sie auf "Install" wenn die Benachrichtigung erscheint.

Manuelle Installation der wichtigsten Extensions:
- Python (Microsoft)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint

## 4. Backend einrichten

1. Terminal öffnen (`Ctrl+Shift+`` oder `View > Terminal`)
2. In das Backend-Verzeichnis wechseln:
   ```bash
   cd backend
   ```
3. Virtuelle Umgebung erstellen:
   ```bash
   python -m venv venv
   ```
4. Virtuelle Umgebung aktivieren:
   - **Windows**: `venv\Scripts\activate`
   - **macOS/Linux**: `source venv/bin/activate`
5. Abhängigkeiten installieren:
   ```bash
   pip install -r requirements.txt
   ```

## 5. Frontend einrichten

1. Neues Terminal öffnen (`Ctrl+Shift+5`)
2. In das Frontend-Verzeichnis wechseln:
   ```bash
   cd frontend
   ```
3. Node.js-Abhängigkeiten installieren:
   ```bash
   npm install
   ```

## 6. Anwendung starten

### Backend starten:
```bash
cd backend
source venv/bin/activate  # oder venv\Scripts\activate auf Windows
python src/main.py
```
Backend läuft auf: `http://localhost:5000`

### Frontend starten:
```bash
cd frontend
npm run dev
```
Frontend läuft auf: `http://localhost:5173`

## 7. VS Code Tasks verwenden (Optional)

Das Workspace ist mit vorkonfigurierten Tasks ausgestattet:

1. `Ctrl+Shift+P` drücken
2. "Tasks: Run Task" eingeben
3. Verfügbare Tasks:
   - "Start Backend"
   - "Start Frontend" 
   - "Install Backend Dependencies"
   - "Install Frontend Dependencies"

## 8. Debugging

Für das Backend-Debugging:
1. `F5` drücken oder `Run > Start Debugging`
2. "Python: Flask Backend" auswählen

## Projektstruktur

```
digital_real_estate_innovation_engine/
├── backend/                    # Flask Backend
│   ├── src/
│   │   ├── models/            # Datenmodelle
│   │   ├── routes/            # API-Endpunkte
│   │   └── main.py            # Hauptanwendung
│   └── requirements.txt       # Python-Abhängigkeiten
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/        # React-Komponenten
│   │   ├── services/          # API-Services
│   │   └── App.jsx            # Hauptkomponente
│   └── package.json           # Node.js-Abhängigkeiten
├── README.md                  # Projektdokumentation
├── .gitignore                 # Git-Ignore-Datei
└── digital-real-estate-innovation.code-workspace
```

## Troubleshooting

### Python-Interpreter nicht gefunden
1. `Ctrl+Shift+P` drücken
2. "Python: Select Interpreter" eingeben
3. Den Python-Interpreter aus `backend/venv/bin/python` (oder `backend/venv/Scripts/python.exe` auf Windows) auswählen

### Port bereits in Verwendung
- Backend: Port 5000 ändern in `backend/src/main.py`
- Frontend: Port wird automatisch geändert, wenn 5173 belegt ist

### Node.js/npm nicht installiert
Laden Sie Node.js von https://nodejs.org/ herunter und installieren Sie es.

## Weitere Hilfe

Konsultieren Sie die `README.md` Datei im Hauptverzeichnis für detaillierte Informationen über die Anwendung und ihre Features.

