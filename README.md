# zoren
![image](https://github.com/srteerra/zoren/assets/74383100/f73a2345-6c7d-4899-a887-219a581751b7)


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
![](https://img.shields.io/github/stars/srteerra/zoren)![](https://img.shields.io/github/forks/srteerra/zoren)


Zoren is a decentralized platform built on the Solana blockchain that enables users to streamline money transfers through easily accessible QR codes. It also allows the creation of 'Parties,' which enable splitting a single payment among different users.

# Table of contents
- [Social Media](#social-media)
- [Deck](#deck)
- [Pich](#pitch)
- [Built with](#built-with)
- [Screenshots](#screenshots)
- [Project Status](#project-status )
- [Development Workflow](#development-workflow )
- [Features](#features)
- [Authors](#authors)
- [See our Demo](#demo-on-figma)
  - [Requirements](#requirements)
  -  [Quick start](#quick-start)
-  [Project Structure](#project-structure)

## Social Media

[Twitter](https://twitter.com/ZorenApp)

[Instagram](https://www.instagram.com/zorenapp/)

### This platform is now working at [Zoren.site]()


## Pitch

## Deck


 # Built with
- [Next.js](https://nextjs.org/) - Next.js is a framework that allows developers to create single-page applications and high-performance web applications through server-side rendering.
- [Web3.js](https://web3js.readthedocs.io/en/v1.8.0/) - Web3.js is a collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.
- [Tailwind](https://tailwindcss.com/) - Tailwind is a CSS (Cascading Style Sheets) framework with predefined classes that you can use to build and design web pages directly in your markup. It allows you to write CSS in your HTML in the form of predefined classes.
- [Sanity.io](https://www.sanity.io/) - Sanity is the platform for structured content that powers remarkable digital experiences.
- [Create Next.js app]() - The easiest way to get started with Next.js is by using create-next-app. This CLI tool enables you to quickly start building a new Next.js application, with everything set up for you.



# Screenshots

### Home view

### Home logged view

### Profile modal

### Pay modal

### QR modal

### Friends list modal



## Project Status  

This project is currently under active development and updates are made on a regular basis.

## Development Workflow  

We follow a GitFlow workflow for development. Contributions are made in feature branches and merged into the main branch after a review. 

![image](https://github.com/srteerra/zoren/assets/74383100/a0aa2faa-8af9-4b4d-bcf5-f0f967d4939b)


## Features

| Feature                    | Description                                           |
|----------------------------|-------------------------------------------------------|
| QR Code Generation         | Allows users to generate QR codes for facilitating quick Solana transfers. |                              
| Balance Display            | Shows the current balance in the user's account.      |
| Transaction History        | Records and displays a history of transactions made using the application. |
| Shared Payments            | Enables users to split payments among multiple users by generating "Party's." |
| Network Configuration      | Allow on Testnet network.                             |
| Wallet Support             | Compatible with multiple Solana wallets for easy fund management. |
| Security                   | Implements security measures such as data encryption and user authentication. |


# Authors

- [@srteerra](https://www.github.com/srteerra) - Angel Lopez
- [@Guapura89](https://www.github.com/Guapura89) - Carlos Sanchez
- [@jonocrod12](https://github.com/jonocrod12) - Jonathan Ocampo

# Demo on Figma
[Zoren Board](https://www.figma.com/file/8PkusBk9mHVHcYBrk95RUb/Zoren?type=design&node-id=0%3A1&mode=design&t=XzmyoiNZoHEyKbN8-1)

# Quick start
Here is what you need to run Zoren locally:
#### Requirements: 
 - A Web Browser such [Firefox](https://www.mozilla.org/en-US/firefox/new/) or [Google Chrome](https://www.google.com/intl/en/chrome/).
 - [Phantom](https://phantom.app/download) extension.
 - [Node.js](https://nodejs.org/es/) ^ 16.0.0 

## Installation:
### 1. First you need to create a folder, where you will save the project. (Optional)
```bash
mkdir Zoren
```
### 2. Move on terminal to the new folder.
```bash
cd Zoren/
```
### 3. Clone the repository
```bash
git clone https://github.com/srteerra/Zoren.git
```
### 4. Move on terminal to the new repo folder.
```bash
cd Zoren
```
### 5. Install dependences with:
```bash
npm install
```

#### And there you have, Bitcoffee locally!!
### For development environment
Execute the following command:
```bash
npm run dev
```
It may take a few minutes to set up the application, so stay calm!
#### The default port is **3000**
```bash
http:/localhost:3000/
```


# Project Structure

    $ Zoren Tree
    Zoren/
    ├── .next:                                  
    │   ├── cache/:                             # Next.js cache files
    │ 	├──	server/:                        # Server-related files
    │ 	├── static/:                            # Static files
    │ 	├── build-manifest.json                 # Build manifest for fallback
    │ 	├── fallback-build-manifest.json
    │ 	├── package.json                        # Package configuration
    │ 	├── react-loadable-manifest.json
    │ 	└──	trace                           # Trace file
    ├── .vscode/:
    │    └── settings.json                      # VS Code configuration 
    ├── lib/:  
    │    └── sanitClient.js                     # Sanitization client file    
    ├── node_modules/:                          # Folder for all project modules.
    ├── public/:
    │	│	├── icons/
    │	│	├── images/
    │	│	├── locales/
    │	│	├── logos/
    │	│	├── favicon.ico
    │	│	├── next.svg
    │	│	└── vercel.svg                          
    ├── src/:                                   # Folder for development content.
    │    ├── components/:                       # Reusable React components
    │    ├── actions/:                         
    │    │    ├── ActionBills.jsx               # Actions related to bills
    │    │    └── ActionDash.jsx                # Actions related to the dashboard     
    │    ├──billFuntions/:                        
    │    │    ├──deleteModal.jsx                # Modal for deleting bills
    │    │    └──setBillModal.jsx               # Modal for setting up bills   
    │    ├── transactions/:
    │    │    └── TransactionsQRModal.jsx       # QR transactions modal
    │    │                                      # Other components and files               
    │    ├── Billtem.jsx                        
    │    ├── CollectionItem.jsx
    │    ├── DarkMode.jsx
    │    ├── EditProfileModal.jsx
    │    ├── Footer.jsx
    │    ├── LoginNav.jsx
    │    ├── Modal.jsx
    │    ├── Nav.jsx
    │    ├── Profile.jsx
    │    ├── RecentBill.jsx
    │    ├── RecentTransactions.jsx
    │    ├── Region.jsx
    │    └── Sidebar.jsx                           
    ├── containers/: 
    │        └── Collections.jsx                # Collections component                
    ├── context/:                                 
    │    ├── AppContext.jsx                     # Application context 
    │    └── WalletConectioProvider.js          # Wallet connection provider      
    ├── hooks/
    │    ├── useGetCollection.js                # Hook for getting collections
    │    ├── useInitialState.js                 # Hook for initial state     
    │    └── useZoren.js                        # Hook related to Zoren
    ├── pages/
    │    ├── api/                               # API routes
    │    ├── bills/
    │    ├── dashboard/                         # Pages related to the dashboard
    │    ├── friends/                           # Pages related to friends management
    │    ├── app.js                             # Application file
    │    ├── _document.js
    │    ├── index.js                           # Home page
    │    └── layout.js                          # Layout file
    ├── styles/
    │    └── globals.css                        # Global stylesheet file
    ├── utils/
    │    └── string.js                          # String manipulation functions
    ├── firebase.js                             # Firebase configuration
    ├── studio/
    │    ├── schemas/                           # Studio schemas
    │    │    ├── index.js                      # Schema index
    │    │    └── users.js                      # User schema
    │    └── static/
    │         └── .gitkeep                      # Placeholder to keep the directory in version control
    ├── .eslintrc.json                          # ESLint configuration
    ├── .gitignore                              # Git ignore configuration file
    ├── jsconfig.json
    ├── next-i18next.config.js
    ├── next.config.js                          # Next.js configuration
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js                       # PostCSS configuration
    ├── README.md:                              # Main project documentation          
    └── tailwind.config.js                      # Tailwind CSS configuration              
