# Sir Sarcastic

A minimalist, dry-witted chatbot, built to respond with a touch of cynical charm. Don't expect sunshine and rainbows; Sir Sarcastic is here to deliver truths, unvarnished and unimpressed.

---

## Features

* **Sarcastic Personality:** Experience AI interaction with a unique, dry, and often dismissive tone. Sir Sarcastic is always ready with a witty retort or a subtle eye-roll.
* **Minimalist Interface:** A clean and straightforward chat interface, ensuring the focus remains on Sir Sarcastic's delightful cynicism.
* **Dual Provider Support:** Run with a local LLM via Ollama (LLaMA 3) for fully offline use, or connect to the Gemini cloud API.
* **Modern Stack:** Built with **React** for a responsive UI, **TypeScript** for robust code, and styled with **Tailwind CSS** for a sleek, utility-first design.

---

## Technologies Used

* **React:** Frontend library for building user interfaces.
* **TypeScript:** Superset of JavaScript for type-safe development.
* **Tailwind CSS:** Utility-first CSS framework for rapid styling.
* **Ollama:** Serves LLaMA 3 locally as an OpenAI-compatible API.
* **Google Gemini API:** Cloud-based alternative for the LLM backend.

---

## Setup and Installation

To get Sir Sarcastic up and running locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/udaykiranch2/chat-bot.git
    cd chat-bot
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure your LLM provider** — choose one:

    **Option A: Local LLM (Ollama + LLaMA 3)** — no API keys needed, fully offline

    * Install Ollama from [ollama.com](https://ollama.com)
    * Pull the LLaMA 3 model:

        ```bash
        ollama pull llama3
        ```

    * Start the Ollama server:

        ```bash
        ollama serve
        ```

    * Verify it's running at `http://localhost:11434` — you should see "Ollama is running".
    * **No `.env` configuration needed.** The app auto-detects and uses Ollama when `VITE_API_URL` is not set.

    **Option B: Gemini Cloud API**

    * Create a `.env` file in the project root:

        ```
        VITE_API_URL=YOUR_GEMINI_API_URL
        VITE_API_KEY=YOUR_GEMINI_API_KEY
        ```

    * Replace with your actual Gemini API URL and key.
    * When `VITE_API_URL` is set, the app uses the Gemini cloud API instead of Ollama.

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
    "home": "https://GITHUB_USER_NAME.github.io/REPO_NAME/"
    "scripts": {
      "dev": "vite",
      "build": "tsc -b && vite build",
      "lint": "eslint .",
      "preview": "vite preview",
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
 * Replace `GITHUB_USER_NAME` with your actual github user name and `REPO_NAME` with your repository name.
---

## Contribution

Feel free to explore, fork, and contribute. Pull requests are welcome!

---

If you found "Sir Sarcastic" amusing or helpful, please consider giving the repository a star!
