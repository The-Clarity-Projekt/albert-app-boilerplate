# alBERT: Democratizing Knowledge Discovery

An AI-powered decentralized search engine with a generative UI, empowering individuals to contribute to a global index of web content.

> [!NOTE]
> This repository contains the core source code for alBERT as a boilerplate for anyone to fork and build answer engines on. A sample implementation of alBERT's service done for the Socrathink browser is at [app.socrathink.com](https://app.socrathink.com) includes additional features like authentication and the reward mechanism.

## 🗂️ Overview

- 🛠 [Features](#-features)
- 🧱 [Stack](#-stack)
- 🚀 [Quickstart](#-quickstart)
- 🌐 [Deploy](#-deploy)
- 🔎 [Contribute to alBERT Search](#-contribute-to-albert-search)
- ✅ [Verified models](#-verified-models)

## 🛠 Features

- Decentralized search and answer using GenerativeUI
- Browser-based web indexing
- Proof of Creativity reward mechanism
- Search history functionality
- Share search results
- Get answers from specified URLs
- Support for multiple AI providers
- Decentralized vector database

## 🧱 Stack

- App framework: [Next.js](https://nextjs.org/)
- Text streaming / Generative UI: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- Generative Model: Multiple providers (OpenAI, Google, Anthropic, etc.)
- Search API: Custom alBERT protocol
- Decentralized Database: Custom vector database
- Component library: [shadcn/ui](https://ui.shadcn.com/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Quickstart

### 1. Clone the repo

```
git clone https://github.com/The-Clarity-Projekt/albert-app-boilerplate.git
cd albert
```

### 2. Install dependencies

```
npm install
```

### 3. Set up your environment

Copy the example environment file:

```
cp .env.local.example .env.local
```

Edit `.env.local` to include your AI provider API key and other necessary configurations.

### 4. Run the development server

```
npm run dev
```

Visit http://localhost:3000 in your browser.

## 🌐 Deploy

Deploy your own alBERT node with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FThe-Clarity-Projekt%2F/albert-app-boilerplate)

## 🔎 Contribute to alBERT Search

To contribute to the alBERT search index and earn rewards:

1. Install the alBERT browser from our website.
2. Browse the web as you normally would. The extension will automatically index new pages you visit.
3. Your contributions are evaluated based on the Proof of Creativity mechanism, which assesses the novelty and value of the indexed content.
4. Earn rewards for your unique contributions to the global knowledge index.

The more you browse and the more unique content you discover, the more you contribute to democratizing knowledge access and the more rewards you can earn.

## ✅ Verified models

alBERT supports various AI models for generating responses:

- OpenAI: gpt-4, gpt-3.5-turbo
- Google: Gemini Pro
- Anthropic: Claude 2
- Ollama: llama2
- alBERT-large: Our specialized model for decentralized search (coming soon)

To use a specific model, set the `AI_PROVIDER` and `AI_MODEL` in your `.env.local` file.

---

Join us in building a more open, diverse, and democratized knowledge discovery platform!
