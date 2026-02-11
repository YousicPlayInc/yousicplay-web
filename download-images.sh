#!/bin/bash
# =============================================================================
# YousicPlay Image Download Script
# =============================================================================
# Downloads all original images from yousicplay.com WordPress uploads
# and organizes them into the Next.js public/images/ directory structure.
#
# Usage: ./download-images.sh
# Requires: wget (install via `brew install wget` on macOS)
# =============================================================================

set -e

BASE_URL="https://yousicplay.com/wp-content/uploads"
DEST="public/images"

# Determine project root (script location)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "============================================="
echo "  YousicPlay Image Downloader"
echo "============================================="
echo ""

# Check for wget
if ! command -v wget &> /dev/null; then
    echo "ERROR: wget is required but not installed."
    echo "Install with: brew install wget"
    exit 1
fi

# -----------------------------------------------------------------------------
# Create directory structure
# -----------------------------------------------------------------------------
echo "[1/9] Creating directory structure..."

mkdir -p "$DEST/instructors"
mkdir -p "$DEST/courses"
mkdir -p "$DEST/course-sections"
mkdir -p "$DEST/partners"
mkdir -p "$DEST/decorative"
mkdir -p "$DEST/testimonials"
mkdir -p "$DEST/homepage"

echo "  Created: $DEST/instructors/"
echo "  Created: $DEST/courses/"
echo "  Created: $DEST/course-sections/"
echo "  Created: $DEST/partners/"
echo "  Created: $DEST/decorative/"
echo "  Created: $DEST/testimonials/"
echo "  Created: $DEST/homepage/"
echo ""

# Helper function: download with error handling
download() {
    local url="$1"
    local dest="$2"
    if [ -f "$dest" ]; then
        echo "  SKIP (exists): $dest"
    else
        echo "  Downloading: $(basename "$dest")"
        wget -q --timeout=30 -O "$dest" "$url" || {
            echo "  WARNING: Failed to download $(basename "$dest")"
            rm -f "$dest"
        }
    fi
}

# -----------------------------------------------------------------------------
# Logo / Branding
# -----------------------------------------------------------------------------
echo "[2/9] Downloading logo and branding..."

download "$BASE_URL/2024/03/yousic-logo.svg" \
    "$DEST/yousic-logo.svg"

download "$BASE_URL/2024/04/cropped-Black-Y-_-no-bg.png" \
    "$DEST/favicon.png"

echo ""

# -----------------------------------------------------------------------------
# Partner Logos
# -----------------------------------------------------------------------------
echo "[3/9] Downloading partner logos..."

download "$BASE_URL/2024/04/Yplay-Website-Logos-01.svg" \
    "$DEST/partners/partner-logo-01.svg"

download "$BASE_URL/2024/04/Yplay-Website-Logos-02.svg" \
    "$DEST/partners/partner-logo-02.svg"

download "$BASE_URL/2024/04/Yplay-Website-Logos-03.svg" \
    "$DEST/partners/partner-logo-03.svg"

download "$BASE_URL/2024/04/Yplay-Website-Logos-04.svg" \
    "$DEST/partners/partner-logo-04.svg"

download "$BASE_URL/2024/04/Yplay-Website-Logos-05.svg" \
    "$DEST/partners/partner-logo-05.svg"

echo ""

# -----------------------------------------------------------------------------
# Instructor Portraits (card images for homepage grid + /all-classes catalog)
# -----------------------------------------------------------------------------
echo "[4/9] Downloading instructor portraits..."

# Cory Henry - 4x3 landscape card
download "$BASE_URL/2024/03/Cory-Workshop-4x3-2.png" \
    "$DEST/instructors/cory-henry-workshop.png"

# Alain Merville - 4x3 landscape card
download "$BASE_URL/2024/04/Alain-4x3-1.png" \
    "$DEST/instructors/alain-merville.png"

# Jesus Molina (workshop) - 4x3 landscape card
download "$BASE_URL/2024/04/Jesus-Workshop-4x3-1.png" \
    "$DEST/instructors/jesus-molina-workshop.png"

