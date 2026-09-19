# Gharkasathi - Hostinger Deployment Guide

This guide explains how to deploy the full-stack **Gharkasathi** platform on Hostinger.

---

## Architecture Overview
- **Frontend**: React 19 + Tailwind CSS + Vite (Single Page App)
- **Backend API**: Node.js + Express (compiled to self-contained `dist/server.cjs`)
- **Node Requirement**: Node.js v20+ or v22+

---

## Method 1: Hostinger VPS (Recommended for Best Performance)

A Hostinger VPS (Ubuntu 22.04 or 24.04) provides full control and handles concurrent bookings, WebSocket/APIs, and file uploads cleanly.

### Step 1: Connect to your Hostinger VPS via SSH
```bash
ssh root@YOUR_SERVER_IP
```

### Step 2: Install Node.js, Git, and PM2
```bash
# Update package list
apt update && apt upgrade -y

# Install Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs git nginx

# Verify installation
node -v # Should be v20.x or v22.x
npm -v

# Install PM2 process manager globally
npm install -g pm2
```

### Step 3: Clone or Upload your Code
```bash
# Create project folder
mkdir -p /var/www/gharkasathi
cd /var/www/gharkasathi

# Clone from your GitHub repository (or upload via SFTP / FileZilla)
git clone <YOUR_GITHUB_REPO_URL> .

# Install dependencies
npm install

# Build both the Vite frontend and the backend bundle
npm run build
```

### Step 4: Configure Environment Variables
Create a `.env` file in the project root:
```bash
nano .env
```
Paste your production credentials:
```env
NODE_ENV=production
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
OTP_API_KEY=your_fast2sms_or_msg91_key
```
Press `Ctrl + O` to save, then `Ctrl + X` to exit.

### Step 5: Start the App with PM2
```bash
# Start the app using the included PM2 configuration
pm2 start ecosystem.config.cjs --env production

# Ensure app auto-restarts on server reboot
pm2 save
pm2 startup
```

### Step 6: Configure Nginx Reverse Proxy & SSL (Domain Setup)
```bash
nano /etc/nginx/sites-available/gharkasathi
```
Paste this Nginx server block (replace `yourdomain.com` with your actual domain):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Enable the site and reload Nginx:
```bash
ln -s /etc/nginx/sites-available/gharkasathi /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

Install free SSL certificate via Let's Encrypt:
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Method 2: Hostinger Cloud / Business Web Hosting (hPanel Node.js)

If you are using Hostinger Cloud or Web Hosting with the **Node.js** feature in hPanel:

### Step 1: Open Node.js in hPanel
1. Log in to your Hostinger control panel (**hPanel**).
2. Go to **Websites** -> Select your domain -> Search for **Node.js** in the left sidebar.
3. Click **Create Application**.

### Step 2: Configure the Node.js Application
- **Node.js version**: Choose `20.x` or `22.x`.
- **Application root**: `domains/yourdomain.com/public_html` (or project subfolder).
- **Application URL**: Select your domain (`https://yourdomain.com`).
- **Application startup file**: `dist/server.cjs`
- Click **Create**.

### Step 3: Upload Project Files & Build
1. Open **File Manager** in hPanel.
2. Upload all project files (or upload as a `.zip` and extract).
3. Open the **Terminal** in hPanel or connect via SSH:
   ```bash
   cd domains/yourdomain.com/public_html
   npm install
   npm run build
   ```

### Step 4: Add Environment Variables
In the hPanel Node.js settings, scroll to **Environment Variables** and add:
- `NODE_ENV` = `production`
- `PORT` = `3000` (or the port assigned by hPanel)
- `GEMINI_API_KEY` = your API key
- `RAZORPAY_KEY_ID` = your Razorpay key
- `RAZORPAY_KEY_SECRET` = your Razorpay secret

### Step 5: Restart Application
Click **Restart Application** in the hPanel Node.js dashboard.
Your app will now run live at your domain.
