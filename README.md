# Kitchen Oasis


Kitchen Oasis is an e-commerce platform that specializes in providing a wide range of kitchen appliances and accessories. It aims to simplify the process of purchasing kitchen essentials by offering a convenient and user-friendly shopping experience.


# Features

## User Authentication

- Registration: Users can create an account by providing their name, email, and password.
- Login and Logout: Registered users can log in to access their accounts and log out when they're done.
- Password Reset: Forgot your password? No problem! Users can request a password reset via email.

  
## Product Management
Admin Dashboard: Admins have access to a dashboard where they can add new products, edit existing ones, and delete products as needed.
Product Listings: Users can browse through various categories of kitchen products, view product details, and add items to their cart.
Product Reviews: Users can leave reviews and ratings for products they've purchased, helping other customers make informed decisions.

## Order Management
Order Placement: Users can place orders for selected products and specify shipping details, such as address, phone number, and payment method.
Order Tracking: Once an order is placed, users can track its status, from processing to delivery.
Admin Order Management: Admins can manage orders, update their status, and view order details.


## Payment Processing
Secure Payments: Integration with Stripe ensures secure payment processing, allowing users to make transactions with confidence.
Payment Confirmation: Users receive confirmation emails upon successful payment, providing peace of mind about their purchases.


## Search and Filters
Search Functionality: Users can search for specific products using keywords, making it easy to find what they're looking for.
Filtering Options: Filter products by category, price range, ratings, and other parameters to narrow down search results.


## Responsive Design
Mobile-Friendly: The application is designed to be responsive and accessible across devices, including smartphones, tablets, and desktops.



# Dependencies

- Express: Web framework for Node.js
- Mongoose: MongoDB object modeling tool
- Cloudinary: Cloud-based image and video management service
- Nodemailer: Module for sending emails
- Stripe: Payment processing platform


  
# User Roles and Functionalities


## Normal User:

- Can register an account: Register
- Can login to their account: Login
- Can view products: Products
- Can place orders
- Can view their order history
- Can update their profile information
- Can reset their password if forgotten
- Can review products they have purchased

  
## Admin:

- Can register an admin account: Admin Register
- Can login to their admin account: Admin Login
- Can view products: Products
- Can add new products
- Can update existing product information
- Can delete products
- Can view all user accounts
- Can update user account information
- Can delete user accounts
- Can view all orders
- Can update order statuses
- Can delete orders



# Additional Information


## Stripe Payment
When testing the payment functionality using Stripe, you can use the following dummy address to fill up the address form:

 - **Address** : `123 Main Street, Anytown, CA 12345, USA`

## Forgot Password
If you forget your password and need to reset it, make sure to sign up for `Mailtrap` to receive the password reset email. The reset password link will be sent to your email address associated with your account.
