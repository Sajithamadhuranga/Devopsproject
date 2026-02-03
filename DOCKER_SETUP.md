# Docker Project - Full Stack Application

A complete full-stack application with React frontend, Node.js/Express backend, and MongoDB database, all containerized with Docker.

## Project Structure

```
├── frontend/               # React Vite application
│   ├── Dockerfile         # Multi-stage build for frontend
│   ├── nginx.conf         # Nginx configuration with API proxy
│   ├── src/
│   │   ├── api.js         # API configuration
│   │   ├── App.jsx
│   │   └── components/    # React components
│   └── package.json
├── backend/               # Node.js Express server
│   ├── Dockerfile         # Backend container
│   ├── server.js          # Main server file
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── routes/
│   │   └── authRoutes.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── package.json
├── docker-compose.yml     # Docker Compose configuration
└── .env.example          # Environment variables template

```

## Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 1.29+)
- Git

## Setup Instructions

### 1. Clone or Extract the Project

```bash
cd docker-project-main
```

### 2. Configure Environment Variables

```bash
# Copy the example env file
cp .env.example backend/.env
```

### 3. Build and Start Services

```bash
# Build and start all containers
docker-compose up -d

# Or rebuild with latest changes
docker-compose up -d --build
```

### 4. Verify Services

Check that all services are running:

```bash
docker-compose ps
```

Expected output:
```
NAME                    STATUS      PORTS
docker-project-mongo-1      Up      27017/tcp
docker-project-backend-1    Up      0.0.0.0:4000->4000/tcp
docker-project-frontend-1   Up      0.0.0.0:80->80/tcp
```

## Access the Application

- **Frontend**: http://65.0.29.12
- **Backend API**: http://65.0.29.12:4000/api
- **Health Check**: http://65.0.29.12:4000/health
- **MongoDB**: 65.0.29.12:27017 (from host machine)

## Key Updates Made

### Docker Compose Configuration
- ✅ Added proper networking (app-network bridge)
- ✅ Environment variables for MongoDB connection
- ✅ Correct port mappings (frontend: 80, backend: 4000, MongoDB: 27017)
- ✅ Service dependencies and restart policies
- ✅ Health checks

### Backend Updates
- ✅ Fixed ES module imports
- ✅ Enhanced CORS configuration for Docker services
- ✅ Added health check endpoint (`/health`)
- ✅ Proper MongoDB connection via environment variables
- ✅ Server listening on 0.0.0.0 for Docker compatibility
- ✅ Alpine-based Docker image for smaller size
- ✅ Health check in Dockerfile

### Frontend Updates
- ✅ Nginx configuration with API proxy to backend service
- ✅ SPA routing support
- ✅ Static asset caching
- ✅ Dynamic API URL configuration
- ✅ Multi-stage Docker build

### Nginx Configuration
- ✅ Frontend routes with SPA support (`try_files $uri $uri/ /index.html`)
- ✅ API proxy to backend: `/api/` → `http://backend:4000/api/`
- ✅ Cache control headers
- ✅ Proper proxy headers for backend service

### API Integration
- ✅ Dynamic API URL that works in both development and Docker
- ✅ Added `apiCall` helper function for consistent API calls
- ✅ Environment variable support via `REACT_APP_API_URL`

## Common Commands

```bash
# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f                    # All services
docker-compose logs -f backend            # Backend only
docker-compose logs -f frontend           # Frontend only

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild specific service
docker-compose up -d --build backend

# Execute commands in container
docker-compose exec backend npm start
docker-compose exec frontend npm run build

# View service status
docker-compose ps

# Access MongoDB shell
docker-compose exec mongo mongosh
```

## Troubleshooting

### Frontend not connecting to backend
- Verify backend is running: `docker-compose logs backend`
- Check nginx proxy configuration
- Ensure API requests use `/api/` prefix

### MongoDB connection issues
- Check MongoDB container is running: `docker-compose ps`
- Verify credentials in `.env` file
- Check logs: `docker-compose logs mongo`

### Port already in use
```bash
# Find and kill process using port 80
# Windows: netstat -ano | findstr :80
# Linux: lsof -i :80

# Or use different ports in docker-compose.yml
```

### Service not starting
```bash
# Check service logs
docker-compose logs [service-name]

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## Environment Variables

### Backend (backend/.env)
```env
MONGODB_URI=mongodb://admin:password@mongo:27017/docker-project?authSource=admin
PORT=4000
NODE_ENV=production
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=http://65.0.29.12,http://65.0.29.12:80,http://65.0.29.12:5173
```

### Frontend (docker-compose.yml)
- `REACT_APP_API_URL`: API endpoint for the frontend

## Development Mode

For local development without Docker:

```bash
# Backend
cd backend
npm install
npm start

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## Production Deployment

1. Update credentials in `.env` file
2. Update `JWT_SECRET` with a secure value
3. Update `CORS_ORIGIN` with your domain
4. Use environment variables for sensitive data
5. Enable HTTPS on production

## License

ISC

## Support

For issues or questions, please check the logs and troubleshooting section above.
