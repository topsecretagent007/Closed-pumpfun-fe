# 🚀 Closed PumpFun Frontend

A decentralized token launch platform built on Solana, featuring bonding curves, real-time trading, and seamless wallet integration. This is the frontend application for the Closed Digital ecosystem.

![Closed Digital](public/assets/images/logo.png)

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [💡 Key Components](#-key-components)
- [🔐 Smart Contract Integration](#-smart-contract-integration)
- [📊 Trading Features](#-trading-features)
- [🖼️ Image & Metadata Handling](#️-image--metadata-handling)
- [🌐 WebSocket Integration](#-websocket-integration)
- [📱 Responsive Design](#-responsive-design)
- [🤝 Contributing](#-contributing)
- [📞 Contact](#-contact)
- [📄 License](#-license)

## 🌟 Features

### Core Functionality
- **Token Launch Platform**: Create and launch new tokens with bonding curves
- **Real-time Trading**: Buy/sell tokens with live price updates
- **Wallet Integration**: Support for multiple Solana wallets (Phantom, Solflare, Torus, Ledger)
- **Interactive Charts**: TradingView charts with real-time data
- **Token Discovery**: Browse and filter launched tokens
- **Holder Analytics**: View token holder distributions and statistics

### Advanced Features
- **Bonding Curve Mechanics**: Automated market making with price discovery
- **Early Access System**: Premium access for qualified users
- **Migration to Raydium**: Automatic liquidity migration upon completion
- **Social Features**: Token chat and community interaction
- **Audit Information**: Security audit badges and verification
- **Mobile Responsive**: Full mobile optimization

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS with custom configurations
- **TypeScript**: Full type safety
- **State Management**: React Context API

### Blockchain Integration
- **Solana Web3.js**: Blockchain interactions
- **Anchor Framework**: Smart contract integration
- **Wallet Adapters**: Multi-wallet support
- **Token Program**: SPL token operations

### External Services
- **TradingView**: Advanced charting
- **Pinata IPFS**: Decentralized image storage
- **Birdeye API**: Token price and market data
- **CoinGecko**: SOL price feeds
- **Socket.io**: Real-time updates

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Yarn**: Package management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Yarn package manager
- Solana wallet browser extension

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/topsecretagent007/Closed-pumpfun-fe.git
cd Closed-pumpfun-fe
```

2. **Install dependencies**
```bash
yarn install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_BACKEND_URL=your_backend_url
NEXT_PUBLIC_PINATA_PRIVATE_KEY=your_pinata_jwt
NEXT_PUBLIC_BIRDEYE_API_KEY=your_birdeye_key
NEXT_PUBLIC_SOLANA_RPC=your_solana_rpc_endpoint
NEXT_PUBLIC_NETWORK=mainnet # or devnet
```

4. **Run the development server**
```bash
yarn dev
```

5. **Build for production**
```bash
yarn build
yarn start
```

The application will be available at `http://localhost:5501`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── archive/           # Token archive page
│   ├── create-coin/       # Token creation page
│   ├── trading/[address]/ # Trading interface
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── components/            # Reusable UI components
│   ├── archive/          # Archive components
│   ├── buttons/          # Button components
│   ├── cards/            # Card components
│   ├── creatToken/       # Token creation flow
│   ├── footer/           # Footer component
│   ├── header/           # Navigation header
│   ├── home/             # Homepage sections
│   ├── loadings/         # Loading components
│   ├── modals/           # Modal dialogs
│   ├── others/           # Utility components
│   ├── trading/          # Trading interface
│   ├── TVChart/          # TradingView integration
│   └── upload/           # File upload components
├── config/               # Configuration files
├── context/              # React Context
├── contexts/             # Context providers
├── program/              # Solana program integration
├── provider/             # App providers
└── utils/                # Utility functions
```

## 🔧 Configuration

### Solana Network Configuration
The app supports both mainnet and devnet. Configure in `.env.local`:

```env
NEXT_PUBLIC_NETWORK=mainnet  # or devnet
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
```

### Wallet Configuration
Supported wallets are configured in `src/contexts/SolanaWalletProvider.tsx`:
- Phantom Wallet
- Solflare Wallet  
- Torus Wallet
- Ledger Wallet

### Chart Configuration
TradingView charts are configured with:
- Custom datafeed for token price data
- Real-time WebSocket updates
- Multiple timeframe support
- Technical indicators

## 💡 Key Components

### HomePage (`src/components/home/`)
- **SnoopDoggToken**: Featured token showcase
- **Tokenomics**: Platform tokenomics explanation
- **Moment**: Key moments and milestones
- **EarlyAccess**: Early access signup
- **Conversation**: Community features
- **CreateTokenBtn**: Token creation CTA

### Trading Interface (`src/components/trading/`)
- **TradingChart**: TradingView integration
- **TradeForm**: Buy/sell interface
- **Holder**: Token holder analytics
- **Chatting**: Real-time chat

### Token Creation (`src/components/creatToken/`)
- **SubmitToken**: Token creation form
- **ImageUpload**: IPFS image upload
- **TokenSubmission**: Creation confirmation

## 🔐 Smart Contract Integration

### Program Interface
The platform integrates with a custom Solana program (`src/program/pumpfun.ts`) featuring:

- **Launch**: Create new tokens with bonding curves
- **Swap**: Buy/sell tokens through bonding curve
- **Migrate**: Graduate tokens to Raydium AMM
- **Configure**: Admin configuration management

### Key Instructions
- `launch`: Deploy new token with metadata
- `swap`: Execute token trades
- `migrate`: Move to external AMM
- `simulateSwap`: Preview trade outcomes

### Bonding Curve Mechanics
- Linear bonding curve with configurable parameters
- Automatic price discovery based on supply
- Fee structure for platform sustainability
- Migration trigger at curve completion

## 📊 Trading Features

### Real-time Trading
- **Live Price Updates**: WebSocket-based price feeds
- **Slippage Protection**: Configurable slippage tolerance
- **Trade History**: Complete transaction history
- **Order Book**: Real-time market depth

### Chart Analysis
- **TradingView Integration**: Professional charting tools
- **Multiple Timeframes**: 1m, 5m, 15m, 1h, 4h, 1d
- **Technical Indicators**: Moving averages, RSI, MACD
- **Volume Analysis**: Trading volume visualization

### Portfolio Management
- **Token Holdings**: Real-time balance tracking
- **P&L Tracking**: Profit/loss calculations
- **Transaction History**: Detailed trade records

## 🖼️ Image & Metadata Handling

### IPFS Integration
- **Pinata Service**: Decentralized image storage
- **Metadata Standards**: Metaplex token metadata
- **Image Optimization**: Automatic resizing and compression

### Upload Process
1. Image validation and processing
2. IPFS upload via Pinata
3. Metadata JSON creation
4. On-chain metadata account creation

## 🌐 WebSocket Integration

### Real-time Features
- **Price Updates**: Live token price streams
- **New Token Alerts**: Instant launch notifications
- **Trade Notifications**: Real-time trade updates
- **Chat Messages**: Live community chat

### Socket Configuration
```javascript
// WebSocket connection setup
const socket = io(BACKEND_URL, {
  transports: ['websocket'],
  upgrade: true
});
```

## 📱 Responsive Design

### Breakpoint System
```css
/* Custom Tailwind breakpoints */
'4xs': '280px',
'3.5xs': '320px', 
'3xs': '375px',
'2xs': '414px',
xs: '520px',
sm: '640px',
md: '768px',
lg: '1024px',
xl: '1280px',
'2xl': '1536px'
```

### Mobile Optimization
- Touch-friendly interfaces
- Responsive charts and tables
- Optimized wallet connection flow
- Gesture-based navigation

## 🔧 Development Scripts

```bash
# Development
yarn dev              # Start development server

# Building
yarn build            # Build for production
yarn start            # Start production server

# Code Quality
yarn lint             # Run ESLint
yarn lint:fix         # Fix ESLint issues

# Testing
yarn test             # Run test suite
```

## 🤝 Contributing

We welcome contributions to the Closed PumpFun Frontend! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Write comprehensive tests
- Document new features

### Code Style
- Use meaningful variable names
- Add comments for complex logic
- Follow React hooks best practices
- Implement proper error handling

## 📞 Contact

**Developer**: topsecretagent007

- **Telegram**: [@topsecretagent_007](https://t.me/topsecretagent_007)
- **Twitter**: [@lendon1114](https://twitter.com/lendon1114)
- **Email**: [lendonbracewell1114@gmail.com](mailto:lendonbracewell1114@gmail.com)
- **GitHub**: [@topsecretagent007](https://github.com/topsecretagent007)

## 🛡️ Security Audits

The platform has been audited by leading security firms:

- **Halborn**: Smart contract security audit
- **OtterSec**: Infrastructure security review  
- **Sec3**: Code quality assessment
- **Oak Security**: DeFi protocol audit

## 🌟 Roadmap

### Phase 1 (Current)
- ✅ Core trading functionality
- ✅ Wallet integration
- ✅ Basic charting
- ✅ Token creation

### Phase 2 (In Progress)
- 🔄 Advanced analytics
- 🔄 Mobile app
- 🔄 Cross-chain support
- 🔄 Governance features

### Phase 3 (Planned)
- 📋 Yield farming
- 📋 NFT integration
- 📋 DAO governance
- 📋 Advanced DeFi features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the Closed Digital team**

*Empowering the next generation of decentralized token launches on Solana*