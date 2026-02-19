import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { level, message, path: routePath, stack } = req.body; 
        
        const logDir = path.join(process.cwd(), 'logs');
        const fileName = `${new Date().toISOString().split('T')[0]}.log`;
        const filePath = path.join(logDir, fileName);

    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
        const logEntry = `[${new Date().toISOString()}] [${level.toUpperCase()}] [Origen: ${routePath}]: ${message} ${stack || ''}\n`;

    try {
        fs.appendFileSync(filePath, logEntry);
        return res.status(200).json({ status: 'success' });
    } catch (error) {
        return res.status(500).json({ status: 'error' });
        }
    }
    res.status(405).end();
}