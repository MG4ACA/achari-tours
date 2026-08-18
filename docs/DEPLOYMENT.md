# 🚀 Achari Tours — Hostinger KVM 1 Deployment Guide

## Stack: Nuxt 3 + .NET 9 API + Directus 11 + PostgreSQL 16 + Docker + Nginx

---

## 📋 Prerequisites

- Hostinger KVM 1 VPS with **Ubuntu 22.04 LTS**
- SSH access to VPS (`ssh root@YOUR_VPS_IP`)
- Domain/subdomain pointed to VPS IP (`acharitours.lumicore-labs.com`)
- GitHub repo: `https://github.com/MG4ACA/achari-tours`

---

## 🎯 Architecture Overview

```
Internet
    │
    ▼
Cloudflare (DNS + CDN + WAF)
    │  HTTPS
    ▼
Nginx (Reverse Proxy + SSL termination)  ← Port 80/443
    │
    ├──► Nuxt 3 Web      (internal: 3000)   /
    ├──► .NET 9 API      (internal: 5000)   /api/
    ├──► Directus CMS    (internal: 8055)   /cms/
    │
    └──► PostgreSQL      (internal: 5432)   [not exposed]

All services run as Docker containers managed by Docker Compose.
```

---

## 🔧 Step 1 — Initial VPS Setup

SSH into your server:
```bash
ssh root@YOUR_VPS_IP
```

### 1.1 Update system
```bash
apt update && apt upgrade -y
```

### 1.2 Create a non-root user
```bash
adduser achari
usermod -aG sudo achari
# Copy SSH keys to new user
rsync --archive --chown=achari:achari ~/.ssh /home/achari
```

### 1.3 Harden SSH (optional but recommended)
```bash
nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
# Set: PasswordAuthentication no
systemctl restart sshd
```

Switch to new user:
```bash
su - achari
```

---

## 🐳 Step 2 — Install Docker & Docker Compose

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version
docker compose version
```

---

## 🌐 Step 3 — Install Nginx & Certbot

```bash
sudo apt install -y nginx certbot python3-certbot-nginx

# Verify Nginx
sudo systemctl status nginx
```

---

## 📁 Step 4 — Clone Repository

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/MG4ACA/achari-tours.git
cd achari-tours
```

---

## ⚙️ Step 5 — Configure Environment Variables

### 5.1 Create production Docker Compose override
```bash
cp docker-compose.yml docker-compose.prod.yml
nano docker-compose.prod.yml
```

Use this production configuration:

```yaml
# docker-compose.prod.yml
services:
  postgres:
    image: postgres:16-alpine
    container_name: achari-postgres
    restart: always
    environment:
      POSTGRES_USER: achari
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: achari_tours
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - achari-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U achari -d achari_tours"]
      interval: 10s
      timeout: 5s
      retries: 5

  directus:
    image: directus/directus:11
    container_name: achari-directus
    restart: always
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DB_CLIENT: pg
      DB_HOST: postgres
      DB_PORT: 5432
      DB_DATABASE: achari_tours
      DB_USER: achari
      DB_PASSWORD: ${DB_PASSWORD}
      SECRET: ${DIRECTUS_SECRET}
      ADMIN_EMAIL: ${DIRECTUS_ADMIN_EMAIL}
      ADMIN_PASSWORD: ${DIRECTUS_ADMIN_PASSWORD}
      PUBLIC_URL: https://acharitours.lumicore-labs.com/cms
      CORS_ENABLED: "true"
      CORS_ORIGIN: "https://acharitours.lumicore-labs.com"
    volumes:
      - directus_uploads:/directus/uploads
      - directus_extensions:/directus/extensions
    networks:
      - achari-network

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    container_name: achari-api
    restart: always
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      ASPNETCORE_ENVIRONMENT: Production
      ConnectionStrings__DefaultConnection: "Host=postgres;Port=5432;Database=achari_tours;Username=achari;Password=${DB_PASSWORD}"
      Jwt__Key: ${JWT_SECRET}
      Cors__Origins__0: "https://acharitours.lumicore-labs.com"
    networks:
      - achari-network

  web:
    build:
      context: ./web
      dockerfile: Dockerfile
    container_name: achari-web
    restart: always
    environment:
      NUXT_PUBLIC_API_BASE_URL: "https://acharitours.lumicore-labs.com/api"
      NUXT_PUBLIC_DIRECTUS_URL: "https://acharitours.lumicore-labs.com/cms"
      NUXT_PUBLIC_SITE_URL: "https://acharitours.lumicore-labs.com"
    networks:
      - achari-network

networks:
  achari-network:
    driver: bridge

volumes:
  postgres_data:
  directus_uploads:
  directus_extensions:
```

### 5.2 Create `.env` file (never commit this!)
```bash
nano /var/www/achari-tours/.env
```

```env
# Database
DB_PASSWORD=your_super_strong_db_password_here

# Directus
DIRECTUS_SECRET=your_long_random_directus_secret_key_here
DIRECTUS_ADMIN_EMAIL=admin@acharitours.com
DIRECTUS_ADMIN_PASSWORD=your_strong_admin_password

# JWT (for .NET API admin auth)
JWT_SECRET=your_long_random_jwt_secret_key_minimum_32_characters
```

```bash
chmod 600 .env
```

---

## 🐋 Step 6 — Create Dockerfiles

### 6.1 .NET 9 API Dockerfile
```bash
nano /var/www/achari-tours/api/Dockerfile
```

