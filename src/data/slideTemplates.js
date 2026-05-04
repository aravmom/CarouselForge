export const slideTemplates = [
  {
    id: 'cover',
    name: 'Cover Slide',
    icon: '🎯',
    defaultContent: {
      title: 'Your Headline Here',
      subtitle: 'A compelling subtitle that hooks the reader',
      showAuthor: true,
      layout: 'cover',
    },
  },
  {
    id: 'bullets',
    name: 'Bullet Points',
    icon: '📋',
    defaultContent: {
      title: 'Key Points',
      bullets: [
        'First important point',
        'Second important point',
        'Third important point',
        'Fourth important point',
      ],
      showAuthor: true,
      layout: 'bullets',
    },
  },
  {
    id: 'big-statement',
    name: 'Big Statement',
    icon: '💬',
    defaultContent: {
      title: '',
      statement: 'A powerful quote or statement that makes people stop scrolling.',
      showAuthor: true,
      layout: 'big-statement',
    },
  },
  {
    id: 'numbered-list',
    name: 'Numbered Steps',
    icon: '🔢',
    defaultContent: {
      title: 'How To Get Started',
      steps: [
        'First step description',
        'Second step description',
        'Third step description',
      ],
      showAuthor: true,
      layout: 'numbered-list',
    },
  },
  {
    id: 'two-column',
    name: 'Two Columns',
    icon: '📊',
    defaultContent: {
      title: 'Compare & Contrast',
      leftTitle: 'Before',
      leftItems: ['Old way 1', 'Old way 2', 'Old way 3'],
      rightTitle: 'After',
      rightItems: ['New way 1', 'New way 2', 'New way 3'],
      showAuthor: true,
      layout: 'two-column',
    },
  },
  {
    id: 'cta',
    name: 'Call to Action',
    icon: '🚀',
    defaultContent: {
      title: 'Want to Learn More?',
      subtitle: 'DM me "KEYWORD" and I\'ll send you the free template.',
      ctaUrl: '',
      ctaPhone: '',
      showAuthor: true,
      layout: 'cta',
    },
  },
];
