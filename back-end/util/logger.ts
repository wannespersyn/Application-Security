import winston from 'winston';

// Configuratie van Winston
const logger = winston.createLogger({
  level: 'info', // Minimal log level, kan worden aangepast per omgeving (e.g., 'debug', 'warn', 'error')
  format: winston.format.combine(
    winston.format.timestamp(), // Voegt timestamp toe aan log
    winston.format.json() // Gestructureerde JSON log
  ),
  transports: [
    new winston.transports.Console(), // Log naar console
    new winston.transports.File({ filename: 'application.log' }) // Log naar bestand
  ]
});

export default logger;
