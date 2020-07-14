# Delilah Restó 
This is an API REST built to manage a food store´s orders. It will allow you to:
- Use CRUD functions on users, orders and products
- Sign in with JWT and role validation


# Set up
1. Install a local server environment (XAMPP or MAMP are recommended) used to serve a MySQL
2. Start the server (Apache with suggested enviorenments) and MySQL. Make sure that the port being used for MySQL is 8889
3. Make sure you have a profile with both username and password 'root' in MySQL.
** if using a different port, username or root, you can change the predifined ones in file '../database/dataConnection'**
4. Import (./database/dbForIMport.sql) containing all the SQL queries to create the database and create the needed tables. There are also queries to populate these tables. 



# Server init
1. You'll need nodejs (https://nodejs.org). Check if you already have it installed in your system.
2. Once confirmed nodejs is in your system clone this repository, get into it and install its dependencies. Use these commands in your terminal
```bash
git clone https://github.com/vickycalvo/DelilahResto
cd delilah-resto
npm install
```
3. Start server. 
```bash
npm start
```

# Endpoints 
The endpoints are detailed in this YALM file (../documentation/swagger.yml) and they were designed following the OPEN API specifications. Import the file into the Swagger Editor (https://editor.swagger.io/#) for a better understanding of thte API endopoints. 

# Endpoints Testing
By importing the following file (../documentation/Delilah Resto.postman_collection.json) in Postman aplication you will be able to test all the endopoints. (Remember that some require role validation so you will have to include the correspondant token in the header authorization). 