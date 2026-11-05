# FINTRACK

Personal finance tracker for creators. React + Vite + Chart.js. Data is saved in the browser (localStorage).

## Run locally
```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the build
```

## Deploy
1. Push this folder to a GitHub repository.
2. On vercel.com choose Add New > Project, import the repository.
3. Vercel detects Vite automatically (Build: `npm run build`, Output: `dist`). Click Deploy.

## Structure
```
src/
  main.jsx            entry point
  App.jsx             layout, navigation, modals
  index.css           all styles
  utils/helpers.js    formatting, dates, calculations
  data/seed.js        demo data + localStorage hook
  components/         charts, UI pieces, forms
  pages/              Dashboard, Transactions, Budgets, Goals, Invoices, Reports
```
