
> Modern React website for Dough & Beats, featuring authentic Italian street food with a clean, responsive design.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Git for version control

### Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/dhrubo/doughandbeats.github.io.git
cd doughandbeats.github.io

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The development server will start at `http://localhost:8080` with hot reloading enabled.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:8080 |
| `npm run build` | Build for production |
| `npm run build:clean` | Clean build (removes dist/ first) |
| `npm run preview` | Preview production build at localhost:4173 |
| `npm run preview:dist` | Build and preview in one command |
| `npm run update:instagram` | Update Instagram feed from live profile |
| `npm run lint` | Run ESLint code analysis |
| `./test-build.sh` | Test build compatibility and verify setup |

## 🏗️ Build Process

### Local Build & Testing

```bash
# Clean build for production
npm run build:clean

# Test the build locally
npm run preview:dist

# Verify build compatibility
./test-build.sh
```

The build process:
- Transforms 1700+ TypeScript/React modules
- Generates optimized bundles (~370KB JS, ~67KB CSS)
- Creates production-ready assets in `dist/` directory
- Ensures compatibility with GitHub Pages deployment

## 📸 Instagram Feed Integration

This site includes a **token-free Instagram feed** that works entirely with static assets, perfect for GitHub Pages hosting.

### How It Works

1. **Scraper Script**: `scripts/fetch-instagram.js` fetches your public Instagram profile and extracts post data
2. **Static JSON**: Posts are saved to `public/instagram.json` for static serving
3. **React Component**: `InstagramFeed.tsx` displays the feed as a responsive 3x3 grid
4. **Auto Updates**: GitHub Actions workflow updates the feed daily

### Local Development

```bash
# Update Instagram feed manually
npm run update:instagram

# Or specify a different username
node scripts/fetch-instagram.js your_username

# The feed will be available at /instagram.json
```

### Instagram Feed Management

#### Manual Updates
- Run `npm run update:instagram` locally to refresh the feed
- The script downloads post images to `public/instagram/` for faster loading
- Commit the updated `public/instagram.json` and images to deploy changes

#### Automated Updates
- **Daily**: GitHub Actions runs the scraper every day at 6 AM UTC
- **Manual**: Use the "Update Instagram Feed" workflow in GitHub Actions
- **Auto-deploy**: Changes are automatically committed and deployed

#### Workflow Files
- `.github/workflows/update-insta.yml` - Instagram feed updater
- `.github/workflows/deploy.yml` - Site deployment (runs after feed updates)

#### Customization
- Edit `INSTAGRAM_USERNAME` in the script to change accounts
- Modify `MAX_POSTS` to show more/fewer posts
- Update the `InstagramFeed` component for different layouts

