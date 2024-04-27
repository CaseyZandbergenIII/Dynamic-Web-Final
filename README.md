# Project Setup

**Database**
1. Install mysql community version
2. Run all commands in db-init.sql in order

**Install Dependencies**
1. npm init -y
2. npm install express
3. npm install mysql2
4. Add "start": "node index.js" to package.json

***For Development Only***
1. npm install --save-dev nodemon
2. Add "dev": "nodemon index.js"

**File Setup**
1. Create a .env file
2. Add DB_PASSWORD=*Insert DB Password*

**Run Server**
1. For development use npm run dev
2. For general use node index.js
3. Navigate to http://localhost:3000
