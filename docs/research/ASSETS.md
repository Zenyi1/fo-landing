# mlp.com — Asset inventory

All assets live on the WordPress media library at `https://www.mlp.com/wp-content/uploads/...`.

## Videos
| Local path | Source | Notes |
|---|---|---|
| `public/videos/waves.mp4` | https://www.mlp.com/wp-content/uploads/2024/03/waves.mp4 | Hero ambient + footer-promo background (reused) |
| `public/videos/sizzle-reel.mp4` | https://www.mlp.com/wp-content/uploads/2025/07/sizzle-reel-2025-preview.mp4 | Carousel slide 1 (1411×780 player) |
| `public/videos/julia.mp4` | https://www.mlp.com/wp-content/uploads/2025/10/v4-julia-5-second-video.mp4 | Carousel slide 2 |
| `public/videos/igor.mp4` | https://www.mlp.com/wp-content/uploads/2024/05/Igor-5s-Preview.mp4 | Carousel slide 3 |
| `public/videos/mlp-tm.mp4` | https://www.mlp.com/wp-content/uploads/2024/05/MLP-TM-472397229.mp4 | Decorative tick band animation in carousel header |

## Images
| Local path | Source | Notes |
|---|---|---|
| `public/images/footer-millennium-wordmark.png` | https://www.mlp.com/wp-content/uploads/2026/05/footer-Millennium-wordmark-scaled.png | 2560×358 large clipped wordmark in footer |

## Favicons / SEO
| Local path | Source |
|---|---|
| `public/seo/favicon-32.png` | https://www.mlp.com/wp-content/uploads/2024/05/cropped-favicon-32x32.png |
| `public/seo/favicon-192.png` | https://www.mlp.com/wp-content/uploads/2024/05/cropped-favicon-192x192.png |
| `public/seo/apple-touch-icon.png` | https://www.mlp.com/wp-content/uploads/2024/05/cropped-favicon-180x180.png |

## Fonts
- **Prata** — Google Fonts (free): https://fonts.google.com/specimen/Prata. Use `next/font/google`.
- **nimbus-sans** — Adobe Typekit (subscription). Substitute with system Helvetica stack: `"Helvetica Neue", Helvetica, Arial, sans-serif`. Visually near-identical for body text.

## Inline SVG / canvas
- The hero "wind-tick" pattern is rendered to `<canvas class="homepageHero__canvas">`. We will recreate this with our own canvas component (decorative, doesn't need to match exactly — just a field of small angled tick marks animated with a smooth flow vector).
- Social icons (LinkedIn, Instagram, YouTube) rendered as inline SVGs — use lucide-react equivalents.
