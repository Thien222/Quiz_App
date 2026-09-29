import type { QuizArchetype } from '@/types/quiz';
import { characterGenderAssets } from '@/constants/assets';

export const archetypes: QuizArchetype[] = [
  {
    id: 'archetype-em-be-khi-yeu',
    title: 'Em Bé Khi Yêu',
    subtitle: 'Ấm áp · Tinh tế · Đáng yêu 100%',
    vibeTag: 'Hệ Nước Nhu Mì • Đáng Yêu Bẩm Sinh',
    quote: 'Yêu là muốn được ôm ấp mãi mãi ♡',
    summary:
      'Bề ngoài có thể bình thường và độc lập, nhưng khi yêu bạn rất thích được ôm ấp, chiều chuộng và nhõng nhẽo với đúng một người duy nhất.',
    heroImage: characterGenderAssets,
    dominantDimensions: ['affection', 'sensitivity', 'reassurance'],
    freeInsights: [
      {
        id: 'free-01',
        title: 'Kiểu yêu của bạn',
        subtitle: 'Bạn yêu như thế nào?',
        description:
          'Bạn yêu bằng sự chân thành tuyệt đối. Khi đã đặt niềm tin vào ai đó, bạn sẵn sàng tháo bỏ chiếc khiên mạnh mẽ để trở về làm đứa trẻ đáng yêu nhất.',
        icon: '💗',
      },
      {
        id: 'free-02',
        title: 'Điểm đáng yêu',
        subtitle: 'Những nét cuốn hút đặc biệt',
        description:
          'Sự vụng về đáng yêu và những cử chỉ nhõng nhẽo bất chợt khiến đối phương luôn có cảm giác muốn che chở và bảo bọc bạn cả đời.',
        icon: '⭐',
      },
      {
        id: 'free-03',
        title: '1 red flag nhẹ',
        subtitle: 'Điều bạn cần lưu ý',
        description:
          'Đôi khi bạn hơi dễ suy nghĩ nhiều và tủi thân thầm lặng thay vì thẳng thắn chia sẻ ngay. Hãy nói ra để người ấy kịp dỗ dành nhé!',
        icon: '🚩',
      },
    ],
    lockedInsights: [
      {
        id: 'locked-01',
        title: 'Người yêu hợp với bạn',
        teaser: 'Mẫu người mang lại cho bạn cảm giác an toàn tuyệt đối',
        icon: '💑',
        previewVibe: 'Chững chạc, kiên nhẫn và thích chiều chuộng',
      },
      {
        id: 'locked-02',
        title: 'Tính cách của ny',
        teaser: 'Người có thể đọc vị được ánh mắt khi bạn dỗi',
        icon: '🔍',
        previewVibe: 'Biết lắng nghe, tâm lý và không chấp nhặt',
      },
      {
        id: 'locked-03',
        title: 'Ảnh người thương tương lai',
        teaser: 'Visual profile phác họa đúng gu thẩm mỹ của bạn',
        icon: '🖼️',
        previewVibe: 'Ánh mắt ấm áp, nụ cười tỏa nắng',
      },
      {
        id: 'locked-04',
        title: 'Cách hai người gặp nhau',
        teaser: 'Kịch bản cuộc gặp gỡ định mệnh sắp tới',
        icon: '💌',
        previewVibe: 'Tại một quán cà phê quen hoặc buổi gặp gỡ ngẫu nhiên',
      },
    ],
  },
  {
    id: 'archetype-chien-than-doc-lap',
    title: 'Chiến Thần Độc Lập',
    subtitle: 'Tự tin · Bản lĩnh · Rõ ràng 100%',
    vibeTag: 'Hệ Lửa Tự Chủ • Yêu Văn Minh',
    quote: 'Rõ ràng cũng là một kiểu dịu dàng ✨',
    summary:
      'Bạn yêu một cách rất văn minh, tôn trọng không gian riêng và luôn thẳng thắn. Với bạn, tình yêu là sự đồng hành của hai cá thể hoàn chỉnh.',
    heroImage: characterGenderAssets,
    dominantDimensions: ['independence', 'communication', 'boundaries'],
    freeInsights: [
      {
        id: 'free-01',
        title: 'Kiểu yêu của bạn',
        subtitle: 'Độc lập và vững vàng',
        description:
          'Bạn không phụ thuộc cảm xúc vào đối phương. Bạn mang lại nguồn năng lượng tự tin, đáng tin cậy và sự tôn trọng tuyệt đối cho nửa kia.',
        icon: '👑',
      },
      {
        id: 'free-02',
        title: 'Điểm đáng yêu',
        subtitle: 'Sự sòng phẳng đáng quý',
        description:
          'Bạn sẵn sàng cùng người yêu chia sẻ gánh nặng tài chính lẫn cuộc sống, không bao giờ để đối phương phải một mình gồng gánh.',
        icon: '🌟',
      },
      {
        id: 'free-03',
        title: '1 red flag nhẹ',
        subtitle: 'Đôi lúc hơi lý trí',
        description:
          'Đôi khi bạn quá độc lập khiến người yêu cảm thấy mình không được cần đến. Hãy để đối phương có cơ hội chăm sóc bạn nhiều hơn nhé!',
        icon: '🚩',
      },
    ],
    lockedInsights: [
      {
        id: 'locked-01',
        title: 'Người yêu hợp với bạn',
        teaser: 'Người vừa thấu hiểu vừa tôn trọng ranh giới',
        icon: '💑',
        previewVibe: 'Trưởng thành, có sự nghiệp và biết lắng nghe',
      },
      {
        id: 'locked-02',
        title: 'Tính cách của ny',
        teaser: 'Không kiểm soát và luôn ủng hộ đam mê của bạn',
        icon: '🔍',
        previewVibe: 'Bao dung, tinh tế và vững vàng',
      },
      {
        id: 'locked-03',
        title: 'Ảnh người thương tương lai',
        teaser: 'Visual profile phác họa nửa kia đồng điệu',
        icon: '🖼️',
        previewVibe: 'Nét mặt thông minh, phong thái đĩnh đạc',
      },
      {
        id: 'locked-04',
        title: 'Cách hai người gặp nhau',
        teaser: 'Cơ duyên tương phùng',
        icon: '💌',
        previewVibe: 'Trong môi trường công việc hoặc sự kiện học thuật',
      },
    ],
  },
  {
    id: 'archetype-mat-troi-nho',
    title: 'Mặt Trời Tinh Nghịch',
    subtitle: 'Vui vẻ · Nhí nhảnh · Năng lượng 100%',
    vibeTag: 'Hệ Khí Tươi Mới • Lan Tỏa Tiếng Cười',
    quote: 'Ở đâu có bạn, ở đó có tiếng cười ☀️',
    summary:
      'Bạn là liều thuốc giảm stress tuyệt vời nhất của người yêu. Tình yêu với bạn là cuộc phiêu lưu ngập tràn tiếng cười và những trò đùa tinh nghịch.',
    heroImage: characterGenderAssets,
    dominantDimensions: ['playfulness', 'affection', 'initiative'],
    freeInsights: [
      {
        id: 'free-01',
        title: 'Kiểu yêu của bạn',
        subtitle: 'Vui tươi và ngẫu hứng',
        description:
          'Bạn luôn biết cách biến những ngày bình thường thành ngày hội với những ý tưởng bất ngờ, chuyến đi ngẫu hứng và năng lượng tích cực.',
        icon: '☀️',
      },
      {
        id: 'free-02',
        title: 'Điểm đáng yêu',
        subtitle: 'Sự hài hước vô giá',
        description:
          'Nụ cười rạng rỡ và những câu bông đùa duyên dáng của bạn có thể xua tan mọi mệt mỏi trong tích tắc.',
        icon: '🎈',
      },
      {
        id: 'free-03',
        title: '1 red flag nhẹ',
        subtitle: 'Dễ né tránh chuyện nghiêm túc',
        description:
          'Đôi khi bạn dùng sự hài hước để né tránh những cuộc tranh luận cần sự nghiêm túc. Hãy dành thời gian lắng nghe sâu sắc hơn nhé!',
        icon: '🚩',
      },
    ],
    lockedInsights: [
      {
        id: 'locked-01',
        title: 'Người yêu hợp với bạn',
        teaser: 'Người vừa là bạn thân vừa là chỗ dựa vững chãi',
        icon: '💑',
        previewVibe: 'Biết hưởng ứng trò đùa và luôn bao bọc bạn',
      },
      {
        id: 'locked-02',
        title: 'Tính cách của ny',
        teaser: 'Kiên nhẫn và sẵn sàng cùng bạn "quậy" khắp nơi',
        icon: '🔍',
        previewVibe: 'Ấm áp, hài hước và phóng khoáng',
      },
      {
        id: 'locked-03',
        title: 'Ảnh người thương tương lai',
        teaser: 'Visual profile đối phương rạng ngời',
        icon: '🖼️',
        previewVibe: 'Nụ cười tỏa nắng, ánh mắt tràn ngập niềm vui',
      },
      {
        id: 'locked-04',
        title: 'Cách hai người gặp nhau',
        teaser: 'Cuộc gặp gỡ bất ngờ',
        icon: '💌',
        previewVibe: 'Trong một buổi tiệc vui hoặc chuyến du lịch nhóm',
      },
    ],
  },
  {
    id: 'archetype-he-cham-soc',
    title: 'Hệ Chăm Sóc Chu Đáo',
    subtitle: 'Ấn cần · Tận tụy · Hành động hơn lời nói',
    vibeTag: 'Hệ Đất Vững Chãi • Điểm Tựa Bình Yên',
    quote: 'Thương là chăm lo từng miếng ăn giấc ngủ 🍲',
    summary:
      'Ngôn ngữ tình yêu lớn nhất của bạn là sự chăm sóc. Bạn nhớ từng thói quen nhỏ, dị ứng thức ăn và luôn có mặt khi người ấy cần.',
    heroImage: characterGenderAssets,
    dominantDimensions: ['caretaking', 'compromise', 'affection'],
    freeInsights: [
      {
        id: 'free-01',
        title: 'Kiểu yêu của bạn',
        subtitle: 'Hành động thay lời nói',
        description:
          'Tình yêu của bạn không màu mè trên mạng xã hội mà nằm ở bình nước ấm lúc ốm, chiếc áo mưa lúc giông bão và sự hiện diện vững vàng.',
        icon: '🍲',
      },
      {
        id: 'free-02',
        title: 'Điểm đáng yêu',
        subtitle: 'Sự chu đáo đến từng chi tiết',
        description:
          'Cách bạn nhớ sở thích nhỏ và luôn chuẩn bị sẵn sàng mọi thứ khiến người yêu cảm thấy mình là người may mắn nhất thế gian.',
        icon: '✨',
      },
      {
        id: 'free-03',
        title: '1 red flag nhẹ',
        subtitle: 'Dễ quên chăm sóc bản thân',
        description:
          'Bạn cho đi quá nhiều và thường gánh hết việc vào mình. Hãy nhớ người ấy cũng rất muốn có cơ hội được chăm sóc lại bạn nhé!',
        icon: '🚩',
      },
    ],
    lockedInsights: [
      {
        id: 'locked-01',
        title: 'Người yêu hợp với bạn',
        teaser: 'Người biết trân trọng và biết ơn sự tận tụy của bạn',
        icon: '💑',
        previewVibe: 'Ngọt ngào, biết lắng nghe và biết chiều chuộng',
      },
      {
        id: 'locked-02',
        title: 'Tính cách của ny',
        teaser: 'Người có thể mang lại tiếng cười và sự thư giãn cho bạn',
        icon: '🔍',
        previewVibe: 'Tinh tế, sâu sắc và biết quan tâm ngược lại',
      },
      {
        id: 'locked-03',
        title: 'Ảnh người thương tương lai',
        teaser: 'Visual profile đối phương ấm áp',
        icon: '🖼️',
        previewVibe: 'Gương mặt hiền hòa, ánh nhìn trìu mến',
      },
      {
        id: 'locked-04',
        title: 'Cách hai người gặp nhau',
        teaser: 'Tình huống quen thuộc',
        icon: '💌',
        previewVibe: 'Qua sự giới thiệu của người thân hoặc hội bạn chung',
      },
    ],
  },
];
