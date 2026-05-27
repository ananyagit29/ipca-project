# Quick Start Guide - IPCA Project Login-Signup System

## 🚀 What's Running Right Now

### Backend ✅
- **Status**: Running
- **URL**: http://localhost:8080
- **Terminal**: Check the Maven terminal for logs

### Frontend ✅
- **Status**: Running  
- **URL**: http://localhost:5174
- **Terminal**: Check the npm terminal for logs

---

## 🧪 Test the Login-Signup Flow

### Step 1: Open Frontend
Go to: **http://localhost:5174**

### Step 2: Sign Up (Create Account)
1. Click "Sign up here" link (or go to `/signup`)
2. Fill the form:
   - **Name**: `Test User`
   - **Email**: `test@example.com`
   - **Password**: `Test@123`
3. Click "Sign Up"
4. ✅ You should see: "Registration successful!" → Redirected to login

### Step 3: Log In
1. You're now on login page
2. Enter credentials:
   - **Email**: `test@example.com`
   - **Password**: `Test@123`
3. Click "Login"
4. ✅ You should see: "Login successful!" → Redirected to `/dashboard`

### Step 4: Verify Database
The SQLite database is automatically created at:
```
d:\Project\ipca-project\backend\ipcadb.db
```

---

## 📊 Troubleshooting

### Frontend Not Connecting to Backend?
**Error**: "Failed to connect to the server"

**Solution**: 
1. Check backend is running (should see "Tomcat started on port 8080")
2. Check browser console for exact error
3. Ensure CORS is configured (already fixed)

### Backend Won't Start?
**Check**: Are you in the `backend` folder?
```bash
cd backend
mvn spring-boot:run
```

### Signup Form Not Submitting?
**Check**:
1. All fields are filled (name, email, password)
2. Email format is valid
3. Check browser console for network errors (F12)
4. Check backend logs for errors

### Error: "Email is already in use"
**This means**: You already signed up with this email. Try:
- Different email address, OR
- Delete `ipcadb.db` file to reset database

---

## 🔍 Endpoint Details

### POST /api/auth/signup
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Responses**:
- `200 OK`: `"User registered successfully!"`
- `400 Bad Request`: `"Error: Email is already in use!"`

### POST /api/auth/login
**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Responses**:
- `200 OK`: `"Login successful!"`
- `401 Unauthorized`: `"Invalid email or password"`

---

## 📁 Project Structure

```
d:\Project\ipca-project\
├── backend/
│   ├── src/main/java/com/ipca/project/
│   │   ├── ProjectApplication.java
│   │   ├── controller/AuthController.java
│   │   ├── model/User.java
│   │   ├── repository/UserRepository.java
│   │   └── config/SecurityConfig.java
│   ├── src/main/resources/application.properties
│   ├── pom.xml
│   └── ipcadb.db (auto-created)
│
├── src/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── Dashboard.tsx
│   ├── App.tsx
│   └── main.tsx
│
└── package.json
```

---

## ✨ Files That Were Fixed

1. ✅ `backend/src/main/resources/application.properties` - Added SQLite dialect
2. ✅ `backend/src/main/java/.../config/SecurityConfig.java` - Fixed CORS & added PasswordEncoder bean
3. ✅ `backend/src/main/java/.../controller/AuthController.java` - Use injected PasswordEncoder
4. ✅ `backend/pom.xml` - Added hibernate-community-dialects dependency

---

## 🎯 What to Test Next

- ✅ Signup with new user
- ✅ Login with created user
- ✅ Try login with wrong password
- ✅ Try signup with existing email
- ✅ Check database for encrypted passwords

---

## 💡 Tips

- **Stop Backend**: Press `Ctrl+C` in Maven terminal
- **Stop Frontend**: Press `Ctrl+C` in npm terminal
- **Reset Database**: Delete `ipcadb.db` file and restart backend
- **View Backend Logs**: Check Maven terminal - it's verbose by design
- **View Frontend Errors**: Open browser DevTools (F12) → Console tab

---

**Need help?** Check the detailed summary in `BACKEND_FIXES_SUMMARY.md`
