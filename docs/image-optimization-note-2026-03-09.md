# Image Optimization Note

Date: 2026-03-09

- The duplicate root-level `pp.jpg` file was removed because the repository only references `public/pp.jpg`.
- Gallery delivery was improved in code by supplying real image dimensions and better `sizes` values to `next/image`.
- The source JPEG files in `public/images/portfolio/` are still very large (roughly 7 MB to 12 MB each), and `public/pp.jpg` is also relatively large for a profile/social image.
- This repository does not currently include a verified, safe asset-processing pipeline for recompressing or replacing those binary files automatically.
- If you want the next performance win, manually export optimized derivatives (for example, smaller JPEG/WebP/AVIF variants) from the original sources and update the repository intentionally.
