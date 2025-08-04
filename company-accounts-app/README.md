# Company Accounts Management System

A professional Next.js application for managing company financial accounts, built with TypeScript and Tailwind CSS for optimal performance and user experience.

## 🚀 Features

- **Complete Financial Interface**: Replicates the original desktop application with modern web technologies
- **Real-time Calculations**: Automatic computation of equity totals and balance validation
- **Performance Optimized**: 
  - React.memo for component optimization
  - Custom hooks for calculation logic
  - Efficient state management
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Export Functionality**: Export financial data to JSON format
- **Professional UI**: Clean, modern interface with smooth transitions

## 🛠️ Technology Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hooks** for state management

## 📋 Requirements

- Node.js 18.0 or higher
- npm or yarn package manager

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd company-accounts-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 📁 Project Structure

```
company-accounts-app/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and Tailwind configuration
│   │   ├── layout.tsx           # Root layout with metadata
│   │   └── page.tsx             # Home page
│   ├── components/
│   │   ├── CompanyAccountsApp.tsx    # Main application component
│   │   ├── FinancialDataInput.tsx    # Optimized input component
│   │   └── TabNavigation.tsx         # Tab navigation component
│   └── hooks/
│       └── useFinancialCalculations.ts # Custom hook for calculations
├── package.json
└── README.md
```

## 🎯 Key Components

### CompanyAccountsApp
Main application component that manages:
- Company information (type, country, year)
- Financial data state
- Tab navigation
- Export functionality

### FinancialDataInput
Optimized input component with:
- React.memo for performance
- Consistent styling
- Number input validation

### useFinancialCalculations
Custom hook providing:
- Real-time equity calculations
- Balance validation
- Memoized computations for performance

## 💰 Financial Features

### Capital Management
- Ordinary Share Capital
- Preference Share Capital
- Capital Reserve
- General Reserve
- Unappropriated Profit
- Other Retained Earnings
- Surplus on Revaluation
- Unrealized Gains
- Directors/Sponsors Loan
- Subordinated Debt

### Calculations
- **Total Equity (Tier 1)**: Sum of core capital components
- **Total Equity**: Complete equity calculation
- **Balance Validation**: Real-time balance checking

### Additional Tabs
Framework ready for:
- Liabilities
- Assets
- Revenues
- Expenses
- Cash Flow
- Risk Management

## 🎨 UI/UX Features

- **Window-style Interface**: Mimics desktop application design
- **Professional Color Scheme**: Blue gradient theme
- **Responsive Layout**: Adapts to all screen sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Form Validation**: Real-time input validation
- **Quick Actions**: Sample data loading and reset functionality

## ⚡ Performance Optimizations

1. **Component Memoization**: React.memo prevents unnecessary re-renders
2. **Custom Hooks**: Separate calculation logic for better maintainability
3. **Efficient State Updates**: useCallback for event handlers
4. **Tailwind CSS**: Utility-first CSS for optimal bundle size
5. **Font Optimization**: Inter font with display swap

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 🚀 Deployment

The application can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- Database integration
- User authentication
- Multi-company support
- Advanced reporting
- PDF export functionality
- Audit trail features
- Integration with accounting systems

---

Built with ❤️ using Next.js and modern web technologies.
