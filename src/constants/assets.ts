export const uiAssets = {
  generated: {
    onboardingCouple: require('../../assets/ne-ban-oi-ui-assets-v1/generated/onboarding_couple_hero_v2.png'),
    quizLoveCards: require('../../assets/ne-ban-oi-ui-assets-v1/generated/quiz_love_cards_v2.png'),
    futurePartnerPolaroids: require('../../assets/ne-ban-oi-ui-assets-v1/generated/future_partner_polaroids_v2.png'),
  },
  characters: {
    boyPinkHoodie: require('../../assets/ne-ban-oi-ui-assets-v1/characters/boy_pink_hoodie.png'),
    girlHugBunny: require('../../assets/ne-ban-oi-ui-assets-v1/webp/characters/girl_hug_bunny.webp'),
    girlHugHeart: require('../../assets/ne-ban-oi-ui-assets-v1/webp/characters/girl_hug_heart.webp'),
    coupleHeart: require('../../assets/ne-ban-oi-ui-assets-v1/webp/characters/couple_heart.webp'),
  },
  illustrations: {
    cuteStar: require('../../assets/ne-ban-oi-ui-assets-v1/webp/illustrations/cute_star.webp'),
    glossyHeart: require('../../assets/ne-ban-oi-ui-assets-v1/webp/illustrations/glossy_heart.webp'),
    loveCalendar: require('../../assets/ne-ban-oi-ui-assets-v1/webp/illustrations/love_calendar.webp'),
    loveFlag: require('../../assets/ne-ban-oi-ui-assets-v1/webp/illustrations/love_flag.webp'),
    loveLetter: require('../../assets/ne-ban-oi-ui-assets-v1/webp/illustrations/love_letter_wings.webp'),
    crown: require('../../assets/ne-ban-oi-ui-assets-v1/webp/illustrations/premium_crown_heart.webp'),
    crownAlt: require('../../assets/ne-ban-oi-ui-assets-v1/webp/illustrations/premium_crown_alt.webp'),
    premiumLock: require('../../assets/ne-ban-oi-ui-assets-v1/webp/illustrations/premium_lock_wings.webp'),
    giftBox: require('../../assets/ne-ban-oi-ui-assets-v1/webp/illustrations/gift_box_hearts.webp'),
    heartBalloons: require('../../assets/ne-ban-oi-ui-assets-v1/webp/illustrations/heart_balloons.webp'),
  },
  controls: {
    back: require('../../assets/ne-ban-oi-ui-assets-v1/webp/buttons/icon_back.webp'),
    share: require('../../assets/ne-ban-oi-ui-assets-v1/webp/buttons/icon_share.webp'),
    ctaKawaii: require('../../assets/ne-ban-oi-ui-assets-v1/webp/buttons/cta_kawaii.webp'),
    ctaPastel: require('../../assets/ne-ban-oi-ui-assets-v1/webp/buttons/cta_pastel.webp'),
    ctaPinkArrow: require('../../assets/ne-ban-oi-ui-assets-v1/webp/buttons/cta_pink_arrow.webp'),
    ctaPinkPurple: require('../../assets/ne-ban-oi-ui-assets-v1/webp/buttons/cta_pink_purple.webp'),
  },
} as const;

export const characterGenderAssets = {
  male: uiAssets.characters.boyPinkHoodie,
  female: uiAssets.characters.girlHugHeart,
  neutral: uiAssets.characters.coupleHeart,
};
