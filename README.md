# Accessible iframe focus

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/nathanwrightumbrellaheals-projects/v0-accessible-iframe-focus)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/faB6KgjXyPr)

## Overview

A demonstration of accessible iframe implementation with proper keyboard navigation and focus management. This project showcases how to create iframes that are fully accessible to keyboard users and screen readers, with visible focus states and intuitive navigation patterns.

## Features

- **Accessible iframe containers** with visible focus states and ARIA labels
- **Keyboard navigation** using CMD+I to toggle between iframe container and content
- **Same-origin forms** to enable proper focus management and keyboard shortcuts
- **Screen reader support** with live region announcements
- **Cross-browser compatibility** with proper event handling

## Demo Forms

The project includes two sample forms for testing iframe accessibility:

1. **Contact Form** (`/form1`) - Name, email, subject, and message fields
2. **User Registration** (`/form2`) - Username, password, account type, and preferences

## Setup and Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Local Development

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/accessible-iframe-focus.git
cd accessible-iframe-focus
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Keyboard Navigation

- **Tab** - Navigate to iframe containers in the page tab order
- **CMD+I** - Toggle between iframe container and iframe content
- **Tab/Shift+Tab** - Navigate within iframe content when focused
- **Escape** - Alternative way to exit iframe content (fallback)

### Accessibility Features

- Each iframe has a visible blue focus ring when selected
- Tooltips appear when iframe containers are focused
- Screen reader announcements for navigation state changes
- Proper ARIA labels and descriptions for all interactive elements

## Technical Implementation

### Key Components

- `components/accessible-iframe.tsx` - Main accessible iframe wrapper component
- `app/form1/page.tsx` - Contact form for iframe testing
- `app/form2/page.tsx` - Registration form for iframe testing

### Architecture

The solution uses focusable wrapper divs around iframes to intercept keyboard navigation before it reaches the iframe content. This allows for:

- Consistent focus management across different iframe sources
- Global keyboard shortcuts that work regardless of iframe content
- Proper screen reader announcements and ARIA support
- Same-origin communication for enhanced accessibility features

## Deployment

Your project is live at:

**[https://vercel.com/nathanwrightumbrellaheals-projects/v0-accessible-iframe-focus](https://vercel.com/nathanwrightumbrellaheals-projects/v0-accessible-iframe-focus)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/faB6KgjXyPr](https://v0.app/chat/projects/faB6KgjXyPr)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Contributing

This project demonstrates accessibility best practices for iframe implementation. When contributing:

- Ensure all interactive elements are keyboard accessible
- Test with screen readers (VoiceOver, NVDA, JAWS)
- Maintain WCAG 2.1 AA compliance
- Document any new accessibility features or patterns

## License

MIT License - see LICENSE file for details
