#!/bin/bash

# 1. Build Frontend
echo "Starting Frontend Build..."
cd frontend
npm install
npm run build
cd ..  # <<< ต้องมีช่องว่าง!

# 2. Build/Start Backend
echo "Starting Backend..."
cd backend
npm install
npm start # หรือ npm run serve