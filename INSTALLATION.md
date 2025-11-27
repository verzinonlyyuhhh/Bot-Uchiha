# Installation Guide for Bot-Uchiha

## Table of Contents

1. [Installation on Termux](#installation-on-termux)
2. [Installation on Linux](#installation-on-linux)
3. [Installation on Windows](#installation-on-windows)
4. [Deployment on Render](#deployment-on-render)
5. [Troubleshooting](#troubleshooting)

## Installation on Termux

1. **Install Termux from the Play Store** or [F-Droid](https://f-droid.org/).
2. **Update packages:**
   ```sh
   pkg update && pkg upgrade
   ```
3. **Install necessary dependencies:**
   ```sh
   pkg install git python python-dev clang
   ```
4. **Clone the repository:**
   ```sh
   git clone https://github.com/rubensilver/Bot-Uchiha.git
   cd Bot-Uchiha
   ```
5. **Install required Python packages:**
   ```sh
   pip install -r requirements.txt
   ```

## Installation on Linux

1. **Open a terminal.**
2. **Update your package list:**
   ```sh
   sudo apt update
   ```
3. **Install necessary dependencies:**
   ```sh
   sudo apt install git python3 python3-dev python3-pip
   ```
4. **Clone the repository:**
   ```sh
   git clone https://github.com/rubensilver/Bot-Uchiha.git
   cd Bot-Uchiha
   ```
5. **Install required Python packages:**
   ```sh
   pip3 install -r requirements.txt
   ```

## Installation on Windows

1. **Download and install Git for Windows from** [git-scm.com](https://git-scm.com/).
2. **Download and install Python from** [python.org](https://www.python.org/downloads/). Make sure to check "Add Python to PATH".
3. **Open Command Prompt or PowerShell.**
4. **Clone the repository:**
   ```sh
   git clone https://github.com/rubensilver/Bot-Uchiha.git
   cd Bot-Uchiha
   ```
5. **Install required Python packages:**
   ```sh
   pip install -r requirements.txt
   ```

## Deployment on Render

1. **Create a Render account** on [render.com](https://render.com/).
2. **Create a new web service** and connect your GitHub repository.
3. **Set the environment variables** if needed (you can find these in the repository settings).
4. **Deploy your application.**

## Troubleshooting

- **Error: `ModuleNotFoundError`:**
  Ensure all dependencies in `requirements.txt` are installed.
- **On Termux, if you encounter issues:**
  - Ensure you have all the latest updates for Termux.
  - Check if the required packages are correctly installed.

- **For Render deployment failures:**
  - Check the logs in your Render dashboard for specific error messages.
  - Ensure that you have set the correct environment variables.

---

**Note:** For any other issues, refer to the issue section of this repository or consult the official documentation of the respective platforms.
