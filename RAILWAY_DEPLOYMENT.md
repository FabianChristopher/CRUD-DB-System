# 🚂 Railway Deployment Guide

## Quick Deploy (5 Minutes)

Railway keeps your **MySQL code unchanged** - easiest deployment option!

---

## Prerequisites

1. GitHub account
2. Railway account (free): https://railway.app

---

## Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Employee Management System"

# Create GitHub repository at https://github.com/new
# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/CrudDB.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Railway

### 2.1 Sign Up
- Go to https://railway.app
- Click "Login" → "Login with GitHub"
- Authorize Railway

### 2.2 Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your **CrudDB** repository
4. Railway will detect Node.js and auto-deploy

### 2.3 Add MySQL Database
1. In your project, click **"+ New"**
2. Select **"Database"** → **"Add MySQL"**
3. Railway automatically creates and connects the database
4. Database credentials are auto-injected as `DATABASE_URL`

### 2.4 Configure Environment Variables
1. Click on your web service (not the database)
2. Go to **"Variables"** tab
3. Add these variables:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

**Note:** `DATABASE_URL` is automatically set by Railway, don't add it manually!

### 2.5 Deploy
- Railway automatically deploys on every git push
- First deployment takes ~2-3 minutes
- Watch the deployment logs in real-time

---

## Step 3: Get Your Live URL

1. Click on your web service
2. Go to **"Settings"** tab
3. Scroll to **"Domains"**
4. Click **"Generate Domain"**
5. Your app will be live at: `https://your-app-name.up.railway.app`

---

## Step 4: Test Your Deployment

Visit your Railway URL:
```
https://your-app-name.up.railway.app
```

You should see the landing page with:
- Admin Login button
- Employee Login button
- Theme toggle

**Default Admin Login:**
- Username: `admin`
- Password: `admin123`

---

## Updating Your App

After any code changes:

```bash
git add .
git commit -m "Updated feature X"
git push
```

Railway automatically redeploys in ~1-2 minutes!

---

## Free Tier Limits

✅ **$5 credit per month** (enough for):
- ~500 hours of server uptime
- Small MySQL database
- Perfect for portfolio/testing

💡 **Tip:** Railway sleeps inactive apps - first request takes ~30 seconds

---

## Troubleshooting

### Issue: "Application failed to start"
**Solution:** Check deployment logs for errors, usually database connection issues

### Issue: "Email not sending"
**Solution:** Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct Gmail app passwords

### Issue: "Database connection failed"
**Solution:** Make sure MySQL database is added to your project and running

### Issue: "404 Not Found on routes"
**Solution:** Ensure `PORT` environment variable is not set (Railway auto-sets it)

---

## What Changed in the Code?

Only **ONE file** was modified: `server.js`

**Changes made:**
1. Database config now accepts Railway's `DATABASE_URL` connection string
2. Database creation logic adapted for both local and Railway environments
3. Schema queries use `DATABASE()` instead of hardcoded database name

**All other files remain unchanged!** ✅

---

## Next Steps

1. ✅ Deploy to Railway
2. 🔒 Update admin password after first login
3. 📧 Configure email for production use
4. 🎨 Customize branding/styling
5. 📊 Add real employee data

---

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Project Issues: Create issue on your GitHub repo

Happy Deploying! 🚀
