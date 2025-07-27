# BazarLink - E-commerce Platform

BazarLink is a comprehensive e-commerce platform designed for wholesale buying and selling, specifically tailored for street food vendors and small businesses.

## Features

- **Buyer Dashboard**: Browse products, manage cart, place orders
- **Seller Dashboard**: Manage products, customers, and orders
- **Authentication**: Secure login and registration system
- **Responsive Design**: Works on desktop and mobile devices
- **Supabase Integration**: Real-time database and authentication

## Tech Stack

- HTML5, CSS3, JavaScript (Vanilla)
- Supabase (Database & Authentication)
- Font Awesome (Icons)
- Vercel (Deployment)

## Project Structure

```
root/
├── index.html              # Main landing page
├── login.html              # Login page
├── signup.html             # Registration page
├── buyer/                  # Buyer interface
│   ├── home.html          # Buyer dashboard
│   ├── category.html      # Product categories
│   ├── product.html       # Product details
│   ├── cart.html          # Shopping cart
│   ├── checkout.html      # Checkout process
│   ├── orders.html        # Order history
│   └── profile.html       # User profile
├── dashboard/             # Seller interface
│   ├── seller.html        # Main seller dashboard
│   ├── product-manager.html # Product management
│   ├── customer-manager.html # Customer management
│   ├── profile.html       # Seller profile
│   └── edit-product.html  # Product editing
├── css/                   # Stylesheets
├── js/                    # JavaScript files
├── assets/                # Images and static assets
└── vercel.json           # Vercel deployment config
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bazarlink.git
cd bazarlink
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL commands from `supabase-setup.sql`
   - Update environment variables in your deployment platform

4. Start the development server:
```bash
npm run dev
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Follow the prompts to configure your deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

## Environment Variables

Create a `.env` file with your Supabase credentials:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email info@bazarlink.com or create an issue in the GitHub repository. #
