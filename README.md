[![Netlify Status](https://api.netlify.com/api/v1/badges/87073a95-ecd7-42f3-ae16-eef1a6f57847/deploy-status)](https://app.netlify.com/sites/21club/deploys)

Web app URL: https://21club.netlify.app/ \
Demo video: https://www.youtube.com/watch?v=CAT73JMVV-k

# Restaurant Order Management System

## About
This is an Angular web application whose backend is powered by Firebase. 
- Customers can select food items from the menu, add them to their cart and place orders. 
- Admins can add new food items, edit any existing item and manage customer's orders.

## Frameworks/Tools used
![](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

## Highlights

- Have written comments in code.
- Used meaningful names for variables and methods.
- Made several components and functionalities loosely coupled.
- Focused on code maintainability, readability and reusability.
- Worked on handling edge cases as much as possible.
- Used **RxJs's BehaviorSubject** and **Observable** to communicate between several components and keep data in sync. For instance, when we add/remove items to cart from menu page the cart data gets updated in local storage. There is a service for handling the local storage where the cart data is passed to a BehaviorSubject so that components that need the cart data updates can subscribe to its Observable and listen to the updates. The number of items and subtotal amount in the cart bar at the bottom of page has subscribed to the cart data updates and that's why the values change whenever the cart is updated.
- Used **async/await** to make use of asynchronous programming for API calls.

## How to run

1. Clone the repo
2. Install all the dependencies: 

```sh
npm install
```

3. Run the angular application: 

```sh
ng serve --open
```

## Screenshots

### Home page

---

![](https://github.com/thecoducer/restaurant-order-management-system/blob/master/Screenshots/home-page.jpg)

---

### Login page

---

![](https://github.com/thecoducer/restaurant-order-management-system/blob/master/Screenshots/login.jpg)

---

### Menu page from where users can add items to their cart

---

![](https://github.com/thecoducer/restaurant-order-management-system/blob/master/Screenshots/menu-page.jpg)

---

### User's order page

---

![](https://github.com/thecoducer/restaurant-order-management-system/blob/master/Screenshots/order-page.jpg)

---

### Add a new item page (only accessible to admins)

---

![](https://github.com/thecoducer/restaurant-order-management-system/blob/master/Screenshots/add-item.jpg)

---

### Edit an existing item page (only accessible to admins)

---

![](https://github.com/thecoducer/restaurant-order-management-system/blob/master/Screenshots/edit-item.jpg)

---

### Manage items page

---

![](https://github.com/thecoducer/restaurant-order-management-system/blob/master/Screenshots/admin-items-page.jpg)

---

## Improvements
Listed here: https://github.com/thecoducer/restaurant-order-management-system/issues/1#issue-907845093
