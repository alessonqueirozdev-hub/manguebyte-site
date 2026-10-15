"""Makes the site's images from the framework's logo.

    python tools/make-images.py path/to/logo.png [path/to/aratu-mascot.png]

The logo is `assets/logo.png` in the framework's repository: the crab on a
black background, 1040 pixels square. The Aratu mascot, also on black, is
`docs/images/aratu-mascot.png` in the Aratu repository. The results are committed to
`src/assets/img`, so building the site needs neither Python nor Pillow; run
this again only when the logo changes.

Needs Pillow (`pip install pillow`).
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "assets" / "img"
FONTS = ROOT / "src" / "assets" / "fonts"

# The background of the logo, which the page repeats around it.
BLACK = (1, 2, 6)
PAPER = (243, 234, 215)
CRAB = (240, 78, 28)


def main() -> None:
    logo = Image.open(sys.argv[1]).convert("RGB")
    OUT.mkdir(parents=True, exist_ok=True)

    # The whole crab, for the page. 720 pixels serves a 360-pixel slot on a
    # dense screen; 360 serves it on an ordinary one.
    for size in (720, 360):
        logo.resize((size, size), Image.LANCZOS).save(
            OUT / f"crab-{size}.webp", "WEBP", quality=82, method=6
        )

    # Small icons show the face only: the whole drawing is too fine at 32
    # pixels.
    face = logo.crop((110, 190, 730, 810))
    for name, size in (("icon-192.png", 192), ("apple-touch-icon.png", 180)):
        face.resize((size, size), Image.LANCZOS).save(OUT / name, "PNG", optimize=True)
    face.resize((48, 48), Image.LANCZOS).save(
        OUT / "favicon.ico", "ICO", sizes=[(16, 16), (32, 32), (48, 48)]
    )

    # The card shown when a link to the site is shared.
    card = Image.new("RGB", (1200, 630), BLACK)
    crab = logo.resize((600, 600), Image.LANCZOS)
    card.paste(crab, (610, 15))
    draw = ImageDraw.Draw(card)
    title = ImageFont.truetype(str(FONTS / "londrina-solid-900.woff2"), 112)
    text = ImageFont.truetype(str(FONTS / "atkinson-hyperlegible-next.woff2"), 38)
    draw.text((70, 164), "MANGUEBYTE", font=title, fill=PAPER)
    draw.rectangle((72, 300, 232, 310), fill=CRAB)
    draw.text((70, 340), "An audio framework for Rust.", font=text, fill=PAPER)
    draw.text((70, 392), "Tested, not promised.", font=text, fill=CRAB)
    card.save(OUT / "card.jpg", "JPEG", quality=86, optimize=True, progressive=True)

    # Aratu's mascot, for its page and the ecosystem section.
    if len(sys.argv) > 2:
        mascot = Image.open(sys.argv[2]).convert("RGB")
        for size in (720, 360):
            mascot.resize((size, size), Image.LANCZOS).save(
                OUT / f"aratu-{size}.webp", "WEBP", quality=82, method=6
            )

    for path in sorted(OUT.iterdir()):
        print(f"{path.name:24} {path.stat().st_size / 1024:7.1f} KB")


if __name__ == "__main__":
    main()
