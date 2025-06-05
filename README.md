# ⛽ Fuel Quota Management System
![image](https://github.com/user-attachments/assets/5efb9101-f8e2-460b-b2cf-e24eb01cbaf3)

A smart, unified web and mobile-based solution designed to manage and streamline fuel distribution through station and vehicle quota tracking — minimizing misuse, wait times, and manual work. This project ensures a seamless digital experience for **vehicle owners**, **station owners**, and **administrators**.

---

## 📌 Overview

This system was built to address long queues, unauthorized fuel claims, and inefficient data handling by verifying vehicles with official data and automating quota tracking and notifications.

* 🔐 **Authentication** for all user types: vehicle owners, station owners, and admins.
* ✅ **Vehicle verification** with the Department of Motor Traffic (DMT) database before registration.
* 📱 **Mobile App integration** for station workers to scan and process QR codes.
* 🎫 **QR Code system** linked to each vehicle for quota access and tracking.
* 📊 **Admin panel** for station approvals, user management, and quota monitoring.
* 📩 **SMS Notifications** powered by Twilio, automatically sent to vehicle owners after each quota update.
---

## 👥 User Roles & Flow

🚗 Vehicle Owners
* Sign up / log in via the web application.
* Register vehicles (validated via DMT).
* Receive a unique QR Code for each vehicle.
* View fuel quota balance and history.
* Receive SMS/email notifications when quota is used.

🏪 Station Owners
* Sign up with station details (license, location, etc.).
* Await approval by admin.
* Once approved, can assign mobile accounts for station workers.

👨‍🔧 Station Workers (Mobile App)
* Log in via mobile app.
* Scan incoming vehicles' QR codes.
* View and deduct available quota in real time.
* Confirm transactions — which notifies the vehicle owner.

👨‍💼 Admins
* Approve or reject station sign-ups.
* Manage fuel quota allocations and updates for each station.
* Monitor vehicle registrations and quota distributions.
* View full transaction logs and user activities.
* Manage user roles and system settings.

---

## 🔄 Workflow

1. **Vehicle Owner registers a vehicle.**

   * System verifies details via the **DMT (Department of Motor Traffic)** API.
2. **QR Code is generated** and assigned to the verified vehicle.
3. **Station Worker scans the QR code** upon arrival at station.
4. **System shows the remaining quota** and allows deduction.
5. **Quota is updated**, and **notification is sent** to the vehicle owner.

---

## 🛠️ Technologies Used

### 🌐 Frontend

* **React.js** ⚛️
* **Bootstrap** 🎨

### 🔧 Backend

* **Node.js** 🟢
* **Express.js** 🚀

### 🗄️ Database

* **MySQL** 🐬

### 📱 Mobile Integration

- A custom Android app developed in Android Studio (Java) for station workers.

- Uses Retrofit to communicate with the Node.js + Express backend.

- Twilio integration is used to send real-time SMS notifications to vehicle owners after quota updates.

- Allows station workers to:

  * Log in securely.

  * Scan QR codes on vehicles.

  * View vehicle’s remaining quota.

  * Deduct used quota and trigger notifications.

### 🧠 Extras

* **QR Code Generation**
* **DMT Vehicle Validation API**
* **Real-time quota management**
* **Notifications via SMS or Email**

---

## 🚀 Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/fuel-management-system.git
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   npm run start
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Database**

   * Import the MySQL database schema from `/db/schema.sql`.
   * Update DB credentials in the `.env` file.

5. **Mobile App**

   * Connect to backend via provided API endpoints.
   * Use QR code scanner module to interact with vehicle entries.

---
## 🙌 Acknowledgments

This project was developed as a response to the increasing need for **transparent**, **efficient**, and **digitally verifiable** fuel management — especially to reduce long queues and prevent fuel misuse.

By combining web and mobile solutions with official vehicle databases and real-time quota logic, this system empowers all stakeholders — from vehicle owners to station managers — to operate smoothly and transparently.

