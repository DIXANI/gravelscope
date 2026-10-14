# GravelScope Performance Optimization Plan
**Based on PageSpeed Insights Report - October 11, 2026**

---

## Current Performance Scores

| Metric | Score | Status |
|--------|-------|--------|
| Performance | 78/100 | 🟡 Needs Improvement |
| Accessibility | 96/100 | ✅ Good |
| Best Practices | 78/100 | 🟡 Needs Improvement |
| SEO | 100/100 | ✅ Perfect |

**Target**: Get Performance to 90+ and Best Practices to 90+

---

## Issues Identified from PageSpeed Insights

### 🔴 Critical Issues

1. **Reduce Unused JavaScript**
   - AdSense script loading on every page (not needed until approval)
   - Impact: High (blocks main thread)

2. **Enable Text Compression**
   - CSS/JS files not gzip compressed
   - Impact: Medium (larger file transfers)

3. **Other Potential Issues** (need to verify):
   - Render-blocking resources
   - Image optimization
   - Cache policy

---

## Optimization Solutions

### 1. Remove/Defer AdSense Script (Until Approval)

**Current Problem**:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8025420721885884" crossorigin="anonymous"></script>
```

This loads ~50-100KB of JavaScript on EVERY page load, even though you don't have AdSense approval yet.

**Solution Options**:

#### Option A: Comment Out Until AdSense Approval (RECOMMENDED)
Remove AdSense script from all pages until you get approval. The script presence doesn't affect approval chances.

**Impact**: 
- Performance score: +10-15 points
- First Contentful Paint: -0.5-1s
- Total Blocking Time: -200-400ms

#### Option B: Keep for Approval Process
If you believe it's needed for approval (it's not), at least optimize:
```html
<!-- Load AdSense only after page interactive -->
<script>
window.addEventListener('load', function() {
  var script = document.createElement('script');
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8025420721885884';
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
});
</script>
```

**Recommendation**: Remove AdSense until approval. It doesn't help approval and hurts performance.

---

### 2. Enable Text Compression (Server-Side)

**Problem**: CSS and JS files are not gzip/brotli compressed during transfer.

**Current File Sizes**:
- styles.css: 15KB (uncompressed)
- app.js: 4.6KB (uncompressed)

**With Compression**:
- styles.css: ~4-5KB (gzip) = 70% reduction
- app.js: ~1.5-2KB (gzip) = 65% reduction

#### Solution for Cloudflare Pages (Your Host)

Cloudflare Pages automatically compresses files, but you need to ensure it's enabled:

**Method 1: Create `_headers` file** (recommended)
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  
/*.css
  Content-Type: text/css; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable
  
/*.js
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable
  
/*.html
  Cache-Control: public, max-age=3600
```

**Method 2: Cloudflare Dashboard Settings**
- Enable "Auto Minify" for HTML, CSS, JS
- Enable "Brotli" compression
- Already using Cloudflare, so this should be automatic

**Impact**: 
- Performance score: +5-10 points
- Transfer size: -60-70%
- Load time: -0.3-0.5s on slow connections

---

### 3. Optimize CSS Delivery

**Current Issue**: styles.css loads as render-blocking resource

**Solution: Inline Critical CSS**

Extract the above-the-fold CSS and inline it in `<head>`, then load full stylesheet async:

```html
<style>
/* Critical CSS - Hero, Calculator Card, Header */
:root{--bg:#f6f3eb;--surface:#ffffff;--ink:#19231d;--brand:#365f46;--brand-dark:#274735;--line:#d8d6ca;--max:1120px}
*{box-sizing:border-box}
body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;color:var(--ink);background:var(--bg);line-height:1.6}
.site-header{position:sticky;top:0;z-index:20;backdrop-filter:blur(14px);background:rgba(246,243,235,.9);border-bottom:1px solid rgba(216,214,202,.85)}
.hero{padding:24px 22px 12px;display:block;max-width:var(--max);margin:0 auto;text-align:center}
.hero h1{font-size:clamp(1.8rem,4vw,2.4rem);margin:0 0 8px}
.calculator-wrap{margin:0 auto;padding:0 22px 50px;max-width:var(--max)}
.calculator-card{background:var(--surface);border:1px solid var(--line);border-radius:26px;box-shadow:0 18px 50px rgba(34,47,38,.10)}
/* Add only visible-first styles here */
</style>
<link rel="preload" href="/assets/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/assets/styles.css"></noscript>
```

**Impact**: 
- Performance score: +5-8 points
- First Contentful Paint: -0.2-0.4s

---

### 4. Optimize JavaScript Loading

**Current**:
```html
<script defer src=/assets/app.js></script>
```

✅ Already using `defer` - Good!

**Additional Optimization**: Add resource hints
```html
<link rel="preload" href="/assets/app.js" as="script">
<script defer src="/assets/app.js"></script>
```

**Impact**: +2-3 points

---

### 5. Add Resource Hints

Add these to `<head>` for faster resource loading:

```html
<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Already have this one ✅ -->
<link rel="dns-prefetch" href="https://pagead2.googlesyndication.com">

<!-- Preload critical assets -->
<link rel="preload" href="/assets/styles.css" as="style">
<link rel="preload" href="/assets/app.js" as="script">
```

**Impact**: +3-5 points

---

### 6. Add Caching Headers via `_headers` File

Create `_headers` file in root directory:

