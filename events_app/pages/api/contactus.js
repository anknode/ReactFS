// api/contactus.js

import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

function buildPath() {
  return path.join(process.cwd(), 'data', 'contactus.json');
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

function saveData(filePath, newData) {
  fs.writeFileSync(filePath, JSON.stringify(newData));
}

export default function handler(req, res) {
  const { method } = req;

  const filePath = buildPath();
  let contactusData = extractData(filePath); // Change to let to allow reassignment

  if (!Array.isArray(contactusData)) { // Check if contactusData is not an array, and initialize as empty array if needed
    contactusData = [];
  }

  if (method === 'POST') {
    const { name, email, city } = req.body;

    if (!name || !email || !city) {
      return res.status(422).json({ message: 'Invalid form data' });
    }

    const newContact = {
      id: uuidv4(),
      name,
      email,
      city,
      timestamp: new Date().toISOString(),
    };

    const newContactusData = [...contactusData, newContact];
    saveData(filePath, newContactusData);

    res.status(201).json({
      message: `Thank you for your submission!`,
      contact: newContact,
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
