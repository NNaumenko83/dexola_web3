# StarRunner Token Staking

**Language: [English](README.md) | [Українська](README.ua.md)**

StarRunner Token Staking is a web3 application that allows you to stake tokens, claim rewards, and withdraw tokens from the staking pool at any time. This project was built using Vite.

## Table of Contents

- [StarRunner Token Staking](#starrunner-token-staking)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Environment Variables](#environment-variables)

## Requirements

Before you begin, please ensure that you have the following components installed:

- [Node.js](https://nodejs.org/) installed on your computer.

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/NNaumenko83/dexola_web3
   ```
2. Navigate to the project directory:

   ```bash
   cd dexola_web3
   ```

3. Install the project dependencies:
   ```bash
   npm install
   ```

## Usage

To start the application, run the following command:

```bash
npm run start
```

The application will be available at `http://localhost:5173/.

## Environment Variables

In this project, the following environment variables are used:

- `VITE_APP_INFURA_API_KEY`: Your Infura API key. You can obtain it from [тут](https://www.infura.io/).

- `VITE_APP_PROJECT_ID`:Your project ID from WalletConnect Cloud. You can get it from [WalletConnect Cloud](https://cloud.walletconnect.com/).

To set up these environment variables, create a `.env` file in the project root and add the following lines:

```plaintext
VITE_APP_INFURA_API_KEY=ваш-ключ-infura-api
VITE_APP_PROJECT_ID=ваш-ідентифікатор-walletconnect-проекту
```

**These environment variables are used to configure the application and should be set before running the project.**
