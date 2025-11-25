# Native Mobile App Deployment with Capacitor

This project is configured for native mobile app deployment using Capacitor. Follow these steps to deploy to iOS or Android.

## Prerequisites

- **Node.js** and npm installed
- **Git** installed
- For iOS: **Xcode** (Mac only)
- For Android: **Android Studio**

## Setup Instructions

### 1. Export to GitHub
1. Click the "Export to GitHub" button in Lovable
2. Clone your repository:
   ```bash
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

### 2. Install Dependencies
```bash
npm install
```

### 3. Build the Project
```bash
npm run build
```

### 4. Add Native Platforms

For iOS:
```bash
npx cap add ios
```

For Android:
```bash
npx cap add android
```

### 5. Update Native Dependencies
After adding platforms, update dependencies:

For iOS:
```bash
npx cap update ios
```

For Android:
```bash
npx cap update android
```

### 6. Sync Project
```bash
npx cap sync
```

### 7. Run on Device/Emulator

For Android:
```bash
npx cap run android
```

For iOS (Mac only):
```bash
npx cap run ios
```

## Important Notes

### Hot Reload During Development
The app is configured to load from the Lovable sandbox URL for development:
```
https://ec1534fc-8d3d-4209-bf37-333c01587b4a.lovableproject.com?forceHideBadge=true
```

This allows you to see changes in real-time on your mobile device without rebuilding.

### For Production Deployment
Before publishing to app stores, update `capacitor.config.ts`:
1. Remove the `server` section entirely
2. Build the project: `npm run build`
3. Sync: `npx cap sync`

### After Pulling Code Changes
Whenever you pull new code from GitHub:
```bash
npm install
npx cap sync
```

## App Configuration

- **App ID**: `app.lovable.ec1534fc8d3d4209bf37333c01587b4a`
- **App Name**: vital-guide-offline
- **Web Directory**: dist

## Healthcare API Integration

The app includes a healthcare API integration edge function. To use external healthcare APIs:

1. Add your healthcare API key in Lovable Cloud:
   - Go to Settings → Cloud → Secrets
   - Add a secret named `HEALTHCARE_API_KEY`
   - Enter your API key value

2. The healthcare API endpoint is available at:
   ```
   /functions/v1/healthcare-api
   ```

## Database & Privacy

The app includes:
- **User profiles** with RLS policies for data privacy
- **Symptom analysis history** stored securely per user
- **Healthcare API logs** for tracking external API calls
- **Authentication system** using Supabase Auth

All user data is protected with Row Level Security (RLS) policies ensuring users can only access their own data.

## Troubleshooting

### Build Errors
If you encounter build errors after adding dependencies:
```bash
npm install
npm run build
npx cap sync
```

### iOS Specific Issues
- Ensure you have the latest Xcode installed
- You may need to open the project in Xcode and configure signing

### Android Specific Issues
- Ensure Android Studio is properly installed
- You may need to configure the Android SDK path

## Support

For more information about Capacitor, visit:
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Lovable Documentation](https://docs.lovable.dev)
