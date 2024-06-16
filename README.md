## Gizilo Backend API Wiki

Overview
This wiki provides instructions on how to set up, reproduce, and deploy the Gizilo backend API on a Google Cloud Platform (GCP) VM instance.

Prerequisites
* GCP Account
* GitHub Repository: backend-api
* Basic knowledge of Docker and Docker Compose

Cloning the Repository
1. SSH into your VM:
   * Connect to your VM via SSH from the GCP Console.
   * Ensure you have git installed. If not, install it using:<br>
     sudo apt update<br>
     sudo apt install git<br>
2. Clone the Repository:<br>
   git clone https://github.com/giziloid/backend-api.git<br>
   cd backend-api<br>

Setting Up Docker and Docker Compose
1. Install Docker:<br>
   sudo apt update<br>
   sudo apt install docker.io<br>
   sudo systemctl start docker<br>
   sudo systemctl enable docker<br>
   sudo usermod -aG docker $USER<br>
2. Install Docker Compose:
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose<br>
   sudo chmod +x /usr/local/bin/docker-compose<br>

Environment Variables
1. Copy .env.example to .env:<br>
   cp .env.example .env<br>
2. Edit the .env File:
   * Use a text editor to update the .env file with your database credentials and API keys.
     nano .env<br>
   * Update values as necessary.

Building and Running Containers
1. Build and Run Containers:
   sudo docker-compose up --build -d

SSL Configuration with NGINX and Certbot
1. Ensure the NGINX Configuration:
   * The nginx.conf is properly set up to handle SSL.
2. Certbot for SSL Certificates:
   * Certbot will automatically manage SSL certificates as specified in docker-compose.yml.

Accessing the Application
* Once the setup is complete, the backend should be accessible via http://your-vm-ip.

Troubleshooting
* Check container logs for errors:
  sudo docker-compose logs
* Restart specific services if needed:
  sudo docker-compose restart <service-name>

----

## Using the API
The Gizilo backend API provides several endpoints for authentication, user management, and product management. Below are examples of how to use these endpoints.

**Authentication**

Register:
- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "username": "example@example.com",
    "email": "example@example.com",
    "password": "yourpassword"
  }
- **Response**:
  ```json
  {
    "id": "example id",
    "email": "example@example.com",
    "password": "*****",
    "avatar": "<>"
  }

Login:
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "email": "example@example.com",
    "password": "yourpassword"
  }
- **Response**:
  ```json
  {
    "token": "example token",
  }


**Product**

Create Product:
- **Endpoint**: `/products`
- **Method**: `POST`

### Form-Data Payload

| Key           | Value        |
|---------------|--------------|
| nama          | example      |
| weight        | example      |
| calories      | example      |
| fat           | example      |
| proteins      | example      |
| carbohydrate  | example      |
| sugar         | example      |
| sodium        | example      |
| potassium     | example      |
| images        | example.png  |

Get All Product
- **Endpoint**: `/products`
- **Method**: `GET`
- Headers:
   ```json
    {
          "id": "example id",
          "name": "according to input",
          "images": "according to input",
          "weight": "according to input",
          "calories": "according to input",
          "fat": "according to input",
          "proteins": "according to input",
          "carbohydrate": "according to input",
          "sugar": "according to input",
          "sodium": "according to input",
          "potassium": "according to input",
          "last_modified": "according to input",
          "created_at": "according to input",
   }

Get Product By Name
- **Endpoint**: `/products/name/example name`
- **Method**: `GET`

Get Product By ID
- **Endpoint**: `/products/id/example id`
- **Method**: `GET`

Update Product By ID:
- **Endpoint**: `/products/id/example id`
- **Method**: `PUT`

### Form-Data Payload

| Key           | Value        |
|---------------|--------------|
| nama          | example      |
| weight        | example      |
| calories      | example      |
| fat           | example      |
| proteins      | example      |
| carbohydrate  | example      |
| sugar         | example      |
| sodium        | example      |
| potassium     | example      |

Delete Product
- **Endpoint**: /products/example id
- **Method**: DELETE
---

## Conclusion
By following these steps, you should be able to set up and deploy the Gizilo backend API on a GCP VM instance. Ensure all environment variables and configurations are correctly set up for a smooth deployment.
