# Restaurant Management CRM

A Single Page Application (SPA) designed to automate internal restaurant operations. The system enables administrators and hosts to monitor table availability, manage guest seating statuses, and process active orders in real time.

---

## Features

### 1. Authentication Module

* **Access Control:** Secure user authentication utilizing JWT tokens (`accessToken`).
* **Session Management:** Route guards restrict access to private views. Unauthorized users are automatically redirected to the login interface.

### 2. Table Management

* **Real-Time Monitoring:** Visual dashboard mapping 17 seating zones with color-coded status indicators (`free`, `res`, `occ`).
* **Initial Data Hydration:** Table configurations, numbering (including special zones `A1` and `A2`), booking times, and active orders are fetched from a custom DummyJSON API endpoint.
* **Table Details:** Contextual panel displaying current status and invoice summary upon selecting a table.

### 3. Order & Menu Management

* **Data Transformation:** Menu items are dynamically populated from the standard DummyJSON recipes endpoint. The application interceptor transforms the original preparation time property (`prepTimeMinutes`) into the item price.
* **Order Construction:** Displays item prices, images, quantities, and order submission statuses (`isSentToKitchen`) for occupied tables with automated total bill calculation.

### 4. Responsive Design

* **Mobile-friendly layout**
* **Burger navigation menu**

---

## Tech Stack

* **Core:** React 18, TypeScript
* **Build Tool:** Vite (Configured with Reverse Proxy on Netlify to handle CORS compliance)
* **Styling:** Tailwind CSS
* **Routing:** TanStack Router (File-based routing)
* **Data Fetching & Caching:** TanStack Query (React Query)
* **Deployment:** Netlify

---

## Local Deployment Instructions

1. Clone the repository:
```bash
git clone https://github.com/Florence100/crm-restaurant.git

```


2. Navigate to the project directory:
```bash
cd crm-restaurant

```


3. Install project dependencies:
```bash
npm install

```


4. Start the local development server:
```bash
npm run dev

```


5. Access the application via the local host URL: `http://localhost:5173`


## Deploy

[(Live Demo)](https://crm-restaurant.netlify.app)