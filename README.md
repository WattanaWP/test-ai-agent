# Nuxt 3 + Tailwind CSS Project

Complete Vue 3 + Nuxt 4 + Tailwind CSS project with Bun package manager.

## Prerequisites

- **Node.js**: Latest LTS version (specified in `.nvmrc`)
- **Bun**: Latest version
- **NVM**: Node Version Manager (for managing Node versions)

## Setup Instructions

### 1. Install Node.js (if not already installed)

```bash
# Install Node.js via NVM
nvm install node

# Use the specified Node version
nvm use
```

### 2. Install Bun (if not already installed)

```bash
curl -fsSL https://bun.sh/install | bash
```

### 3. Install Project Dependencies

```bash
# Navigate to project directory
cd /Users/wattana/work/test/ai-agent

# Install dependencies with Bun
bun install
```

## Development

### Start Development Server

```bash
bun run dev
```

The development server will start at **http://localhost:3000**

### Build for Production

```bash
bun run build
```

### Generate Static Site

```bash
bun run generate
```

### Preview Production Build

```bash
bun run preview
```

## Project Structure

```
├── app.vue                 # Root component
├── assets/
│   └── css/
│       └── main.css        # Tailwind CSS directives
├── components/             # Reusable Vue components
├── pages/                  # File-based routes
├── layouts/                # Layout components
├── public/                 # Static assets
├── nuxt.config.ts         # Nuxt configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── .nvmrc                 # Node version specification
```

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Nuxt 4** - Full-stack meta-framework for Vue
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Bun** - Fast package manager and runtime

## Next Steps

1. ✅ Project scaffolded with Vue 3 + Nuxt 4 + Tailwind CSS
2. ⏳ Run `bun install` to install dependencies
3. ⏳ Run `bun run dev` to start the development server
4. ⏳ Build components in the `components/` directory
5. ⏳ Create pages in the `pages/` directory

## Resources

- [Nuxt Documentation](https://nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Bun Documentation](https://bun.sh)
