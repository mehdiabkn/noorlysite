import express from 'express';
import cors from 'cors';
import requestIp from 'request-ip';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestIp.mw());

// Chemin du fichier CSV
const csvPath = path.join(__dirname, 'analytics.csv');

// Créer le fichier CSV avec en-têtes s'il n'existe pas
if (!fs.existsSync(csvPath)) {
  const headers = 'Date,Heure,IP,Action,UserAgent,Referrer\n';
  fs.writeFileSync(csvPath, headers);
  console.log('📊 Fichier analytics.csv créé');
}

// Fonction pour ajouter une ligne au CSV
function logToCSV(ip, action, userAgent, referrer) {
  const now = new Date();
  const date = now.toLocaleDateString('fr-FR');
  const time = now.toLocaleTimeString('fr-FR');

  // Échapper les virgules dans les champs
  const escapeCsv = (str) => `"${String(str || '').replace(/"/g, '""')}"`;

  const line = `${escapeCsv(date)},${escapeCsv(time)},${escapeCsv(ip)},${escapeCsv(action)},${escapeCsv(userAgent)},${escapeCsv(referrer)}\n`;

  fs.appendFileSync(csvPath, line);
  console.log(`✅ Logged: ${action} - ${ip}`);
}

// Endpoint pour tracker les événements
app.post('/api/track', (req, res) => {
  try {
    const ip = req.clientIp;
    const { action } = req.body;
    const userAgent = req.headers['user-agent'];
    const referrer = req.headers['referer'];

    logToCSV(ip, action, userAgent, referrer);

    res.json({ success: true, message: 'Événement enregistré' });
  } catch (error) {
    console.error('❌ Erreur:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint pour récupérer les stats (optionnel)
app.get('/api/stats', (req, res) => {
  try {
    if (!fs.existsSync(csvPath)) {
      return res.json({ total: 0, data: [] });
    }

    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    const total = lines.length - 1; // -1 pour les en-têtes

    res.json({
      success: true,
      total,
      lastEntries: lines.slice(-10).reverse() // 10 dernières entrées
    });
  } catch (error) {
    console.error('❌ Erreur stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📊 Les données seront enregistrées dans: ${csvPath}`);
});
