echo "Building frontend"
cd frontend
npm i
npm run build
cd..

echo "Building backend"
cd backend
npm i
npm run build
cd ..