# Deployment Guide: Choshmazone (cPanel / Shared Hosting)

This guide provides step-by-step instructions to deploy your project to **shohorerdokan.com** (BestWebHost BD).

## 1. Prepare Frontend (React)
1. In your local terminal, run:
   ```bash
   npm run build
   ```
2. This will create a `dist` folder in your project root.
3. The `dist` folder now contains your optimized website files and the `.htaccess` file for routing.

## 2. Prepare Database (MySQL)
1. Open your local **phpMyAdmin** (usually `http://localhost/phpmyadmin`).
2. Select `choshmazone_db`.
3. Click **Export** and save the `.sql` file.
4. Log into your **cPanel** at `shohorerdokan.com/cpanel`.
5. Go to **MySQL Database Wizard**:
   - Create a new database (e.g., `shohorer_db`).
   - Create a new user (e.g., `shohorer_user`).
   - Give the user ALL privileges.
   - **Important**: Save the database name, username, and password!
6. Go to **phpMyAdmin** in cPanel.
7. Select your new database and click **Import**. Upload your `.sql` file.

## 3. Configure Backend (PHP)
Before uploading, you must update the database credentials for your live server.
1. Open `api/config.php` and update the constants:
   ```php
   define('DB_HOST', 'localhost'); // Usually localhost on cPanel
   define('DB_NAME', 'shohorer_db'); // Your cPanel DB name
   define('DB_USER', 'shohorer_user'); // Your cPanel DB user
   define('DB_PASS', 'your_secure_password'); // Your cPanel DB password
   
   // Disable errors for production
   error_reporting(0);
   ini_set('display_errors', 0);
   ```

## 4. Upload Files to cPanel
1. In cPanel, open **File Manager**.
2. Navigate to `public_html`.
3. **Upload Frontend**:
   - Upload all **contents** of your local `dist` folder directly into `public_html`.
   - Ensure `.htaccess` is present in `public_html`.
4. **Upload Backend**:
   - Upload the entire `api` folder from your project into `public_html`.
   - Your structure should look like this:
     ```
     public_html/
     ├── assets/
     ├── api/
     │   ├── auth/
     │   ├── products/
     │   ├── config.php
     │   └── ...
     ├── .htaccess
     ├── index.html
     └── ...
     ```

## 5. Final Verification
1. Visit `https://shohorerdokan.com`.
2. Test the Login and Shop pages.
3. Check if images are loading correctly from the `/api/uploads` directory.

---
**Note**: If you face any issues with the API after upload, check the `error_log` file in the `public_html` or `api` folder in File Manager.
