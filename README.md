# Waqqly

Need to write project overview here.

## Project local Setup

To setup and run the project locally, you need to have following dependencies installed on you system.

1- aws cli
2- amplify cli
3- nodejs 18

### Step 1: Clone the project

First, you need to clone repository by using git tool.

`git clone https://github.com/Bryan020603/waqqly.git`

### Step 2: Install project dependencies

Run the npm install command to install dependencies

`npm install`

### Step 3: Configure AWS profile

Create a new IAM user on aws account with all the required permissions attached to that user. To interact with AWS from local development environment, you need to generate cli credentials for that user. Use the given command to create named profile locally and it will asks couple of questions.

`aws configure --profile [profile-name]`

### Step 4: Initialize Amplify project

`amplify init`

you need to choose existing environment while initializing amplify project.

### Step 5: Run the application

`npm run dev`
