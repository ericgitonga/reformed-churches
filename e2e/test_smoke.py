"""Golden-path smoke checks. Extend with real specs as pages/flows are built."""

from _common import BASE_URL, browser_page


def test_homepage_loads():
    with browser_page() as page:
        resp = page.goto("/")
        assert resp.status == 200


def test_homepage_lists_churches():
    with browser_page() as page:
        page.goto("/")
        assert page.locator("li", has_text="Cornerstone Baptist Church").is_visible()


def test_homepage_text_legible_in_dark_mode():
    # #8 follow-up: the homepage background correctly tracks system theme via a CSS variable,
    # so its text must too (dark:* variants) rather than a hardcoded color — unlike the modal's
    # always-light card, which correctly does hardcode dark text. Actually paint the computed
    # color to a canvas and read the pixel back, since getComputedStyle can return non-rgb()
    # color-space notation (lab()/oklch()) that a naive string parse would choke on.
    with browser_page() as page:
        page.emulate_media(color_scheme="dark")
        page.goto("/")
        r, g, b = page.evaluate(
            """() => {
                const color = getComputedStyle(document.querySelector('h1')).color;
                const canvas = document.createElement('canvas');
                canvas.width = canvas.height = 1;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = color;
                ctx.fillRect(0, 0, 1, 1);
                return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3));
            }"""
        )
        assert min(r, g, b) > 150, f"homepage title too dark against the dark background: rgb({r},{g},{b})"


def test_health_endpoint():
    with browser_page() as page:
        resp = page.request.get(f"{BASE_URL}/api/health")
        assert resp.status == 200
        assert resp.json() == {"status": "ok"}


TESTS = [
    test_homepage_loads,
    test_homepage_lists_churches,
    test_homepage_text_legible_in_dark_mode,
    test_health_endpoint,
]

if __name__ == "__main__":
    for t in TESTS:
        t()
        print(f"PASS {t.__name__}")
