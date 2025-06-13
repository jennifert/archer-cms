import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load .env into process.env
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

const source = isProd
  ? './public/robots.prod.txt'
  : './public/robots.dev.txt';

const dest = './dist/robots.txt';

fs.copyFileSync(source, dest);
console.log(`✅ robots.txt set for ${isProd ? 'production' : 'development'}`);
