# Sir Sarcastic

A minimalist, dry-witted chatbot, built to respond with a touch of cynical charm. Don't expect sunshine and rainbows; Sir Sarcastic is here to deliver truths, unvarnished and unimpressed.

---

## Features

* **Sarcastic Personality:** Experience AI interaction with a unique, dry, and often dismissive tone. Sir Sarcastic is always ready with a witty retort or a subtle eye-roll.
* **Minimalist Interface:** A clean and straightforward chat interface, ensuring the focus remains on Sir Sarcastic's delightful cynicism.
* **Gemini API Powered:** Leverages the robust capabilities of the Google Gemini API for its conversational prowess.
* **Modern Stack:** Built with **React** for a responsive UI, **TypeScript** for robust code, and styled with **Tailwind CSS** for a sleek, utility-first design.

---

## Technologies Used

* **React:** Frontend library for building user interfaces.
* **TypeScript:** Superset of JavaScript for type-safe development.
* **Tailwind CSS:** Utility-first CSS framework for rapid styling.
* **Google Gemini API:** Powers the conversational AI capabilities.

---

## Setup and Installation

To get Sir Sarcastic up and running locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/udaykiranch2/chat-bot.git](https://github.com/udaykiranch2/chat-bot.git)
    cd chat-bot
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Gemini API Key:**
    * Create a `.env` file in the root of your project.
    * Add your Gemini API key:

        ```
        VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
        ```
    * Replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API Key.

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The app should now be running on `http://localhost:5173` (or another port if 5173 is in use).

---

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages.

1.  **Install `gh-pages`:**

    ```bash
    npm install --save-dev gh-pages
    # or
    yarn add --dev gh-pages
    ```

2.  **Configure `package.json`:**
    Ensure your `package.json` includes the following scripts:

    ```json
    "scripts": {
      "dev": "vite",
      "build": "tsc -b && vite build",
      "lint": "eslint .",
      "preview": "vite preview",
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }

---

## Contribution

Feel free to explore, fork, and contribute. Pull requests are welcome!

---

If you found "Sir Sarcastic" amusing or helpful, please consider giving the repository a star!
