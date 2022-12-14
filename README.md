# Delivery App for Management Restaurant
# Overview
## Scenario
> Built the Web Application Service of management restaurant 

## Resource
This system was based on 3-tier architecture.
### AWS
- ECS Fargate, S3, Route53, CloudFront, LoadBalancer
### Backend
- Fastify, NodeJs, MongoDB, Docker
### Frontend
- React


### Step 1: Built the Backend Server with Fastify
***✔ Create Backend with Fastify***

Built the API for frontend using Fastify and NodeJs. Make a container image for backend server using docker. 

### Step 2: Deploy Backend server and Database on the AWS ECS Fargate 
***✔ Deploy Image on the AWS***

![image](https://cdn.discordapp.com/attachments/762718201049251950/1022431760119758898/unknown.png)

Push the server image on the AWS ECR. Make a task definiton for executing new service on the EC as well as make a task definiton for executing MongoDB.  

### Step 3: Built the CI/CD Pipeline with Github Action

***✔ Automation with Github Action***
 
 When the all images work properly on the ECS for managing efficiently make a CI/CD Piepline. Create a aws.yml file for building images and deploying on the ECS automatically.
 When the new commit is pushed, Github Action start to create image and deploy image on the AWS.


### Step 4: Built the Frontend with S3 
***✔ Build the frontend and deploy for static-hosting on S3***

![image](https://cdn.discordapp.com/attachments/997023775554019390/1022776968170709072/123132.JPG)

Build the frontend and move the build files to S3 for static hosting. 
(Frontend is provided.)<br>
Also, frontend files can be created with CI/CD Pipeline using Github Action, which build and deploy on the AWS environment.
If new commit is pushed, build files was automatically created by automation and deploy on the S3.
Finally,regsiter the record on Route53 and deploy on the web using cloudfront service. 

### Step 5: Docker Compose
***✔ Docker Compose***

Through docker-compose can create local environment for developing using just one command.

<br>


## How it works
<br>

![image](https://cdn.discordapp.com/attachments/762718201049251950/1022432411432255488/unknown.png)

> If client access the site with domain that registered on the Route53, client can see the screen of the web application service. When the user uses the website, it normally works with server and database according to the API.





