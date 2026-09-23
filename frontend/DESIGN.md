# DESIGN.md — MI Roudotutta'lim
        
## Product
A landing page / public website for **MI Roudotutta'lim**, an Islamic elementary school (Madrasah Ibtidaiyah) in Indonesia. The site serves prospective parents and the community: school profile, featured programs, news, and student admission (PPDB).

## Brand personality
Warm, trustworthy, community-driven, rooted in Islamic values — **not** a corporate SaaS look, **not** a generic WordPress school template. Think "prestigious private school storytelling" (narrative sections, real stats, genuine warmth) crossed with the everyday practical needs of an Indonesian madrasah (PPDB, tuition info, school news).

Avoid: cold minimalist startup aesthetics, aggressive primary colors, generic stock-icon dashboards, heavy drop shadows, all-caps eyebrow labels stacked everywhere, gradient-washed cards.

## Color tokens
Derived from the school's official logo (a green circular badge with a gold star, an open Quran, and wheat/leaf motifs).

| Token | Hex | Usage |
|---|---|---|
| `emerald-deep` | `#0B4A2E` | Primary brand color — nav, headings, primary buttons, dark bands |
| `emerald-leaf` | `#1E7A42` | Secondary accent — hover states, gradients, links |
| `emerald-leaf-soft` | `#2C8F52` | Tertiary accent, icon backgrounds |
| `gold` | `#D9A62B` | Sparse accent ONLY — small badges, star icon, one CTA per page max. Never a dominant color or large fill area |
| `gold-soft` | `#F0D68A` | Lightened gold for hover/soft backgrounds |
| `ivory` | `#F7F4EC` | Main background — warm, not pure white |
| `ivory-2` | `#FBF9F3` | Secondary surface / alt section background |
| `ink` | `#12261B` | Primary text — dark warm green-black, not pure black |
| `ink-soft` | `#3E5548` | Secondary/body text |
| `border` | `#DCD6C5` | Hairline borders, card outlines |

Dark mode: invert to deep green/near-black backgrounds (`#0E1913`, `#122019`) with warm ivory text (`#EDEAE0`), keeping the same emerald/gold accent roles.

## Typography
- **Headings:** a bold, high-contrast elegant serif (Playfair Display / Times New Roman) — classical, institutional, and prestigious.
- **Body/UI:** a clean, highly legible sans-serif (e.g. Plus Jakarta Sans / Inter) at weights 400–700.
- Don't use more than these two families. Don't italicize or single-word-accent headlines. No all-caps section labels as a crutch — use small colored "pill" badges instead where a label is needed.

## Layout principles
- Generous whitespace, airy sections (min. ~80px vertical padding on desktop).
- Soft rounded cards (16–28px radius), subtle 1px borders instead of heavy box-shadows.
- One bold visual moment per page (typically the hero) — everything else stays calm and disciplined.
- Motion: sparingly. A single orchestrated hero moment is fine; avoid scattering fade-in-on-scroll and hover-lift on every single card.
- Fully responsive, mobile-first breakpoints.

## Required sections (landing page)
1. **Sticky nav** — logo + wordmark, links (Profil, Program Unggulan, Nilai Kami, Berita, Kontak), a prominent rounded "Daftar PPDB" pill button in `emerald-deep`.
2. **Hero** — large serif headline (max ~16 characters per line) about nurturing sincere, knowledgeable students; supporting paragraph; two CTAs (primary: Daftar PPDB, secondary: Kenali Madrasah Kami); a visual panel (photo/video montage placeholder) with the gold star motif; a 4-stat bar below (students, teacher ratio, accreditation, years of service).
3. **About/Vision split** — two-column narrative: "Tentang Kami" and "Visi Kami," short paragraphs, no bullet lists.
4. **Program Unggulan grid** — 6 cards (Tahfidz & Tahsin Qur'an, Akhlak & Ibadah, Bahasa Arab & Inggris, Ekstrakurikuler Seni & Pramuka, Sains & Numerasi Terapan, Kegiatan Sosial), each: icon, title, one-line description, text link.
5. **Nilai Kami band** — dark `emerald-deep` full-width band with 5 small value cards (Ikhlas, Amanah, Berakhlak, Berilmu, Kebersamaan), icon + title + one line each.
6. **Testimonial** — photo placeholder + parent quote + name/role, editorial serif quote styling.
7. **Berita grid** — 3 recent news cards (date, thumbnail, title), sourced from the school's news feed.
8. **PPDB CTA banner** — full-width `emerald-deep`→`emerald-leaf` gradient band, gold primary button, inviting registration.
9. **Footer** — school info/address, nav links, contact (phone, email, Instagram).

## Content voice
Bahasa Indonesia, warm and direct, no corporate jargon. Speak from the school's perspective to parents ("Anda") — plain, respectful, sincere. Avoid hard-sell admissions language; this is a community school, not a competitive prep academy.
