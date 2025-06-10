
# Project Description: Ventixe Event Platform

## Overview

Ventixe is a modern, full-stack web application designed as an event discovery and registration platform. Built with Next.js, it provides a seamless user experience for Browse events, viewing detailed information, and signing up for various event packages. The application leverages a sophisticated architecture, including a Backend-for-Frontend (BFF) pattern to interact with a suite of external microservices, and is set up for automated deployment to the cloud.

The user interface is clean and responsive, featuring event listings, a calendar view, and non-intrusive modals for viewing event details without losing context.

---

## How It Works

The application is architected with a clear separation between the frontend presentation layer and the backend service layer, using Next.js as the unifying framework.

1. **Frontend (Next.js App Router)**: The user-facing application is built with **React** and the **Next.js App Router**. It uses a component-based structure found in `app/components/`. Key features of its implementation include:
    * **Routing & Layouts**: It uses file-system based routing. The main layout (`app/(root)/layout.tsx`) defines the primary structure, including a persistent navigation sidebar and a main content area.
    * **Intercepted Routes**: The application uses Next.js's parallel and intercepted routing features. When a user clicks on an event, instead of navigating to a new page, a modal dialog intercepts the route (`app/(root)/@modal/(.)event/[eventId]/page.tsx`), fetching and displaying the event's details while keeping the user on the event list page. This creates a fluid, desktop-app-like experience/page.tsx, ec-win-24-net/khala/Khala-2883555f9bc890ebfdf2587808a9a9ed4e3c6e5f/app/(root)/layout.tsx].
    * **Client-Side Data Fetching**: The frontend uses the **SWR** library for data fetching. Components like `EventList` and `CardImageEvent` use `useSWR` hooks to retrieve data from the BFF API routes. This provides automatic caching, revalidation, and handling of loading/error states, resulting in a responsive UI.

2. **Backend-for-Frontend (BFF)**: The Next.js API routes (`app/api/`) serve as a BFF, acting as a secure proxy between the client and a set of external microservices.
    * **Generic API Handler**: A robust `genericApiHandler.ts` module centralizes the logic for proxying requests. It securely attaches the necessary Azure API Management subscription key (`APIM_KEY`) from environment variables, handles different HTTP methods, and sets server-side caching (`revalidate`) to reduce external API calls.
    * **Service Endpoints**: The application communicates with multiple backend services, each with a distinct responsibility:
        * **/forge/api/**: Provides event data/route.ts].
        * **/cloakvision/api/**: Serves image data. Images are hosted on Azure Blob Storage/route.ts, ec-win-24-net/khala/Khala-2883555f9bc890ebfdf2587808a9a9ed4e3c6e5f/next.config.ts].
        * **/nexuspoint/api/**: Provides location details for events/route.ts].
        * **/voidmail/api/**: Handles sending confirmation emails upon event signup.

3. **Deployment (CI/CD)**: The project is configured for Continuous Integration and Continuous Deployment using **GitHub Actions**. The workflow file (`azure-static-web-apps-calm-meadow-0a18cab03.yml`) defines jobs to automatically build and deploy the application to **Azure Static Web Apps** whenever changes are pushed to the `main` branch or a pull request is created. The project uses **PNPM** as its package manager.

---

## Tech Stack

The project utilizes a modern and robust technology stack:

* **Framework**: Next.js 15
* **Language**: TypeScript
* **UI Library**: React 19
* **Styling**:
  * Tailwind CSS 4
  * `shadcn/ui` for pre-built, accessible components (built on Radix UI)
  * `Framer Motion` for animations
  * `lucide-react` for icons
* **Data Fetching**:
  * SWR for client-side data fetching and caching
  * Axios for making HTTP requests in the BFF
* **Forms**:
  * React Hook Form for form state management
  * Zod for schema declaration and validation
* **Package Manager**: PNPM
* **Linting & Formatting**:
  * ESLint with the `eslint-config-next` configuration
  * Biome for code formatting
* **Deployment & Hosting**:
  * Azure Static Web Apps
  * GitHub Actions for CI/CD
  * Backend services are hosted on Azure, accessible via Azure API Management.
  * Images are stored in Azure Blob Storage.