# Lindsey Stirling - 4x3 landscape card
download "$BASE_URL/2024/04/Lindsey-4x3-1.png" \
    "$DEST/instructors/lindsey-stirling.png"

# Jax - 4x3 landscape card
download "$BASE_URL/2024/04/Jax-4x3-1.png" \
    "$DEST/instructors/jax.png"

# Jesus Molina (class) - 4x5 portrait card
download "$BASE_URL/2024/04/Jesus-course-4x5-2.png" \
    "$DEST/instructors/jesus-molina-class.png"

# Jordan Rudess - 4x5 portrait card
download "$BASE_URL/2024/04/Jordan-4x5-1.png" \
    "$DEST/instructors/jordan-rudess.png"

# Robert "Sput" Searight - 4x5 portrait card
download "$BASE_URL/2024/04/Sput-4x5-1.png" \
    "$DEST/instructors/robert-sput-searight.png"

# Chrisette Michele - 4x5 portrait card
download "$BASE_URL/2024/04/Chrisette-4x5-1.png" \
    "$DEST/instructors/chrisette-michele.png"

# Shedrick Mitchell - 4x5 portrait card
download "$BASE_URL/2024/04/Shedrick-4x5-1.png" \
    "$DEST/instructors/shedrick-mitchell.png"

# Eric Gales - 4x5 portrait card
download "$BASE_URL/2024/05/Eric-4x5-1.png" \
    "$DEST/instructors/eric-gales-2.png"

# Andrew Gouche - 4x5 portrait card
download "$BASE_URL/2024/05/Andrew-4x5-1.png" \
    "$DEST/instructors/andrew-gouche.png"

# Myron Butler - 4x5 portrait card
download "$BASE_URL/2024/05/Myron-4x5-1.png" \
    "$DEST/instructors/myron-butler.png"

# Noel Schajris - 4x5 portrait card
download "$BASE_URL/2024/05/Noel-4x5-1.png" \
    "$DEST/instructors/noel-schajris.png"

echo ""

# -----------------------------------------------------------------------------
# Course Hero Images (large banners for /classes/[slug] pages)
# -----------------------------------------------------------------------------
echo "[5/9] Downloading course hero images..."

download "$BASE_URL/2024/03/Cory-Workshop-Hero-image.png" \
    "$DEST/courses/cory-henry-workshop-hero.png"

download "$BASE_URL/2024/04/Alain-Hero-image.png" \
    "$DEST/courses/alain-merville-hero.png"

# Jesus Molina workshop - primary hero (version 2)
download "$BASE_URL/2024/04/Jesus-Workshop-Hero-image-2.png" \
    "$DEST/courses/jesus-molina-workshop-hero.png"

# Jesus Molina workshop - alternate hero (version 1)
download "$BASE_URL/2024/04/Jesus-Workshop-Hero-image-1.png" \
    "$DEST/courses/jesus-molina-workshop-hero-alt.png"

# Jesus Molina class hero (note: original filename has typo "coure")
download "$BASE_URL/2024/04/Jesus-coure-Hero-image-1.png" \
    "$DEST/courses/jesus-molina-class-hero.png"

download "$BASE_URL/2024/04/Jordan-Hero-image.png" \
    "$DEST/courses/jordan-rudess-hero.png"

download "$BASE_URL/2024/04/Shedrick-Hero-image.png" \
    "$DEST/courses/shedrick-mitchell-hero.png"

download "$BASE_URL/2024/04/Lindsey-Hero-image-1.png" \
    "$DEST/courses/lindsey-stirling-hero.png"

download "$BASE_URL/2024/04/Jax-Hero-image.png" \
    "$DEST/courses/jax-hero.png"

download "$BASE_URL/2024/04/Sput-Hero-image.png" \
    "$DEST/courses/robert-sput-searight-hero.png"

download "$BASE_URL/2024/04/Chrisette-Hero-image.png" \
    "$DEST/courses/chrisette-michele-hero.png"

