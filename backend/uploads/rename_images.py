#!/usr/bin/env python3
"""
rename_images.py
────────────────
Renames 39 JPG files in the current directory to match the
EL-Motahida Trade website's section-based naming convention.

USAGE
  1. Copy this script into the folder that holds the 39 JPGs.
  2. Run:  python rename_images.py
  3. A dry-run preview is shown first.
     Type  YES  to confirm renaming, anything else to abort.

NAMING MAP
  Each target name maps to a specific image slot on the website.
  Section prefix  →  website component
  ─────────────────────────────────────────────────────────────
  hero-bg-*               Hero.jsx            (background images)
  gallery-*               OEMSpareParts.jsx   (manufacturing gallery)
  expertise-*             Expertise.jsx       (expertise grid)
  product-*               Expertise.jsx       (featured products row)
  trusted-*               TrustedPartner.jsx  (service cards)
  project-*               TurnkeyProjects.jsx (slider slides)
  explore-*               ExploreMore.jsx     (explore cards)
  client-logo-*           ExploreMore.jsx     (client logo carousel)
"""

import os
import sys

# ─── TARGET NAMES (39 total) ───────────────────────────────────────────────
TARGET_NAMES = [
    # ── Hero Section (Hero.jsx) ──────────────────────── 2 images
    "hero-bg-01.jpg",                        # main hero background
    "hero-bg-02.jpg",                        # secondary / overlay hero bg

    # ── Manufacturing Gallery (OEMSpareParts.jsx) ────── 7 images
    "gallery-01-casting-unit.jpg",
    "gallery-02-machining-center.jpg",
    "gallery-03-quality-control.jpg",
    "gallery-04-assembly-line.jpg",
    "gallery-05-testing-lab.jpg",
    "gallery-06-shipping.jpg",
    "gallery-07-rd-facility.jpg",

    # ── Expertise Grid (Expertise.jsx) ───────────────── 5 images
    "expertise-01-pulp-machinery.jpg",
    "expertise-02-paper-machine-solutions.jpg",
    "expertise-03-molded-fiber-tech.jpg",
    "expertise-04-refining-systems.jpg",
    "expertise-05-agitators-screens.jpg",

    # ── Featured Products (Expertise.jsx) ────────────── 4 images
    "product-01-double-disc-refiner.jpg",
    "product-02-pressure-screen.jpg",
    "product-03-high-density-cleaner.jpg",
    "product-04-pulper-automation.jpg",

    # ── Trusted Partner Cards (TrustedPartner.jsx) ───── 6 images
    "trusted-01-turnkey-installations.jpg",
    "trusted-02-custom-heavy-machinery.jpg",
    "trusted-03-modernization-upgrades.jpg",
    "trusted-04-automation-control.jpg",
    "trusted-05-preventative-maintenance.jpg",
    "trusted-06-global-spares-delivery.jpg",

    # ── Turnkey Project Slides (TurnkeyProjects.jsx) ─── 8 images
    "project-01-paper-mill-mena.jpg",        # existing slide (10 TPD MENA)
    "project-02.jpg",
    "project-03.jpg",
    "project-04.jpg",
    "project-05.jpg",
    "project-06.jpg",
    "project-07.jpg",
    "project-08.jpg",

    # ── Explore More Cards (ExploreMore.jsx) ─────────── 4 images
    "explore-01-technical-papers.jpg",
    "explore-02-case-studies.jpg",
    "explore-03-sustainability.jpg",
    "explore-04-career-opportunities.jpg",

    # ── Client Logo Carousel (ExploreMore.jsx) ───────── 3 images
    "client-logo-01.jpg",
    "client-logo-02.jpg",
    "client-logo-03.jpg",
]

assert len(TARGET_NAMES) == 39, f"Expected 39 targets, got {len(TARGET_NAMES)}"

# ─── COLLECT SOURCE FILES ──────────────────────────────────────────────────

def collect_jpgs(directory: str) -> list[str]:
    """Return sorted list of .jpg/.jpeg filenames (basename only) in directory."""
    files = sorted(
        f for f in os.listdir(directory)
        if f.lower().endswith((".jpg", ".jpeg"))
        and os.path.isfile(os.path.join(directory, f))
    )
    return files


def main():
    directory = os.path.dirname(os.path.abspath(__file__))
    source_files = collect_jpgs(directory)

    print(f"\\n📁 Folder  : {directory}")
    print(f"📸 JPGs found : {len(source_files)}")
    print(f"🎯 Targets    : {len(TARGET_NAMES)}\\n")

    if len(source_files) == 0:
        print("❌  No JPG files found. Make sure this script is in the "
              "same folder as your images.")
        sys.exit(1)

    if len(source_files) != 39:
        print(f"⚠️  WARNING: Found {len(source_files)} JPGs but expected 39.")
        print("   Proceeding — only files with a matching target will be renamed.\\n")

    pairs = list(zip(source_files, TARGET_NAMES))

    # ── Dry-run preview ──────────────────────────────────────────────────
    col_w = max(len(s) for s, _ in pairs) + 2
    print(f"{'SOURCE FILE':<{col_w}}  →  TARGET NAME")
    print("─" * (col_w + 40))
    for src, tgt in pairs:
        marker = "✓" if src != tgt else "─"
        print(f"  {src:<{col_w}} →  {tgt}   {marker}")

    # ── Conflict check ───────────────────────────────────────────────────
    conflicts = []
    for _, tgt in pairs:
        tgt_path = os.path.join(directory, tgt)
        if os.path.exists(tgt_path) and tgt not in [s for s, _ in pairs]:
            conflicts.append(tgt)

    if conflicts:
        print(f"\\n⚠️  These target names already exist as OTHER files:")
        for c in conflicts:
            print(f"     {c}")
        print("   Rename or remove them before proceeding.\\n")

    # ── Modify to automate YES response if passed an arg ─────────
    if len(sys.argv) > 1 and sys.argv[1] == "--auto":
        answer = "YES"
        print("  Auto-confirming YES due to --auto flag.")
    else:
        print(f"\\n{'─'*55}")
        answer = input("  Type  YES  to rename, anything else to abort: ").strip()

    if answer != "YES":
        print("  Aborted. No files were renamed.")
        sys.exit(0)

    # ── Execute ──────────────────────────────────────────────────────────
    renamed = 0
    skipped = 0
    errors  = 0

    for src, tgt in pairs:
        src_path = os.path.join(directory, src)
        tgt_path = os.path.join(directory, tgt)

        if src == tgt:
            skipped += 1
            continue
        try:
            os.rename(src_path, tgt_path)
            print(f"  ✅  {src}  →  {tgt}")
            renamed += 1
        except OSError as e:
            print(f"  ❌  {src}  →  {tgt}   ERROR: {e}")
            errors += 1

    print(f"\\n{'─'*55}")
    print(f"  Done.  Renamed: {renamed}  |  Skipped (same name): {skipped}  |  Errors: {errors}")

    if renamed > 0:
        print(f"\\n  📦  Next step: copy all renamed files to")
        print(f"       backend/uploads/")
        print(f"      They will be served at  http://localhost:5000/uploads/<filename>")


if __name__ == "__main__":
    main()
