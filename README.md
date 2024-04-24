# News App Instructions

1. **Laravel REST API:**
   - Run the following command to execute migrations:
     ```
     php artisan migrate
     ```
   - Run the following command to seed the database with fake categories:
     ```
     php artisan db:seed --class=CategorySeeder
     ```
   - Run the following command to seed the database with fake news:
     ```
     php artisan db:seed --class=NewsSeeder
     ```
   - After that, start the Laravel app with:
     ```
     php artisan serve
     ```

2. **Angular Frontend:**
   - To run the Angular frontend, use:
     ```
     ng serve
     ```

3. **User Login:**
   - Use one of the following user credentials to login and test the app:
     ```json
     [
       {
         "email": "john@example.com",
         "password": "password123"
       },
       {
         "email": "jane@example.com",
         "password": "password456"
       }
     ]
     ```

These steps will initiate both the Laravel backend and the Angular frontend, allowing you to interact with the News App seamlessly.
