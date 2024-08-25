# Wallet

![wallet image](./pic/wallet.jpg)

This project is a digital wallet that allows you to create a new wallet if you don't have one, or log in with your private key and seed phrase if you do. You can view network and wallet information, save tokens, send tokens, delete tokens, and send Ether.

## Table of Contents

- [Video Demo](#Video-Demo)
- [Description](#description)
- [Installation](#installation)
- [Details](#details)
- [Features](#features)
- [Usage](#usage)
  - [Creating a New Wallet](#creating-a-new-wallet)
  - [Logging in with Private Key or Seed Phrase](#logging-in-with-private-key-or-seed-phrase)
  - [Viewing Network and Wallet Information](#viewing-network-and-wallet-information)
  - [Managing Tokens](#managing-tokens)
    - [Saving Tokens](#saving-tokens)
    - [Sending Tokens](#sending-tokens)
    - [Deleting Tokens](#deleting-tokens)
  - [Sending Ether](#sending-ether)
- [License](#license)

## Video Demo

[Demo video link](https://youtu.be/MNDOi_N4Y6I?si=VVihjsOJYCaXhQVa)

## Description

The Digital Wallet Project is designed to provide users with a secure and user-friendly platform to manage their cryptocurrency assets. Whether you are new to cryptocurrencies or an experienced user, this wallet offers a range of features to meet your needs. You can create a new wallet, log in with existing credentials, view detailed information about your assets, and manage your tokens and Ether transactions with ease.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mahdiZarrei/Wallet.git
   cd Wallet
   ```

2. **Install dependencies**:
   ```bash
   cd ./backend
   npm i
   cd ../frontend
   npm i
   ```
3. **Run the DApp**:
   ```bash
   cd ./backend
   npm start
   cd ../frontend
   npm run dev
   ```

## Details

- **Technology Stack**: The project is built using modern web technologies including Node.js, Express, and React.
- **Security**: Implements industry-standard encryption and security practices to ensure the safety of user data and transactions.
- **Compatibility**: Compatible with major web browsers and mobile devices.
- **Open Source**: The project is open source and welcomes contributions from the community.

## Features

- **Create a New Wallet**: If you don't have a wallet, you can create a new one.
- **Log in with Private Key and Seed Phrase**: If you have a wallet, you can log in using your private key and seed phrase.
- **View Network and Wallet Information**: You can view your network and wallet information.
- **Save Tokens**: You can save your tokens.
- **Send Tokens**: You can send your tokens to others.
- **Delete Tokens**: You can delete your tokens.
- **Send Ether**: You can send Ether.

### Creating a New Wallet

1. Navigate to the New Wallet page.
2. Click on "Create New Wallet".
3. Follow the on-screen instructions to generate a new wallet. Make sure to securely save your private key and seed phrase.

### Logging in with Private Key or Seed Phrase

1. Navigate to the login page.
2. Enter your private key or seed phrase.
3. Click "Log In" to access your wallet.

### Viewing Network and Wallet Information

1. Navigate to the info tab.
2. View details about your network and wallet, including balance, transaction history, and network status.

### Managing Tokens

#### Saving Tokens

1. Navigate to the token tab.
2. Enter the token details and click "Save Token".

#### Sending Tokens

1. Navigate to the token management page.
2. Select the token you want to send.
3. Enter the recipient's address and the amount.
4. Click "Send Token".

#### Deleting Tokens

1. Navigate to the token management page.
2. Select the token you want to delete.

### Sending Ether

1. Navigate to the send Ether page.
2. Enter the recipient's address and the amount of Ether.
3. Click "Send Ether".

## License

This project is licensed under the MIT License. For more information, see the LICENSE file.