download "$BASE_URL/2024/05/Eric-Hero-image.png" \
    "$DEST/courses/eric-gales-2-hero.png"

download "$BASE_URL/2024/05/Andrew-Hero-image.png" \
    "$DEST/courses/andrew-gouche-hero.png"

download "$BASE_URL/2024/05/Myron-Hero-image.png" \
    "$DEST/courses/myron-butler-hero.png"

download "$BASE_URL/2024/05/Noel-Hero-image.png" \
    "$DEST/courses/noel-schajris-hero.png"

echo ""

# -----------------------------------------------------------------------------
# Course Section Images (lifestyle/descriptive images within course pages)
# -----------------------------------------------------------------------------
echo "[6/9] Downloading course section images..."

# -- Cory Henry Workshop --
download "$BASE_URL/2024/03/Cory-workshop-_-hands-on-keys.png" \
    "$DEST/course-sections/cory-henry-workshop-hands-on-keys.png"

# -- Alain Merville --
download "$BASE_URL/2024/04/Alain-course-_-hands-on-piano-keys.png" \
    "$DEST/course-sections/alain-merville-hands-on-piano-keys.png"

download "$BASE_URL/2024/04/Alain-course-_-young-male-playing-piano.png" \
    "$DEST/course-sections/alain-merville-young-male-playing-piano.png"

# -- Jesus Molina Workshop --
download "$BASE_URL/2024/04/Jesus-workshop-_-keyboard.png" \
    "$DEST/course-sections/jesus-molina-workshop-keyboard.png"

download "$BASE_URL/2024/04/Jesus-workshop-_-male-on-keyboard.png" \
    "$DEST/course-sections/jesus-molina-workshop-male-on-keyboard.png"

download "$BASE_URL/2024/04/Jesus-workshop-_-hands-on-keys.png" \
    "$DEST/course-sections/jesus-molina-workshop-hands-on-keys.png"

# -- Jesus Molina Class --
download "$BASE_URL/2024/04/Jesus-course-_-hands-on-keys.png" \
    "$DEST/course-sections/jesus-molina-class-hands-on-keys.png"

download "$BASE_URL/2024/04/Jesus-course-_-hands-on-keys-2.png" \
    "$DEST/course-sections/jesus-molina-class-hands-on-keys-2.png"

download "$BASE_URL/2024/04/Jesus-course-_-male-on-keyboard.png" \
    "$DEST/course-sections/jesus-molina-class-male-on-keyboard.png"

# -- Jordan Rudess --
download "$BASE_URL/2024/04/Jordan-_-hands-on-keys.png" \
    "$DEST/course-sections/jordan-rudess-hands-on-keys.png"

download "$BASE_URL/2024/04/Jordan-_-male-playing-keyboard.png" \
    "$DEST/course-sections/jordan-rudess-male-playing-keyboard.png"

# -- Shedrick Mitchell --
download "$BASE_URL/2024/04/Shedrick-_-male-on-keyboard.png" \
    "$DEST/course-sections/shedrick-mitchell-male-on-keyboard.png"

download "$BASE_URL/2024/04/Shedrick-_-male-on-piano.png" \
    "$DEST/course-sections/shedrick-mitchell-male-on-piano.png"

# -- Lindsey Stirling --
download "$BASE_URL/2024/04/Lindsey-_-close-up-on-violin-2.png" \
    "$DEST/course-sections/lindsey-stirling-close-up-on-violin-2.png"

download "$BASE_URL/2024/04/Lindsey-_-close-up-playing-violin.png" \
    "$DEST/course-sections/lindsey-stirling-close-up-playing-violin.png"

download "$BASE_URL/2024/04/Lindsey-_-female-playing-violin.png" \
    "$DEST/course-sections/lindsey-stirling-female-playing-violin.png"

# -- Jax --
download "$BASE_URL/2024/04/Jax-_-female-on-keyboards.png" \
    "$DEST/course-sections/jax-female-on-keyboards.png"

