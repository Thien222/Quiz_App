# Nè Bạn Ơi — UI Asset Pack v1

Bộ asset được gom từ concept pastel/kawaii đầu tiên để dùng trực tiếp cho Expo / React Native.

## Cấu trúc
- `characters/`: nhân vật/hero artwork PNG nền trong suốt.
- `illustrations/`: icon/illustration lớn (tim, quà, vương miện, khóa, lịch, thư tình...).
- `buttons/`: artwork cho CTA và control.
- `webp/`: bản WebP tối ưu hơn để nhúng trong app.
- `reference_screens/`: mock screens concept đầu tiên — visual source of truth.
- `current_ui/`: 3 screenshot app hiện tại để đối chiếu.
- `assets_manifest.json`: tên, kích thước, đường dẫn, transparency.
- `theme_tokens.json`: palette/radius/shadow gợi ý.

## Cách dùng
Ưu tiên `webp/` cho artwork lớn. Button/card/header thật nên dựng bằng React Native + gradient + text thật; chỉ dùng artwork ở đây cho character/decor để UI responsive và không bị vỡ chữ.

### Gợi ý mapping
- Home hero: `characters/girl_hug_bunny` hoặc `characters/couple_heart`
- Result hero: `characters/girl_hug_heart`
- Premium: `illustrations/premium_crown_heart`, `premium_lock_wings`
- Free result cards: `cute_star`, `love_flag`, `glossy_heart`
- Daily: `love_calendar`, `love_letter_wings`
- Back/share: `buttons/icon_back`, `buttons/icon_share`

`reference_screens/` chỉ dùng làm reference, không nhúng nguyên screenshot vào app.
