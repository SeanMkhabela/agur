# Augur Distribution Dashboard

A modern dashboard for the Augur distribution system that displays metrics and analytics for distributors.

## Features

- **Overview Dashboard**: Shows aggregate metrics for all distributors
- **Distributor Details**: Individual distributor pages with detailed metrics
- **Interactive Charts**: Visual representation of shipment history
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Search & Filter**: Easily find distributors by name, region, or other attributes

## Tech Stack

- **Next.js**: React framework with server-side rendering capabilities
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Recharts**: Composable charting library for React
- **Heroicons**: Beautiful hand-crafted SVG icons

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/augur-dashboard.git
cd augur-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── distributors/       # Distributor pages
│   │   ├── [id]/           # Individual distributor page
│   │   └── page.tsx        # All distributors page
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   └── page.tsx            # Dashboard homepage
├── components/             # Reusable UI components
│   ├── Header.tsx          # Main navigation header
│   ├── StatCard.tsx        # Metrics card component
│   ├── ShipmentChart.tsx   # Chart component
│   └── DistributorTable.tsx # Distributor table component
├── lib/                    # Utility functions and data
│   ├── types.ts            # TypeScript type definitions
│   └── mockData.ts         # Mock data for development
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Integration with Backend

The dashboard is currently populated with mock data. To integrate with a real backend:

1. Replace the mock data imports with API calls in the pages
2. Create API service files for different data requirements
3. Update types to match the API response structure

## Future Enhancements

- Authentication/Authorization
- Real-time data updates
- Advanced filtering and analytics
- Forecasting algorithms
- Data export functionality

## License

This project is licensed under the MIT License. 