download "$BASE_URL/2024/04/Jax-_-female-singer.png" \
    "$DEST/course-sections/jax-female-singer.png"

download "$BASE_URL/2024/04/Jax-_-female-singing-in-band.png" \
    "$DEST/course-sections/jax-female-singing-in-band.png"

# -- Robert "Sput" Searight --
download "$BASE_URL/2024/04/Sput-_-close-up-drums.png" \
    "$DEST/course-sections/robert-sput-searight-close-up-drums.png"

download "$BASE_URL/2024/04/Sput-_-close-up-drums-2.png" \
    "$DEST/course-sections/robert-sput-searight-close-up-drums-2.png"

download "$BASE_URL/2024/04/Sput-_-male-playing-drums.png" \
    "$DEST/course-sections/robert-sput-searight-male-playing-drums.png"

# -- Chrisette Michele --
download "$BASE_URL/2024/04/Chrisette-_-concert-singer.png" \
    "$DEST/course-sections/chrisette-michele-concert-singer.png"

download "$BASE_URL/2024/04/Chrisette-_-female-singer.png" \
    "$DEST/course-sections/chrisette-michele-female-singer.png"

download "$BASE_URL/2024/04/Chrisette-_-young-female-singing-in-band.png" \
    "$DEST/course-sections/chrisette-michele-young-female-singing-in-band.png"

# -- Eric Gales --
download "$BASE_URL/2024/05/Eric-_-Close-up-on-guitar.png" \
    "$DEST/course-sections/eric-gales-2-close-up-on-guitar.png"

download "$BASE_URL/2024/05/Eric-_-Close-up-on-guitar-2.png" \
    "$DEST/course-sections/eric-gales-2-close-up-on-guitar-2.png"

download "$BASE_URL/2024/05/Eric-_-2-guys-on-guitars.png" \
    "$DEST/course-sections/eric-gales-2-two-guys-on-guitars.png"

# -- Andrew Gouche --
download "$BASE_URL/2024/05/Andrew-_-bass-image.png" \
    "$DEST/course-sections/andrew-gouche-bass-image.png"

download "$BASE_URL/2024/05/Andrew-_-close-up-playing-bass.png" \
    "$DEST/course-sections/andrew-gouche-close-up-playing-bass.png"

download "$BASE_URL/2024/05/Andrew-_-male-playing-bass.png" \
    "$DEST/course-sections/andrew-gouche-male-playing-bass.png"

# -- Myron Butler --
download "$BASE_URL/2024/05/Myron-_-2-women-singing.png" \
    "$DEST/course-sections/myron-butler-two-women-singing.png"

download "$BASE_URL/2024/05/Myron-_-female-gospel-singer.png" \
    "$DEST/course-sections/myron-butler-female-gospel-singer.png"

download "$BASE_URL/2024/05/Myron-_-microphone.png" \
    "$DEST/course-sections/myron-butler-microphone.png"

# -- Noel Schajris --
download "$BASE_URL/2024/05/Noel-_-2-male-singers.png" \
    "$DEST/course-sections/noel-schajris-two-male-singers.png"

download "$BASE_URL/2024/05/Noel-_-male-singer.png" \
    "$DEST/course-sections/noel-schajris-male-singer.png"

download "$BASE_URL/2024/05/Noel-_-male-singing-with-guitar.png" \
    "$DEST/course-sections/noel-schajris-male-singing-with-guitar.png"

echo ""

# -----------------------------------------------------------------------------
# Homepage / Shared Images
# -----------------------------------------------------------------------------
echo "[7/9] Downloading homepage and shared images..."

download "$BASE_URL/2024/03/banner-video4.png" \
    "$DEST/homepage/banner-video4.png"

download "$BASE_URL/2024/04/banner-video.jpg" \
    "$DEST/homepage/banner-video.jpg"

download "$BASE_URL/2024/03/video-overlay-c.jpg" \
    "$DEST/homepage/video-overlay.jpg"

download "$BASE_URL/2024/03/community-hero.png" \
    "$DEST/homepage/community-hero.png"