```dockerfile
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["AchariTours.Api.csproj", "."]
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "AchariTours.Api.dll"]
```

### 6.2 Nuxt 3 Dockerfile
```bash
nano /var/www/achari-tours/web/Dockerfile
```

```dockerfile
# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=build /app/.output ./
EXPOSE 3000
ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production
CMD ["node", "server/index.mjs"]
```

---

## 🌐 Step 7 — Configure Nginx

### 7.1 Create Nginx site config
```bash
sudo nano /etc/nginx/sites-available/acharitours
```

```nginx
# Redirect HTTP → HTTPS
server {
    listen 80;
    server_name acharitours.lumicore-labs.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name acharitours.lumicore-labs.com;

    # SSL (Certbot will fill these in)
    ssl_certificate /etc/letsencrypt/live/acharitours.lumicore-labs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/acharitours.lumicore-labs.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_min_length 256;

    # ── Nuxt Frontend (root) ──────────────────────────────
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # ── .NET API ──────────────────────────────────────────
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # ── Directus CMS (admin only — restrict access) ───────
    location /cms/ {
        # Optional: IP whitelist for extra security
        # allow YOUR_HOME_IP;
        # deny all;

        proxy_pass http://localhost:8055/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # ── Static asset caching ──────────────────────────────
    location ~* \.(js|css|png|jpg|jpeg|webp|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 7.2 Enable site and test
```bash
sudo ln -s /etc/nginx/sites-available/acharitours /etc/nginx/sites-enabled/
sudo nginx -t       # Should say: syntax is ok
sudo systemctl reload nginx
```

---

## 🔒 Step 8 — SSL Certificate (Let's Encrypt)

```bash
sudo certbot --nginx -d acharitours.lumicore-labs.com
# Follow prompts, choose to redirect HTTP → HTTPS

# Test auto-renewal
sudo certbot renew --dry-run
```
  ---

## 🚢 Step 9 — Build & Launch

```bash
cd /var/www/achari-tours

# Build all Docker images
docker compose -f docker-compose.prod.yml build

# Start all services
docker compose -f docker-compose.prod.yml up -d

# Watch logs
docker compose -f docker-compose.prod.yml logs -f
```

### Verify services are running:
```bash
docker compose -f docker-compose.prod.yml ps
```

Expected output:
```
NAME                STATUS          PORTS
achari-postgres     Up (healthy)    5432/tcp
achari-directus     Up              8055/tcp
achari-api          Up              8080/tcp
achari-web          Up              3000/tcp
```

---

## 🗄️ Step 10 — Database Migration

```bash
# Run EF Core migration inside the API container
docker compose -f docker-compose.prod.yml exec api \
  dotnet ef database update

# OR — the API auto-migrates in Development mode.
# For Production, migrations run manually as above.
```

---

## ✅ Step 11 — Verify Deployment

```bash
# Check website
curl -I https://acharitours.lumicore-labs.com

# Check API
curl https://acharitours.lumicore-labs.com/api/

# Check Directus
curl https://acharitours.lumicore-labs.com/cms/server/health
```

Visit in browser:
- 🌍 **Website:** `https://acharitours.lumicore-labs.com`
- 🛠️ **Directus CMS:** `https://acharitours.lumicore-labs.com/cms`

---

## 🔄 Deployment Updates (CI/CD — Manual)

When you push new code, deploy with:

```bash
cd /var/www/achari-tours

# Pull latest code
git pull origin main

# Rebuild and restart affected services
docker compose -f docker-compose.prod.yml build web api
docker compose -f docker-compose.prod.yml up -d --no-deps web api

# Run any new migrations
docker compose -f docker-compose.prod.yml exec api dotnet ef database update
```

---

## 📊 Monitoring & Maintenance

### Check container resource usage
```bash
docker stats
```

### View logs for specific service
```bash
docker compose -f docker-compose.prod.yml logs -f web    # Nuxt
docker compose -f docker-compose.prod.yml logs -f api    # .NET API
docker compose -f docker-compose.prod.yml logs -f directus
docker compose -f docker-compose.prod.yml logs -f postgres
```

### Restart a specific service
```bash
docker compose -f docker-compose.prod.yml restart api
```

### Database backup
```bash
docker exec achari-postgres pg_dump -U achari achari_tours > backup_$(date +%Y%m%d).sql
```

### Database restore
```bash
docker exec -i achari-postgres psql -U achari achari_tours < backup_20260101.sql
```

---

## 🆘 Troubleshooting

| Problem | Command | Fix |
|---------|---------|-----|
| Container won't start | `docker compose logs <service>` | Check error message |
| Port conflict | `sudo lsof -i :3000` | Kill conflicting process |
| Nginx 502 Bad Gateway | Check if Docker containers are running | `docker ps` |
| SSL cert expired | `sudo certbot renew` | Auto-renew should handle this |
| DB connection failed | Check `DB_PASSWORD` in `.env` | Verify credentials match |
| Out of disk space | `docker system prune -f` | Remove unused images/containers |

---

## 📋 Port Reference

| Service | Container Port | Host Port | Exposed via Nginx |
|---------|--------------|-----------|------------------|
| Nuxt Web | 3000 | 3000 | `https://domain.com/` |
| .NET API | 8080 | 5000 | `https://domain.com/api/` |
| Directus | 8055 | 8055 | `https://domain.com/cms/` |
| PostgreSQL | 5432 | — | **Not exposed** |

---

*Last updated: August 2026*
