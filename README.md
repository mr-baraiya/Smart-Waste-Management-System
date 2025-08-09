# Smart Waste Management System (SWMS)

A comprehensive IoT-based solution for optimizing urban waste collection, citizen participation, and sustainable living. SWMS automates bin monitoring, collection planning, and engages users with eco-friendly features to promote recycling and reduce waste.

---

## Key Features

### 1 **Real-time Bin Monitoring**

* **What it does:**
  Uses IoT sensors (Ultrasonic/IR) installed in waste bins to measure fill levels.
* **How it works:**
  Sensor data is sent via **MQTT** or **REST API** to the backend → stored in **MongoDB** → displayed on the **dashboard in real-time**.
* **Purpose:**
  Helps authorities monitor bin status live & prioritize collections.

---

### 2 **Optimized Route Planning**

* **What it does:**
  Calculates the most efficient route for waste collection vehicles.
* **How it works:**
  Uses bin fill-level data + location → applies **AI/graph algorithms (Dijkstra/A*)*\* → generates optimized route map.
* **Purpose:**
  Saves fuel, reduces time & manpower for waste collection.

---

### 3 **Automated Collection Alerts**

* **What it does:**
  Notifies officials when a bin reaches its capacity threshold.
* **How it works:**
  Backend checks bin data periodically → if fill % > threshold → sends alert via dashboard/notifications.
* **Purpose:**
  Avoids overflow, ensures timely collection.

---

### 4 **Data Analytics Dashboard**

* **What it does:**
  Provides visual insights on waste management metrics.
* **How it works:**
  Aggregates historical bin data → displays in charts/graphs using **Chart.js** → shows trends, predictions.
* **Purpose:**
  Helps decision-makers analyze performance & plan strategies.

---

### 5 **User & Admin Panels**

* **What it does:**
  Different dashboards for citizens, collectors, and city officials.
* **How it works:**
  Role-based authentication → Admin can manage bins, users → Citizens can view bin status, sell recyclables.
* **Purpose:**
  Separates functionalities as per user roles.

---

### 6 **Nearby Recycling Centers**

* **What it does:**
  Shows users the closest recycling centers or drop-off points.
* **How it works:**
  Uses **Google Maps API** to fetch and display center locations → filters based on user’s geolocation.
* **Purpose:**
  Makes it easier for citizens to find and reach recycling points nearby.

---

### 7 **Eco-Commerce**

* **What it does:**
  Provides a marketplace for eco-friendly and sustainable products.
* **How it works:**
  Lists curated products from vendors → users can browse & buy → optional integration with payment gateways.
* **Purpose:**
  Promotes green shopping habits among users.

---

### 8 **Eco-Chatbot**

* **What it does:**
  Interactive chatbot that answers queries about recycling and app features.
* **How it works:**
  Frontend chat UI → connects to a chatbot API (e.g., Rasa/Dialogflow) → fetches responses.
* **Purpose:**
  Educates users and provides instant support on eco-friendly practices.

---

### 9 **Gamified Learning & Quizzes**

* **What it does:**
  Makes learning about waste management fun and interactive.
* **How it works:**
  Provides short learning modules/videos → quizzes after each module → awards badges on completion.
* **Purpose:**
  Boosts user engagement & eco-awareness through gamification.

---

### 10 **Sell Recyclables**

* **What it does:**
  Allows citizens to sell sorted recyclables to local collectors.
* **How it works:**
  Users fill a form (type, weight, location) → request is sent to backend → connects to nearest collectors.
* **Purpose:**
  Encourages recycling by offering monetary benefits.

---

### 11 **Waste Classifier (AI)**

* **What it does:**
  Classifies waste types from uploaded images & gives recycling suggestions.
* **How it works:**
  User uploads image → AI model (CNN-based) processes it → predicts category (plastic, organic, metal, etc.) → shows recycling tips.
* **Purpose:**
  Helps users sort their waste correctly using AI assistance.

---

## Tech Stack

* **Frontend:** React.js, Tailwind CSS, Chart.js, Google Maps API
* **Backend:** Node.js (Express), Python (FastAPI)
* **Database:** MongoDB
* **Messaging:** MQTT, REST APIs
* **Hosting:** Azure, Render, Vercel, Netlify

---

## Installation Guide

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

## Usage

* Access frontend: `http://localhost:5173`

* Admin Dashboard: `/admin`

* Users can:

  * Track bin fill-levels in real-time.
  * Use Waste Classifier, Eco-Chatbot, Gamified Learning.
  * Sell recyclables and find nearby centers.

* Sensors auto-report data via MQTT/REST APIs.
* 
---

## Live Demo

> [https://smart-waste-management-system-ruby.vercel.app/](#)

---

## Contribution Guide

1. Fork this repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push (`git push origin feature/AmazingFeature`).
5. Submit a Pull Request.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for full details.

---

## Acknowledgements

* Open-source IoT sensor libraries.
* Google Maps API for location services.
* Community contributors.

---

## Contact

**Maintainer:** [mr-baraiya](https://github.com/mr-baraiya)  
email: [baraiyavishalbhai32@gmail.com](mailto:baraiyavishalbhai32@gmail.com)

---

## If you find this project helpful, please star this repo!
