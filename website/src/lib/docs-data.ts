export interface DocSection {
  id: string;
  title: string;
  items: DocItem[];
}

export interface DocItem {
  id: string;
  title: string;
  content: string;
}

export const docsSections: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        id: "installation",
        title: "Installation",
        content: `## Installation

DevDock is available as a pre-built binary for Windows, macOS, and Linux. You can also build from source.

### Download Pre-built Binaries

Head to the [Releases page](https://github.com/JUSTTNZ/DevDock/releases/latest) and download the installer for your operating system:

| Platform | File |
|----------|------|
| Windows | \`DevDock-Setup-x.x.x.exe\` |
| macOS | \`DevDock-x.x.x.dmg\` |
| Linux (AppImage) | \`DevDock-x.x.x.AppImage\` |
| Linux (Debian) | \`devdock_x.x.x_amd64.deb\` |

### Install from Source

\`\`\`bash
# Clone the repository
git clone https://github.com/JUSTTNZ/DevDock.git
cd DevDock

# Install dependencies
npm install

# Run in development mode
npm run dev
\`\`\`

### Package for Distribution

\`\`\`bash
# Windows
npm run package:win

# macOS
npm run package:mac

# Linux
npm run package:linux
\`\`\``,
      },
      {
        id: "system-requirements",
        title: "System Requirements",
        content: `## System Requirements

### Minimum Requirements

- **OS**: Windows 10+, macOS 11+, or Ubuntu 20.04+ (or equivalent)
- **RAM**: 4 GB (8 GB recommended)
- **Disk Space**: 200 MB for the application
- **Node.js**: v18+ (only needed for building from source)

### Recommended Setup

For the best experience, we recommend:

- A machine with at least 8 GB RAM if you plan to monitor many services simultaneously
- SSD storage for faster service startup
- A modern terminal emulator installed (for services that need terminal access)`,
      },
      {
        id: "quick-start",
        title: "Quick Start",
        content: `## Quick Start

Get up and running with DevDock in under 2 minutes.

### Step 1: Install DevDock

Download the latest release for your OS from the [releases page](https://github.com/JUSTTNZ/DevDock/releases/latest) and install it.

### Step 2: Add Your First Service

1. Open DevDock
2. Navigate to the **Services** page from the sidebar
3. Click the **+ Add Service** button
4. Fill in the service details:

\`\`\`json
{
  "name": "My React App",
  "command": "npm run dev",
  "cwd": "/path/to/your/project",
  "port": 3000,
  "autoStart": true,
  "autoRestart": true
}
\`\`\`

### Step 3: Start Monitoring

Head to the **Dashboard** to see real-time CPU and memory usage for your services. DevDock will display live charts and status indicators for each running service.

### Step 4: View Logs

Navigate to the **Logs** page to see aggregated output from all your services in one place. You can filter by service and search through log entries.`,
      },
    ],
  },
  {
    id: "configuration",
    title: "Configuration",
    items: [
      {
        id: "adding-services",
        title: "Adding Services",
        content: `## Adding Services

Services are the core of DevDock. Each service represents a local development process you want to manage.

### Adding a Service via the UI

1. Click the **+ Add Service** button on the Services page
2. Fill in the required fields:
   - **Name**: A friendly name for your service (e.g., "Frontend", "API Server")
   - **Command**: The shell command to start the service (e.g., \`npm run dev\`)
   - **Working Directory**: The absolute path to the project root
3. Optionally configure:
   - **Port**: The port number the service will listen on
   - **Auto Start**: Whether to start this service when DevDock launches
   - **Auto Restart**: Whether to automatically restart if the service crashes

### Example Configurations

**React Development Server:**
\`\`\`json
{
  "name": "Frontend",
  "command": "npm run dev",
  "cwd": "/Users/dev/my-app/frontend",
  "port": 3000,
  "autoStart": true,
  "autoRestart": true
}
\`\`\`

**Express API Server:**
\`\`\`json
{
  "name": "API Server",
  "command": "npm run dev",
  "cwd": "/Users/dev/my-app/backend",
  "port": 4000,
  "autoStart": true,
  "autoRestart": true
}
\`\`\`

**Database (Docker):**
\`\`\`json
{
  "name": "PostgreSQL",
  "command": "docker-compose up postgres",
  "cwd": "/Users/dev/my-app",
  "port": 5432,
  "autoStart": false,
  "autoRestart": false
}
\`\`\``,
      },
      {
        id: "service-settings",
        title: "Service Settings",
        content: `## Service Settings

Each service in DevDock has several configurable options.

### Configuration Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| \`name\` | string | Yes | Display name of the service |
| \`command\` | string | Yes | Shell command to execute |
| \`cwd\` | string | Yes | Working directory (absolute path) |
| \`port\` | number | No | Port the service listens on |
| \`autoStart\` | boolean | No | Start when DevDock launches |
| \`autoRestart\` | boolean | No | Auto-restart on crash |

### Auto-Start

When \`autoStart\` is enabled, the service will automatically begin running when you open DevDock. This is useful for services you always need, like your main development server.

### Auto-Restart

When \`autoRestart\` is enabled, DevDock will automatically restart the service if it crashes unexpectedly. The restart uses an exponential backoff strategy to avoid rapid restart loops:

- 1st restart: immediate
- 2nd restart: 1 second delay
- 3rd restart: 2 second delay
- 4th restart: 4 second delay
- Maximum delay: 30 seconds

### Port Configuration

Setting a port number enables several features:
- **Port conflict detection**: DevDock checks if the port is already in use
- **Automatic port reassignment**: If a conflict is detected, a free port is assigned
- **Browser auto-launch**: DevDock can open the service in your browser when the port becomes ready`,
      },
    ],
  },
  {
    id: "features",
    title: "Features",
    items: [
      {
        id: "dashboard-overview",
        title: "Dashboard Overview",
        content: `## Dashboard Overview

The Dashboard is your central command center for monitoring all services at a glance.

### Service Status Cards

Each service is displayed as a card showing:
- **Status indicator**: Green (running), red (stopped), yellow (starting/restarting)
- **Service name** and the command being executed
- **Port number** (if configured)
- **Uptime** since last start
- **Quick actions**: Start, Stop, Restart buttons

### Live Charts

The Dashboard displays real-time charts powered by Recharts:

- **CPU Usage Chart**: Line chart showing CPU percentage over time for each service
- **Memory Usage Chart**: Area chart displaying memory consumption trends
- **Status Pie Chart**: An overview of how many services are running, stopped, or errored

Charts update every few seconds with live data from the process monitor.

### Resource Summary

At the top of the Dashboard, you'll see aggregate metrics:
- Total services running vs. total configured
- Combined CPU usage across all services
- Combined memory usage across all services`,
      },
      {
        id: "service-management",
        title: "Service Management",
        content: `## Service Management

The Services page gives you full control over all your local development services.

### Starting a Service

Click the **Play** button on any service card, or use the **Start All** button to launch every configured service simultaneously.

When a service starts:
1. DevDock spawns the command as a child process
2. The service status changes to "starting"
3. If a port is configured, DevDock monitors for the port to become ready
4. Once ready, the status changes to "running"
5. If auto-launch is enabled, your default browser opens to the service URL

### Stopping a Service

Click the **Stop** button to gracefully terminate a service. DevDock sends a SIGTERM signal and waits for the process to exit. If the process doesn't exit within a timeout, SIGKILL is sent.

### Restarting a Service

The **Restart** button performs a stop followed by a start. This is useful when you need to pick up configuration changes.

### Bulk Operations

- **Start All**: Launch all configured services
- **Stop All**: Gracefully stop all running services
- **Restart All**: Stop and restart all services`,
      },
      {
        id: "log-viewer",
        title: "Log Viewer",
        content: `## Log Viewer

The Logs page provides a unified view of output from all your services.

### Features

- **Aggregated view**: See logs from all services in chronological order
- **Color-coded**: Each service's logs are color-coded for easy identification
- **Auto-scroll**: Logs automatically scroll to the latest entry
- **Search**: Filter logs by keyword to find specific entries
- **Service filter**: Show logs from a specific service only

### Log Entry Format

Each log entry shows:
- **Timestamp**: When the log was generated
- **Service name**: Which service produced the log
- **Output type**: stdout or stderr (stderr entries are highlighted in red)
- **Content**: The actual log output

### Performance

DevDock buffers log output efficiently to handle high-throughput services without impacting UI performance. Older log entries are automatically pruned to keep memory usage in check.`,
      },
      {
        id: "settings-themes",
        title: "Settings & Themes",
        content: `## Settings & Themes

Customize DevDock to fit your workflow through the Settings page.

### Theme

DevDock features a polished **dark theme** by default, designed to be easy on the eyes during long development sessions. The dark theme uses:
- \`#0f0f0f\` background
- \`#1a1a1a\` card surfaces
- \`#3b82f6\` accent blue for interactive elements
- \`#10b981\` green for success states
- \`#ef4444\` red for errors and stopped services

### Collapsible Sidebar

The sidebar can be collapsed to give you more screen real estate. It includes navigation to:
- **Dashboard**: Service overview and live charts
- **Services**: Service management and configuration
- **Logs**: Aggregated log viewer
- **Settings**: Application preferences`,
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    items: [
      {
        id: "port-conflict-resolution",
        title: "Port Conflict Resolution",
        content: `## Port Conflict Resolution

DevDock automatically handles port conflicts so you don't have to manually hunt down what's using a port.

### How It Works

1. **Detection**: Before starting a service, DevDock checks if the configured port is already in use
2. **Notification**: If a conflict is found, DevDock notifies you with details about which process is using the port
3. **Auto-reassignment**: DevDock automatically finds the next available port and assigns it to the service
4. **Update**: The service configuration is temporarily updated with the new port

### Example Scenario

\`\`\`
Configured: Frontend on port 3000
Detected:   Port 3000 is in use by process "node" (PID 12345)
Action:     Reassigned Frontend to port 3001
\`\`\`

### Manual Resolution

If you prefer to handle conflicts manually:
1. Stop the conflicting process
2. Change the port in the service configuration
3. Restart the service in DevDock`,
      },
      {
        id: "auto-restart-behavior",
        title: "Auto-Restart Behavior",
        content: `## Auto-Restart Behavior

When auto-restart is enabled for a service, DevDock monitors the process and automatically restarts it if it exits unexpectedly.

### Exponential Backoff

To prevent rapid restart loops (e.g., if a service crashes immediately on startup), DevDock uses an exponential backoff strategy:

\`\`\`
Attempt 1: Restart immediately
Attempt 2: Wait 1 second
Attempt 3: Wait 2 seconds
Attempt 4: Wait 4 seconds
Attempt 5: Wait 8 seconds
...
Maximum wait: 30 seconds
\`\`\`

### Reset Conditions

The backoff timer resets when:
- The service runs successfully for more than 60 seconds
- You manually stop and restart the service
- You edit the service configuration

### Crash Detection

DevDock distinguishes between:
- **Intentional stops**: When you click Stop - no restart triggered
- **Crashes**: When the process exits with a non-zero code - auto-restart triggered
- **Graceful exits**: When the process exits with code 0 - behavior depends on your configuration`,
      },
      {
        id: "process-monitoring",
        title: "Process Monitoring",
        content: `## Process Monitoring

DevDock uses \`pidusage\` and \`pidtree\` to provide accurate, real-time resource monitoring for each service.

### Metrics Collected

- **CPU Usage**: Percentage of CPU time used by the service and its child processes
- **Memory Usage**: Resident Set Size (RSS) memory consumption in MB
- **Process Tree**: Complete tree of child processes spawned by the service
- **Uptime**: Duration since the service was last started

### How It Works

\`\`\`
Service Process (PID 1234)
├── Node.js (PID 1235)
│   ├── Webpack (PID 1236)
│   └── Dev Server (PID 1237)
└── File Watcher (PID 1238)
\`\`\`

DevDock monitors the entire process tree, not just the root process. This gives you accurate resource usage even for services that spawn multiple child processes (which is common with tools like Webpack, Vite, and others).

### Polling Interval

Resource metrics are collected every 2 seconds by default. This provides a good balance between accuracy and performance overhead.`,
      },
    ],
  },
  {
    id: "development",
    title: "Development",
    items: [
      {
        id: "building-from-source",
        title: "Building from Source",
        content: `## Building from Source

DevDock is built with Electron 28, React 18, TypeScript, and Vite (via electron-vite).

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- **Git**

### Development Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/JUSTTNZ/DevDock.git
cd DevDock

# Install dependencies
npm install

# Start in development mode (with hot reload)
npm run dev
\`\`\`

The development server starts with hot module replacement enabled. Changes to the renderer (React UI) will be reflected instantly. Changes to the main process require a restart.

### Project Structure

\`\`\`
DevDock/
├── src/
│   ├── main/          # Electron main process
│   ├── preload/       # Preload scripts
│   └── renderer/      # React application
│       ├── components/ # UI components
│       ├── pages/     # Page components
│       └── App.tsx    # Root component
├── electron.vite.config.ts
├── package.json
└── tsconfig.json
\`\`\`

### Building

\`\`\`bash
# Build for current platform
npm run build

# Package for specific platforms
npm run package:win    # Windows (.exe)
npm run package:mac    # macOS (.dmg)
npm run package:linux  # Linux (.AppImage, .deb)
\`\`\``,
      },
      {
        id: "contributing",
        title: "Contributing",
        content: `## Contributing

We welcome contributions to DevDock! Here's how to get started.

### Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. Create a **feature branch**: \`git checkout -b feature/my-feature\`
4. Make your changes
5. **Test** your changes thoroughly
6. **Commit** with a descriptive message
7. **Push** to your fork and open a **Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write TypeScript - avoid \`any\` types where possible
- Keep components small and focused
- Test your changes on at least one platform before submitting

### Reporting Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/JUSTTNZ/DevDock/issues) on GitHub with:

- A clear, descriptive title
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Your OS and DevDock version
- Screenshots if applicable

### License

DevDock is licensed under the [ISC License](https://github.com/JUSTTNZ/DevDock/blob/main/LICENSE).`,
      },
    ],
  },
];

export function getDocItem(sectionId: string, itemId: string): DocItem | null {
  const section = docsSections.find((s) => s.id === sectionId);
  if (!section) return null;
  return section.items.find((i) => i.id === itemId) || null;
}

export function getAllDocItems(): { section: DocSection; item: DocItem }[] {
  const items: { section: DocSection; item: DocItem }[] = [];
  for (const section of docsSections) {
    for (const item of section.items) {
      items.push({ section, item });
    }
  }
  return items;
}
