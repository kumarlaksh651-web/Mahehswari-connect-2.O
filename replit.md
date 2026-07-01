# Dhat Maheshwari Community App

A mobile app connecting the Dhat Maheshwari Pakistani Hindu community worldwide. Members can discover and call each other by surname/akka, complete profiles, explore community welfare programs, and connect via social media.

## Run & Operate

- `pnpm --filter @workspace/mobile run dev` — run the Expo dev server (port 18115)
- Scan QR code with Expo Go app to test on a real device

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Mobile: Expo + Expo Router (file-based routing)
- Auth: AsyncStorage-based (local), no backend required
- Fonts: Inter (400/500/600/700) via @expo-google-fonts/inter

## Where things live

- `artifacts/mobile/app/` — all screens (Expo Router)
  - `(auth)/` — welcome, login, register, verify
  - `(tabs)/` — home (member list), community (welfare/services)
  - `profile.tsx` — account/profile editing
  - `search.tsx` — member search screen
  - `member/[id].tsx` — member detail with call options
- `artifacts/mobile/context/AuthContext.tsx` — auth state & AsyncStorage persistence
- `artifacts/mobile/context/MembersContext.tsx` — mock community member data (15 members)
- `artifacts/mobile/components/` — Header, MemberCard, CallSheet, CountryCodePicker
- `artifacts/mobile/constants/colors.ts` — design tokens (maroon + gold palette)

## Architecture decisions

- Frontend-only (no backend): auth state and user profiles stored in AsyncStorage
- OTP verification is simulated (any 6-digit code works) — demo-ready MVP
- Deep maroon (#8B1A1A) + gold (#C9A844) palette reflects Pakistani community identity
- Call functionality uses WhatsApp deep links, Botim URL scheme, and `tel:` links
- Akka (surname/gotra) is the primary filter for connecting community members

## Product

- **Welcome screen**: Community stats, join/sign-in CTAs, Urdu branding
- **Auth flow**: Register with phone (country code picker) + email/password → verify → profile
- **Home tab**: Greeting, akka filter chips, scrollable member cards with call button
- **Community tab**: Banner, welfare programs, services, achievements, social media links
- **Profile screen**: Photo picker, form fields (name, father name, akka, city, country, qualification, phone), logout
- **Search screen**: Full-text search across name/akka/city/country with akka filters
- **Member detail**: Profile view with WhatsApp/Botim/phone call options
- **CallSheet modal**: One-tap calling via WhatsApp, Botim, or regular phone

## User preferences

- Pakistan-first community focus
- Deep maroon and gold color scheme
- WhatsApp + Botim as primary call options
- Urdu script for community name on welcome screen

## Gotchas

- After `pnpm install`, run `restart_workflow "artifacts/mobile: expo"` to start the dev server
- The `(tabs)` layout uses `isLiquidGlassAvailable()` to pick NativeTabs (iOS 26) vs classic Tabs
- Tab bar is `position: absolute`, so FlatList screens need `paddingBottom: tabBarHeight`