download "$BASE_URL/2024/04/neyo-square.jpg" \
    "$DEST/homepage/neyo-square.jpg"

download "$BASE_URL/2024/03/your-music-your-way-1.png" \
    "$DEST/homepage/your-music-your-way-1.png"

download "$BASE_URL/2024/03/your-music-your-way-2.png" \
    "$DEST/homepage/your-music-your-way-2.png"

download "$BASE_URL/2024/03/your-music-your-way-3.png" \
    "$DEST/homepage/your-music-your-way-3.png"

download "$BASE_URL/2024/03/your-music-your-way-4.png" \
    "$DEST/homepage/your-music-your-way-4.png"

# Lesson plan stock photo (hash-named original, used in class page lesson plan sections)
download "$BASE_URL/2024/03/03ab75c1c037d320be75a9c616206087.jpeg" \
    "$DEST/homepage/lesson-plan-stock.jpeg"

echo ""

# -----------------------------------------------------------------------------
# UI / Decorative
# -----------------------------------------------------------------------------
echo "[8/9] Downloading UI and decorative elements..."

download "$BASE_URL/2024/03/play-icon.svg" \
    "$DEST/decorative/play-icon.svg"

download "$BASE_URL/2024/03/green-quote.png" \
    "$DEST/decorative/green-quote.png"

download "$BASE_URL/2024/03/star-purple.png" \
    "$DEST/decorative/star-purple.png"

download "$BASE_URL/2024/03/star-bg.png" \
    "$DEST/decorative/star-bg.png"

download "$BASE_URL/2024/03/stroke-bg.png" \
    "$DEST/decorative/stroke-bg.png"

download "$BASE_URL/2024/03/quotes.png" \
    "$DEST/decorative/quotes.png"

download "$BASE_URL/2024/03/quotes-musicians.png" \
    "$DEST/decorative/quotes-musicians.png"

download "$BASE_URL/2024/05/All-devices-icon-1.svg" \
    "$DEST/decorative/all-devices-icon.svg"

download "$BASE_URL/2024/05/Money-back-guarantee-icon-1-1.svg" \
    "$DEST/decorative/money-back-guarantee-icon.svg"

echo ""

# -----------------------------------------------------------------------------
# Testimonials
# -----------------------------------------------------------------------------
echo "[9/9] Downloading testimonial images..."

download "$BASE_URL/2024/04/PabloFerrando_Jesus-course-testimonial-image.png" \
    "$DEST/testimonials/pablo-ferrando.png"

download "$BASE_URL/2024/07/client1.png" \
    "$DEST/testimonials/client1.png"

# Myron Butler endorser photo (used on other instructors' course pages)
download "$BASE_URL/2024/03/Myron-Butler.png" \
    "$DEST/testimonials/myron-butler-endorser.png"

# Jesus Molina endorser photo (used on other instructors' course pages)
download "$BASE_URL/2024/03/Jesus-Molina.png" \
    "$DEST/testimonials/jesus-molina-endorser.png"

echo ""

# -----------------------------------------------------------------------------
# Summary
# -----------------------------------------------------------------------------
echo "============================================="
echo "  Download Complete!"
echo "============================================="
echo ""

# Count downloaded files
TOTAL=$(find "$DEST" -type f | wc -l | tr -d ' ')
echo "Total files downloaded: $TOTAL"
echo ""
echo "Directory structure:"
echo "  $DEST/"
for dir in "" instructors courses course-sections partners decorative testimonials homepage; do
    if [ -z "$dir" ]; then
        count=$(find "$DEST" -maxdepth 1 -type f | wc -l | tr -d ' ')
        echo "    / (root):          $count files"
    else
        count=$(find "$DEST/$dir" -type f 2>/dev/null | wc -l | tr -d ' ')
        echo "    /$dir/:  $count files"
    fi
done
echo ""
echo "Next steps:"
echo "  1. Update component imports to reference public/images/ paths"
echo "  2. Consider converting PNGs to WebP for better performance"
echo "  3. Add images to .gitignore if they should not be committed"
