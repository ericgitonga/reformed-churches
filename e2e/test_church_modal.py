"""Golden-path checks for the church list -> detail modal interaction (#3)."""

from _common import MOBILE_VIEWPORT, browser_page

CHURCH_NAME = "Cornerstone Baptist Church"


def _open_modal(page):
    page.goto("/")
    page.get_by_role("button", name=CHURCH_NAME).click()
    modal = page.get_by_role("dialog")
    modal.wait_for(state="visible")
    return modal


def test_click_church_opens_modal_with_location():
    with browser_page() as page:
        modal = _open_modal(page)
        assert modal.get_by_text(CHURCH_NAME).is_visible()
        assert modal.get_by_text("Location").is_visible()
        assert modal.get_by_role("link", name="View on Google Maps").is_visible()


def test_modal_omits_fields_with_no_data():
    # Christ Supremacy Church has no enrichment at all (pastor/phone/email/website all null) —
    # the modal must not render empty/broken rows for any of them.
    with browser_page() as page:
        page.goto("/")
        page.get_by_role("button", name="Christ Supremacy Church").click()
        modal = page.get_by_role("dialog")
        modal.wait_for(state="visible")
        assert modal.get_by_text("Senior Pastor").count() == 0
        assert modal.get_by_text("Contact").count() == 0
        assert modal.get_by_text("Website").count() == 0


def test_modal_shows_enriched_fields_when_present():
    # Cornerstone Baptist Church has a real pastor, email, and website after enrichment (#4).
    with browser_page() as page:
        modal = _open_modal(page)
        assert modal.get_by_text("Senior Pastor").is_visible()
        assert modal.get_by_text("Phillip Ipala").is_visible()
        assert modal.get_by_text("Contact").is_visible()
        assert modal.get_by_role("link", name="omurocho@gmail.com").is_visible()
        assert modal.get_by_role("link", name="Visit website").is_visible()


def test_modal_text_legible_in_dark_mode():
    # #8: the modal card is a hardcoded light background, but body's text color came from a
    # CSS variable that goes near-white under prefers-color-scheme: dark, washing out the title
    # and field values (labels/links stayed legible since they had their own explicit colors).
    # Check actual computed color, not just a class name, so this catches a regression even if
    # the fix changes shape later.
    with browser_page() as page:
        page.emulate_media(color_scheme="dark")
        modal = _open_modal(page)
        # getComputedStyle (and even canvas fillStyle) can return modern wide-gamut color-space
        # notation (lab()/oklch()) rather than rgb() depending on how the color was authored, and
        # modern Chromium's canvas now preserves that notation too instead of normalizing it.
        # Actually painting a pixel and reading it back via getImageData is the one thing that's
        # always plain 8-bit sRGB regardless of input color space.
        r, g, b = page.evaluate(
            """() => {
                const color = getComputedStyle(document.getElementById('church-modal-title')).color;
                const canvas = document.createElement('canvas');
                canvas.width = canvas.height = 1;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = color;
                ctx.fillRect(0, 0, 1, 1);
                return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3));
            }"""
        )
        assert max(r, g, b) < 100, f"modal title too light against the white card: rgb({r},{g},{b})"


def test_close_button_closes_modal():
    with browser_page() as page:
        modal = _open_modal(page)
        page.get_by_role("button", name="Close").click()
        modal.wait_for(state="hidden")


def test_backdrop_click_closes_modal():
    with browser_page() as page:
        modal = _open_modal(page)
        # The dialog role element is the full-viewport backdrop itself (`fixed inset-0`), so
        # its own bounding box spans the whole screen — click a fixed point near the top of the
        # viewport, well above the vertically-centered card, rather than deriving an offset from
        # that bounding box (which would be at ~(0,0) and go negative/invalid).
        page.mouse.click(10, 10)
        modal.wait_for(state="hidden")


def test_modal_works_on_mobile_viewport():
    with browser_page(viewport=MOBILE_VIEWPORT) as page:
        modal = _open_modal(page)
        assert modal.is_visible()
        box = modal.bounding_box()
        assert box["width"] <= MOBILE_VIEWPORT["width"]


TESTS = [
    test_click_church_opens_modal_with_location,
    test_modal_omits_fields_with_no_data,
    test_modal_shows_enriched_fields_when_present,
    test_modal_text_legible_in_dark_mode,
    test_close_button_closes_modal,
    test_backdrop_click_closes_modal,
    test_modal_works_on_mobile_viewport,
]

if __name__ == "__main__":
    for t in TESTS:
        t()
        print(f"PASS {t.__name__}")
