# Deployment Guide — Debian 12 (Bookworm)

This guide covers a production deployment of **sharif-hossain.me** on a fresh Debian 12 VPS using Node.js 22, pnpm, PM2, and Nginx as a reverse proxy with an SSL certificate from Let's Encrypt.

---

## 1. Initial server setup

```bash
# Update the system
apt update && apt upgrade -y

# Install essentials
apt install -y curl git ufw build-essential
```

### Configure the firewall

```bash
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw enable
```

---

## 2. Install Node.js 22 (via NodeSource)

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# Verify
node -v   # should print v22.x.x
npm -v
```

---

## 3. Install pnpm

```bash
npm install -g pnpm

# Verify
pnpm -v
```

---

## 4. Install PM2 (process manager)

```bash
npm install -g pm2

# Enable PM2 to start on boot
pm2 startup systemd
# Copy-paste and run the command that PM2 prints
```

---

## 5. Create a non-root application user

```bash
adduser --disabled-password --gecos "" appuser
su - appuser
```

All remaining steps unless noted are run as **appuser**.

---

## 6. Clone the repository

```bash
# As appuser
git clone https://github.com/YOUR_USERNAME/sharif-hossain.me.git
cd sharif-hossain.me/source
```

---

## 7. Configure environment variables

```bash
cp .env.example .env        # if an example file exists, otherwise:
touch .env
nano .env
```

Minimum required variables:

```env
# Secret used to sign admin session cookies.
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
AUTH_SECRET=replace_with_a_long_random_secret
```

---

## 8. Install dependencies and build

```bash
pnpm install --frozen-lockfile
pnpm build
```

---

## 9. Seed the database (first deploy only)

```bash
pnpm seed
```

Set the admin password:

```bash
pnpm admin:password
```

Follow the interactive prompts.

---

## 10. Start the app with PM2

The `start` script is self-contained — it already sets port **3005** and binds to `127.0.0.1`.
**Do not pass `-p` or `-H` flags to PM2**; doing so duplicates them and causes errors.

```bash
# Build first — PM2 cannot start without a production build
pnpm build

# Start via PM2 (no extra flags needed)
pm2 start "pnpm start" --name "sharif-hossain-me"

# Save the process list so it survives reboots
pm2 save
```

Useful PM2 commands:

| Command | Purpose |
|---|---|
| `pm2 status` | Show running processes |
| `pm2 logs sharif-hossain-me` | Tail application logs |
| `pm2 restart sharif-hossain-me` | Restart after a new deploy |
| `pm2 stop sharif-hossain-me` | Stop the app |

---

## 11. Install and configure Nginx

```bash
# Back to root
exit

apt install -y nginx
```

Create a site config:

```bash
nano /etc/nginx/sites-available/sharif-hossain.me
```

Paste the following (replace the domain as needed):

```nginx
server {
    listen 80;
    server_name sharif-hossain.me www.sharif-hossain.me;

    # Redirect www → non-www
    if ($host = www.sharif-hossain.me) {
        return 301 https://sharif-hossain.me$request_uri;
    }

    location / {
        proxy_pass         http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        'upgrade';
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and test:

```bash
ln -s /etc/nginx/sites-available/sharif-hossain.me /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## 12. Enable HTTPS with Let's Encrypt (Certbot)

```bash
apt install -y certbot python3-certbot-nginx

certbot --nginx -d sharif-hossain.me -d www.sharif-hossain.me
```

Certbot will automatically update the Nginx config to handle SSL and set up auto-renewal. Verify renewal works:

```bash
certbot renew --dry-run
```

---

## 13. Deploying updates

```bash
su - appuser
cd sharif-hossain.me/source

git pull origin main
pnpm install --frozen-lockfile
pnpm build                     # always build before restart
pm2 restart sharif-hossain-me  # PM2 will pick up the new .next directory
```

> **Important:** `pm2 restart` without a prior `pnpm build` will fail with  
> _"Could not find a production build in the .next directory"_.  
> Always run `pnpm build` first.

---

## 14. Persistent SQLite data

The SQLite database lives at `data/blog.sqlite` inside the project directory. Back it up before pulling updates that change the schema:

```bash
cp data/blog.sqlite data/blog.sqlite.bak
```

For automated daily backups, add a cron job as appuser:

```bash
crontab -e
```

```cron
0 3 * * * cp /home/appuser/sharif-hossain.me/source/data/blog.sqlite \
             /home/appuser/backups/blog-$(date +\%Y\%m\%d).sqlite
```

---

## 15. Security hardening checklist

- [ ] `AUTH_SECRET` is a cryptographically random 32+ byte hex string
- [ ] `/admin` route is accessible only over HTTPS
- [ ] SSH password authentication is disabled (`PasswordAuthentication no` in `/etc/ssh/sshd_config`)
- [ ] UFW is enabled with only ports 22, 80, and 443 open
- [ ] Nginx `server_tokens off;` is set in `/etc/nginx/nginx.conf`
- [ ] Certbot auto-renewal is active (`systemctl status certbot.timer`)
- [ ] The SQLite `data/` directory is not publicly accessible (Nginx does not serve it directly — the app handles all routes)
- [ ] `data/` is excluded from the git repository (confirm in `.gitignore`)

---

## Quick reference

| Item | Value |
|---|---|
| App port | 3005 |
| PM2 process name | `sharif-hossain-me` |
| App directory | `/home/appuser/sharif-hossain.me/source` |
| Nginx config | `/etc/nginx/sites-available/sharif-hossain.me` |
| SQLite data | `data/blog.sqlite` |
| Node.js version | 22.x |
