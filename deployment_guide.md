
# FreshGuard AI - Deployment Guide

This project consists of a React frontend that mimics the behavior of a sophisticated ML model using bio-decay logic and the Google Gemini API for explainability.

## 1. Environment Configuration
Create a `.env` file in your root directory:
```
API_KEY=your_gemini_api_key_here
```

## 2. Frontend Deployment (Vercel/Netlify/Render)
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework Preset: `Vite`

## 3. Backend Integration (Optional Expansion)
To deploy the Python ML script as a real API:
1. Install FastAPI: `pip install fastapi uvicorn scikit-learn pandas joblib`
2. Run the `ml_model.py` script provided in this repo to generate `spoilage_model.joblib`.
3. Create an `app.py` with FastAPI endpoints that load the `.joblib` model and serve predictions.
4. Update the React `predictionService.ts` to fetch from your backend URL instead of calculating locally.

## 4. Key Production Features
- **Explainable AI:** Uses Gemini to decode mathematical risk into actionable human advice.
- **Local Persistence:** Data is stored in the browser's LocalStorage for a true "zero-login" MVP experience.
- **Responsive UI:** Fully optimized for mobile kitchen tracking.
