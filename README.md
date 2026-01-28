# ElasticPurple v2 — Documentation-First Redesign

A complete redesign of the portfolio site, optimized for technical readers and hiring managers.

## Design Philosophy

**Before (v1):** Glassmorphism, animated glows, decorative illustrations, theatrical typing effects  
**After (v2):** Clean typography, minimal ornamentation, confidence through restraint

### Key Changes

| Aspect | v1 | v2 |
|--------|----|----|
| Animations | 7+ glow keyframes, typing effect | Zero decorative animations |
| Visual effects | Backdrop blur everywhere | Blur only on mobile overlay |
| Hero section | 400px+ with illustration | ~200px, text-only |
| Typography | System fonts | IBM Plex Sans/Mono |
| Navigation | Hidden sidebar on mobile | Persistent sidebar, hamburger menu |
| Visitor counter | Animated number counting | Static display |
| Illustrations | Custom avatar characters | None (let content speak) |
| CSS size | ~3000 lines | ~600 lines |
| JS size | ~500 lines with effects | ~150 lines, functional only |

## File Structure

```
v2/
├── index.html              # Homepage
├── styles.css              # Single stylesheet
├── script.js               # Minimal JavaScript
├── project-docs/
│   └── cloud-portfolio.html    # Project writeup
├── blog/
│   └── aws-sso-terraform.html  # Blog post
├── resume/
│   └── resume.html             # ATS-friendly resume
└── images/
    └── skills/                 # Skill icons (reuse from v1)
```

## What's Preserved

- Bilingual support (EN/DE)
- Dark/light theme toggle
- Visitor counter functionality
- All technical content
- Responsive design
- Certification information

## What's Removed

- Pulsating glow animations
- Typing/cycling welcome text
- Glassmorphism cards
- Avatar illustrations
- Intersection observer glow effects
- Image modal lightbox
- Pillar fade on scroll

## Design Inspiration

- [Stripe Documentation](https://stripe.com/docs)
- [Tailscale Blog](https://tailscale.com/blog)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- Internal engineering wikis

## Usage

1. Copy `v2/` folder to your S3 bucket as a test deployment
2. Compare user engagement between v1 and v2
3. Get feedback from target audience (senior engineers, hiring managers)

## A/B Testing Suggestions

- Deploy v2 to a subdomain (e.g., `beta.elasticpurple.com`)
- Share both versions with 2-3 engineers and ask which they'd trust more
- Time how long it takes to find specific information in each version

## Notes

This version requires the `images/skills/` folder from v1. Copy those assets:

```bash
cp -r path/to/v1/images/skills/ v2/images/skills/
```

The resume is a standalone HTML file optimized for printing to PDF.
