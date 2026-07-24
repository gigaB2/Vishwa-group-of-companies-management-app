# Weft Stock Book Design System

This document outlines the design language, components, and styling conventions used in the Weft Stock Book application. Use this as a reference to ensure consistency across related applications.

## 1. Typography

- **Display Font:** `Space Grotesk` (Google Fonts)
  - Used for headings, logos, and large numerical values.
  - Weights: 400, 500, 600, 700.
- **Body Font:** `Inter` (Google Fonts)
  - Used for all body text, labels, inputs, and tables.
  - Weights: 400, 500, 600.
- **Fallback:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`

## 2. Color Palette

### Base Colors (Light Mode)
| Variable | Value | Usage |
| :--- | :--- | :--- |
| `--bg` | `#f8f7fc` | Page background |
| `--surface` | `#ffffff` | Card and modal backgrounds |
| `--fg` | `#1a1a2e` | Primary text |
| `--muted` | `#8b8fa3` | Secondary/muted text |
| `--border` | `#e8e7f1` | Dividers and borders |
| `--accent` | `#8b5cf6` | Primary brand color (Purple) |
| `--accent2` | `#ec4899` | Secondary brand color (Pink) |
| `--accent3` | `#f97316` | Tertiary brand color (Orange) |
| `--error` | `#ef4444` | Errors and deletions |
| `--success` | `#10b981` | Success states |

### Base Colors (Dark Mode)
| Variable | Value | Usage |
| :--- | :--- | :--- |
| `--bg` | `#000000` | Page background |
| `--surface` | `#0a0a0a` | Card and modal backgrounds |
| `--fg` | `#ffffff` | Primary text |
| `--muted` | `#a1a1aa` | Secondary/muted text |
| `--border` | `#27272a` | Dividers and borders |
| `--accent` | `#7c3aed` | Adjusted Purple for Dark Mode |

### Gradients
- **Primary Gradient:** `linear-gradient(135deg, var(--accent), var(--accent2))`
- **Background Gradient (Light):** `linear-gradient(135deg, #f8f7fc 0%, #faf5ff 50%, #f0f4ff 100%)`
- **Background Gradient (Dark):** `linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #0f0f1a 100%)`

## 3. UI Components

### Cards
- **Border Radius:** `16px`
- **Shadow:** `0 4px 16px rgba(0, 0, 0, 0.06)` (`--shadow-md`)
- **Hover Effect:** `transform: translateY(-2px)`, shadow increases, and a subtle top border gradient appears.

### Buttons
- **Primary:** Gradient background (`--accent` to `--accent2`), white text, `10px` radius.
- **Hover:** Slight lift (`translateY(-2px)`), increased shadow, and a "shine" animation moving across the button.
- **Subtle/Secondary:** White surface, light border, hover changes border to `--accent`.

### Inputs & Selects
- **Radius:** `10px`
- **Border:** `1.5px solid var(--border)`
- **Focus State:** Border changes to `--accent` with a subtle glow (`0 0 0 4px rgba(139, 92, 246, 0.1)`).

### Tables
- **Header:** Sticky, semi-transparent gradient background, bold `0.85rem` text.
- **Rows:** Hover effect highlighting the row with a subtle horizontal gradient.
- **Cells:** `0.9rem` text size, `1rem` padding.

### Navigation Tabs
- Rounded `8px`, `--muted` text.
- **Active State:** Light gradient background, `--accent` bottom border, subtle shadow.

## 4. Layout Constants

- **Max Container Width:** `1300px`
- **Standard Padding:** `2rem` (32px)
- **Grid Spacing:** `1.5rem` (24px) for dashboard cards and stats.
- **Z-Index & Stacking:** 
  - Filter cards MUST have a higher `z-index` (e.g., 100) than data cards below them.
  - For adjacent SearchableDropdowns, apply decreasing `z-index` (30, 20, 10) to their parent containers to prevent menus from being hidden by the next input box.
  - Dropdown lists MUST use `z-index: 10000` to clear all modal/card boundaries.

## 5. Visual Effects & Animations

- **Transitions:**
  - Fast: `0.15s ease`
  - Base: `0.25s ease`
  - Slow: `0.4s ease`
- **Animations:**
  - `fadeIn`: Content slides up and fades in on mount.
  - `slideDown`: Toasts slide from top with a bounce effect.
  - `pulse`: Soft opacity breathing for loading states.
  - `shake`: Horizontal vibration for error feedback.

## 7. Warp Stock Book Specifications

The Warp Stock Book is designed to track the lifecycle of warp yarn from arrival to beam manufacture and weaving.

### Core Data Structures

- **Inventory Sync:** Automatically filters `yarn-orders` where `type === 'Warp'`.
- **Warp Issues (`warp-issues`):**
  - `date`: Transaction date.
  - `quality`, `code`, `color`: Linked to yarn master.
  - `issuedWeight`: Amount deducted from stock.
  - `beamId`: Optional link to a specific beam.
  - `type`: Issue category (e.g., "Beam Manufacture", "Factory Issue").
- **Warp Beams (`warp-beams`):**
  - `beamNumber`: Unique identifier for the beam.
  - `ends`, `meters`: Technical specifications.
  - `machineNumber`: Current machine assignment.
  - `status`: "Active" or "Completed".
  - `history`: Timeline of events (Creation, Yarn Issue, Loading, Unloading).

### UI Components

- **Stock Ledger Table:**
  - Headers: `Date`, `In`, `Open`, `Issue`, `Close`, `Beam #`, `Ends`, `Meters`.
  - Grouped by Quality Combination.
- **Beam Tracker:**
  - Split view for Active and Completed beams.
  - Quick actions for Loading on Machines and Completion.
- **Beam Card (Modal):**
  - Displays beam metadata.
  - **Interactive vertical timeline showing the beam's activity.**

  ### Data Conventions

  - **Date Format:** All dates displayed in the UI use the `dd-mm-yyyy` format for regional consistency, while stored internally as `yyyy-mm-dd` (ISO) for compatibility with HTML5 inputs.

  ### Depletion Logic


Stock is calculated chronologically:
1. **Arrivals (In):** Based on received batches in the Order Book.
2. **Issues (Issue):** Manual logs for production or sizing.
3. **Balance:** `Close = Open + In - Issue`.
