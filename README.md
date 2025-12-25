# Deployment Guide for Student Portal Project

This guide will walk you through deploying your MERN stack application to **Render** (free hosting) and **MongoDB Atlas** (free database).

## Prerequisites
- A GitHub account.
- A basic understanding of git.

## Step 1: MongoDB Atlas Setup (Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up for a free account.
2. Create a new project (e.g., "StudentPortal").
3. Click **Create** to create a new cluster. Select the **M0 Sandbox** (FREE) tier.
4. Select a provider (AWS) and a region near you. Click **Create Deployment**.
5. **Database User**: Create a username and password. **Write these down**, you will need them later.
6. **Network Access**: Click "Add IP Address" and select **"Allow Access from Anywhere"** (`0.0.0.0/0`). This is required for Render to connect.
7. Click **Finish and Close**.
8. Click **Connect** on your cluster.
9. Select **Compactibles with your driver** (Drivers) -> Node.js.
10. **Copy the connection string**. It looks like `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`.
    - Replace `<password>` with the password you created in step 5.

## Step 2: Push Code to GitHub
1. Create a new repository on GitHub (e.g., "student-portal").
2. Open your project folder in the terminal.
3. Initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/student-portal.git
   git push -u origin main
   ```

## Step 3: Deploy Backend on Render
1. Go to [Render](https://render.com/) and sign up/login with GitHub.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Name**: `student-portal-api` (or similar)
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: ` npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free
5. **Environment Variables** (Advanced):
   - Click "Add Environment Variable".
   - Key: `ATLAS_URI`
   - Value: mongodb+srv://shivanskumar1020_db_user:Harsh123@cluster0.anesio3.mongodb.net/?appName=Cluster0
   - Key: `PORT`
   - Value: `5000`
   - Key: `FRONTEND_URL`
   - Value: `http://localhost:5173` (We will update this in Step 5)
6. Click **Create Web Service**.
7. Wait for the deployment to finish. Copy the **onrender.com** URL of your backend (e.g., `https://student-portal-api.onrender.com`).

## Step 4: Deploy Frontend on Render
1. Go to Cluster Dashboard (Render Dashboard).
2. Click **New +** and select **Static Site**.
3. Connect the *same* GitHub repository.
4. Settings:
   - **Name**: `student-portal-web`
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. **Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: The Backend URL you copied in Step 3 (e.g., `https://student-portal-api.onrender.com/api`) **IMPORTANT**: Make sure to add `/api` at the end if your backend routes are prefixed with it (which they are).
6. Click **Create Static Site**.
7. Wait for deployment. You will get a frontend URL (e.g., `https://student-portal-web.onrender.com`).

## Step 5: Final Configuration
1. Go back to your **Backend Service** on Render.
2. Go to **Environment** tab.
3. Edit `FRONTEND_URL` and change it to your **new Frontend URL** (e.g., `https://student-portal-web.onrender.com`).
4. **Save Changes**. Render will redeploy the backend automatically.

## Troubleshooting
- If data doesn't load: Check the Console in your browser (F12) for errors.
- If "Network Error": Check if `VITE_API_URL` is correct in Frontend settings.
- If Backend crashes: Check Logs in Render Dashboard.