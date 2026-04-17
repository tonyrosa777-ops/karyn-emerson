STAGE 1A REPO SCAN - KARYN EMERSON REAL ESTATE

A. HERO CANVAS ANIMATION
WINNER: Sylvia Rich HeroParticles
Path: /c/Projects/Sylvia Rich/hungary-consul-ne/src/components/sections/HeroParticles.tsx
Reason: Motes + glimmers, slow drift (0.2-0.5 vy), formal/dignified. Swap color D4AF37 to B5532C.

Alternative: Gray-Method-Training HeroParticles
Path: /c/Projects/Gray-Method-Training/gray-method-training/src/components/sections/HeroParticles.tsx
Reason: Canonical ambient baseline (145 stars, 58 embers, glimmers). Lines 49-50 show subtle 0.14 px/frame motion.

AVOID: Placed-Right-Fence ForgeCanvas.tsx - industrial, fast, extrusion. WRONG for real estate.

B. BOOKING CALENDAR
Primary: Enchanted Madison BookingCalendar.tsx
Path: /c/Projects/Enchanted Madison/enchanted-madison/src/components/ui/BookingCalendar.tsx
Pattern: 3-phase UI (calendar-time-package). AnimatePresence slides. Adapt packages to real estate tiers.

C. QUIZ
Canonical: Gray-Method-Training
Data: /c/Projects/Gray-Method-Training/gray-method-training/src/data/quiz.ts
UI: /c/Projects/Gray-Method-Training/gray-method-training/src/app/quiz/QuizClient.tsx
Structure: 8 questions, 4 archetypes. Adapt archetypes: first-time-buyer, seller-prepping, relocating-family, investment-focused.

D. SERVICE AREAS
Canonical: Cody Complete Junk Removal serviceAreas.ts
Path: /c/Projects/Cody's Complete Junk Removal/src/data/serviceAreas.ts
For Karyn: 12-15 NH neighborhoods (Salem, Pelham, Windham, etc). Each has: slug, city, population, distance, description.

E. PRICING
Reference: JCM-Graphics PricingClient.tsx
Path: /c/Projects/JCM-Graphics/website/src/app/pricing/PricingClient.tsx
Structure: 3 tiers (Starter/Pro/Premium), 5 feature categories, 20+ feature rows.

F. TESTIMONIALS
Canonical: Leslie Ledbetter TestimonialsClient.tsx
Path: /c/Projects/Leslie Ledbetter/website/src/app/testimonials/TestimonialsClient.tsx
Pattern: 9 per page, 4 pages total (36 testimonials), featured hero, service filter.

H. ANTI-PATTERNS FOR KARYN
1. Placed-Right-Fence Forge - industrial, wrong
2. Fast motion - Karyn is SLOW (8-12s drift min)
3. Three-tier particles - too noisy, limit to motes+glimmers
4. Bright colors - Karyn palette: F6F1E7 (cream), 2F4A3A (green), B5532C (rust-oxide only)
5. screen/lighten blending - use normal or multiply instead
6. Neon/cyan/electric - absolutely wrong

READY: Animation specialist + Frontend developer can now begin implementation.

Generated: April 16, 2026