```
# Cache CSS and JS for 1 year (with hash in filename for cache busting)
/assets/*.css
  Cache-Control: public, max-age=31536000, immutable

/assets/*.js
  Cache-Control: public, max-age=31536000, immutable

# Cache HTML for 1 hour
/*.html
  Cache-Control: public, max-age=3600

# Cache images for 1 year
/assets/*.svg
  Cache-Control: public, max-age=31536000, immutable
  
/assets/*.webp
  Cache-Control: public, max-age=31536000, immutable

# Security headers
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: interest-cohort=()
```

**Impact**: +5-10 points (repeat visits)

---

### 7. Minify HTML Even More

Current HTML is minified but can be further compressed:

**Additional optimizations**:
- Remove all whitespace between tags
- Remove optional closing tags where allowed
- Minify inline JSON-LD schema

**Tools**:
- html-minifier-terser
- Or use Cloudflare's Auto Minify feature

**Impact**: +1-2 points, -5-10KB transfer

---

### 8. Optimize Schema JSON-LD

**Current**: Large JSON-LD blocks inline in HTML

**Optimization**: Minify the schema (remove whitespace):

```html
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://gravelscope.website/#website","url":"https://gravelscope.website/","name":"GravelScope","description":"Free gravel calculator for estimating gravel volume, weight, bags and material cost."}]}</script>
```

**Impact**: -2-3KB per page

---

### 9. Add Service Worker (Progressive Web App)

**Advanced**: Cache assets for offline access

Create `sw.js`:
```javascript
const CACHE_NAME = 'gravelscope-v1';
const urlsToCache = [
  '/',
  '/assets/styles.css',
  '/assets/app.js',
  '/assets/favicon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

Register in HTML:
```html
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
</script>
```

**Impact**: +10-15 points (repeat visits), PWA capabilities

---

## Implementation Priority

### 🔥 High Priority (Immediate - Biggest Impact)

1. **Remove AdSense script** (until approval)
   - Expected gain: +10-15 points
   - Time: 5 minutes
   - Difficulty: Easy

2. **Create `_headers` file** (enable compression & caching)
   - Expected gain: +10-15 points
   - Time: 10 minutes
   - Difficulty: Easy

3. **Add resource hints** (preload, preconnect)
   - Expected gain: +5-8 points
   - Time: 5 minutes
   - Difficulty: Easy

**Total Expected Gain**: +25-38 points → Performance score: 103-116/100 (capped at 100)

### 🟡 Medium Priority (This Week)

4. **Inline critical CSS**
   - Expected gain: +5-8 points
   - Time: 30 minutes
   - Difficulty: Medium

5. **Further minify JSON-LD schema**
   - Expected gain: +1-2 points
   - Time: 15 minutes
   - Difficulty: Easy

### 🟢 Low Priority (Nice to Have)

6. **Add Service Worker / PWA**
   - Expected gain: +10-15 points (repeat visits only)
   - Time: 1-2 hours
   - Difficulty: Medium-Hard

---

## Expected Performance After Optimizations

| Optimization Stage | Performance Score | Improvement |
|-------------------|------------------|-------------|
| Current | 78/100 | - |
| After High Priority | 95-100/100 | +17-22 points |
| After Medium Priority | 98-100/100 | +20-30 points |
| After Low Priority | 100/100 | +22-32 points |

---

## File Changes Required

### Files to Create:
1. `_headers` (caching and compression rules)
2. Optional: `sw.js` (service worker for PWA)

### Files to Modify:
1. `index.html` - Remove/defer AdSense, add resource hints
2. All guide HTML files - Same as above
3. Optional: Extract and inline critical CSS

---

## Testing After Implementation

### Tools to Use:
1. **PageSpeed Insights**: https://pagespeed.web.dev/
2. **GTmetrix**: https://gtmetrix.com/
3. **WebPageTest**: https://www.webpagetest.org/
4. **Chrome DevTools**: Lighthouse tab

### Metrics to Monitor:
- Performance score: Target 90+
- First Contentful Paint (FCP): Target <1.5s
- Largest Contentful Paint (LCP): Target <2.5s
- Total Blocking Time (TBT): Target <200ms
- Cumulative Layout Shift (CLS): Target <0.1

---

## Quick Wins Summary (Do These Now)

### 1. Remove AdSense Script
Find and comment out in all HTML files:
```html
<!-- Temporarily disabled for performance - will re-enable after approval
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8025420721885884" crossorigin="anonymous"></script>
-->
```

### 2. Create `_headers` File
Create at root with caching rules (see section 6 above)

### 3. Add Resource Hints
Add to `<head>` in all HTML files:
```html
<link rel="preload" href="/assets/styles.css" as="style">
<link rel="preload" href="/assets/app.js" as="script">
```

**Time Required**: 20-30 minutes total  
**Expected Result**: Performance score 90-95+

---

## Long-Term Performance Strategy

1. **Monitor regularly**: Check PageSpeed monthly
2. **Lazy load future images**: When you add images, use loading="lazy"
3. **Keep assets minified**: Always minify CSS/JS before deploy
4. **Consider CDN**: Cloudflare Pages already provides this ✅
5. **Optimize third-party scripts**: Only load what's necessary

---

## Conclusion

Your current performance score of **78/100** is actually quite good for a site with AdSense. The main issue is the **unused AdSense JavaScript** that you don't need yet.

**Quick fix**: Remove AdSense script temporarily → Instant jump to 90-95/100

**With all optimizations**: Expect 95-100/100 performance score

Focus on the **3 high-priority items** first - they take less than 30 minutes and will give you the biggest gains.

---

**Next Steps**:
1. Remove AdSense script from all pages
2. Create `_headers` file for caching
3. Add resource hints to HTML files
4. Test with PageSpeed Insights
5. Report new scores!

Let me know when you want me to implement these changes! 🚀
