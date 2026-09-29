import type { GenderAsset, GenderTheme } from '@/types/quiz';

/**
 * Lựa chọn asset ảnh theo ưu tiên:
 * 1. Giới tính yêu cầu (requested gender)
 * 2. Trung tính / Cặp đôi (neutral)
 * 3. Giới tính đối lập (opposite gender)
 * 4. Bất kỳ asset nào có sẵn làm fallback
 */
export function pickGenderAsset(asset: GenderAsset | undefined, genderTheme: GenderTheme): any {
  if (!asset) return null;

  // 1. Requested gender
  if (genderTheme === 'male' && asset.male) return asset.male;
  if (genderTheme === 'female' && asset.female) return asset.female;
  if (genderTheme === 'neutral' && asset.neutral) return asset.neutral;

  // 2. Neutral fallback
  if (asset.neutral) return asset.neutral;

  // 3. Opposite gender
  if (genderTheme === 'male') {
    if (asset.female) return asset.female;
  } else if (genderTheme === 'female') {
    if (asset.male) return asset.male;
  } else {
    // neutral prefers female then male
    if (asset.female) return asset.female;
    if (asset.male) return asset.male;
  }

  // 4. Any available asset fallback
  return asset.male || asset.female || asset.neutral || null;
}
