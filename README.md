# Smart Waste Management System (SWMS)

A comprehensive IoT-based solution for optimizing urban waste collection, citizen participation, and sustainable living. SWMS automates bin monitoring, collection planning, and engages users with eco-friendly features to promote recycling and reduce waste.

---

## Key Features

| Module                             | Description                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| **Real-time Bin Monitoring**   | Tracks waste levels using smart sensors and updates live on dashboard.        |
| **Optimized Route Planning**    | AI-powered algorithms suggest efficient routes for waste collection vehicles. |
| **Automated Collection Alerts** | Notifies when bins reach capacity, triggering timely pickups.                 |
| **Data Analytics Dashboard**    | Visualizes waste trends, forecasts, and operational insights.                 |
| **User & Admin Panels**         | Separate dashboards for citizens, collectors, and city officials.             |
| **Nearby Recycling Centers**   | Maps closest recycling points for easy citizen access.                        |
| **Eco-Commerce**               | Platform to discover sustainable, eco-friendly products.                      |
| **Eco-Chatbot**                | Interactive assistant for recycling tips and app guidance.                    |
| **Gamified Learning & Quizzes** | Learn through videos, take quizzes, earn badges.                              |
| **Sell Recyclables**            | Monetize sorted trash by connecting with local collectors.                    |
| **Waste Classifier (AI)**      | Upload waste images for instant classification & recycling advice.            |

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Chart.js, Google Maps API
* **Backend:** Node.js (Express), Python (FastAPI)
* **Database:** MongoDB
* **Messaging:** MQTT, REST APIs
* **Hosting:** Azure, Render, Vercel, Netlify

---

## 📦 Installation Guide

### Prerequisites:

* Node.js & npm
* Python 3.x (optional for AI modules)
* MongoDB

### Steps:

# Clone the repository
```bash
git clone https://github.com/mr-baraiya/Smart-Waste-Management-System.git
cd Smart-Waste-Management-System
```
# Backend Setup
```bash
cd swms-backend
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

npm run dev
# Runs on http://localhost:5000
```

# Frontend Setup
```bash
cd ../SWMS-Frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

# SWMS- Model
```bash
cd SWMS-Model
pip install -r requirements.txt

# Windows
venv\Scripts\activate
# macOS/Linux  
source venv/bin/activate

# Create .env file
echo "GOOGLE_API_KEY=your_google_api_key" > .env

uvicorn main:app --reload
# Runs on http://localhost:8000

```
---

## 🖥️ Usage

* Access frontend: `http://localhost:5173`

* Admin Dashboard: `/admin`

* Users can:

  * Track bin fill-levels in real-time.
  * Use Waste Classifier, Eco-Chatbot, Gamified Learning.
  * Sell recyclables and find nearby centers.

* Sensors auto-report data via MQTT/REST APIs.
* 
---

## 🔗 Live Demo

> [https://smartwaste-management.vercel.app](#) *(Deploy to Render/Vercel and update this link)*

---

## 🤝 Contribution Guide

1. Fork this repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push (`git push origin feature/AmazingFeature`).
5. Submit a Pull Request.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for full details.

---

## 🙏 Acknowledgements

* Open-source IoT sensor libraries.
* Google Maps API for location services.
* Community contributors.

---

## 📬 Contact

**Maintainer:** [mr-baraiya](https://github.com/mr-baraiya)  
email: [baraiyavishalbhai32@gmail.com](mailto:baraiyavishalbhai32@gmail.com)

---

## ⭐️ If you find this project helpful, please star this repo!
