/*
  # Seed Sample Accessibility Resources

  ## Description
  This migration adds sample accessibility resources to help users get started with the platform.

  ## Sample Data
  - Screen reader resources
  - Visual aid tools
  - Cognitive assistance tools
  - Speech technology resources
  - Learning materials

  ## Note
  This is initial seed data for demonstration purposes.
*/

INSERT INTO resources (title, description, content, resource_type, category, tags, url, difficulty_level, is_published) VALUES
(
  'Getting Started with NVDA',
  'Learn how to use NVDA, a free and open-source screen reader for Windows',
  'NVDA (NonVisual Desktop Access) is a free screen reader which enables blind and vision impaired people to use computers. This guide covers installation, basic navigation, and common keyboard shortcuts.',
  'guide',
  'Screen Readers',
  ARRAY['screen-reader', 'nvda', 'windows', 'beginner'],
  'https://www.nvaccess.org/get-help/',
  'beginner',
  true
),
(
  'Understanding WCAG 2.1 Guidelines',
  'Comprehensive overview of Web Content Accessibility Guidelines 2.1',
  'WCAG 2.1 provides a wide range of recommendations for making web content more accessible. Following these guidelines will make content more accessible to people with disabilities including blindness, low vision, deafness and hearing loss, limited movement, speech disabilities, photosensitivity, and combinations of these.',
  'documentation',
  'Learning Resources',
  ARRAY['wcag', 'standards', 'web-accessibility', 'intermediate'],
  'https://www.w3.org/WAI/WCAG21/quickref/',
  'intermediate',
  true
),
(
  'Color Contrast Checker',
  'Tool to ensure your color combinations meet accessibility standards',
  'This color contrast checker verifies that text and background color combinations meet WCAG accessibility standards. Essential for designers and developers building accessible interfaces.',
  'tool',
  'Visual Aids',
  ARRAY['color', 'contrast', 'design', 'beginner'],
  'https://webaim.org/resources/contrastchecker/',
  'beginner',
  true
),
(
  'Speech Recognition Basics',
  'Introduction to speech recognition technology and its applications',
  'Speech recognition technology allows users to control their devices using voice commands. This guide covers how to set up and use speech recognition on various platforms.',
  'guide',
  'Speech Technology',
  ARRAY['speech-recognition', 'voice-control', 'accessibility', 'beginner'],
  NULL,
  'beginner',
  true
),
(
  'Keyboard Navigation Best Practices',
  'Essential keyboard shortcuts and navigation techniques',
  'Many users rely on keyboard navigation to interact with computers and websites. Learn the essential keyboard shortcuts and how to navigate without a mouse.',
  'guide',
  'Motor Assistance',
  ARRAY['keyboard', 'navigation', 'shortcuts', 'beginner'],
  NULL,
  'beginner',
  true
),
(
  'Creating Accessible Documents',
  'Learn to create accessible PDFs and Word documents',
  'This comprehensive guide teaches you how to create documents that are accessible to everyone, including proper heading structure, alt text for images, and logical reading order.',
  'guide',
  'Learning Resources',
  ARRAY['documents', 'pdf', 'word', 'accessibility', 'intermediate'],
  NULL,
  'intermediate',
  true
),
(
  'Voice Over for macOS',
  'Master Apple''s built-in screen reader',
  'VoiceOver is Apple''s screen reader built into macOS. This guide covers essential gestures, navigation commands, and customization options.',
  'guide',
  'Screen Readers',
  ARRAY['voiceover', 'macos', 'apple', 'screen-reader', 'beginner'],
  'https://support.apple.com/guide/voiceover/welcome/mac',
  'beginner',
  true
),
(
  'Cognitive Load and Accessibility',
  'Understanding cognitive accessibility principles',
  'Cognitive accessibility ensures that content is easier to understand and use for people with cognitive disabilities. Learn about reducing cognitive load, using plain language, and providing clear instructions.',
  'article',
  'Cognitive Tools',
  ARRAY['cognitive', 'ux', 'design', 'advanced'],
  NULL,
  'advanced',
  true
),
(
  'Text-to-Speech Tools Comparison',
  'Compare popular text-to-speech solutions',
  'An in-depth comparison of various text-to-speech tools and services, including natural-sounding voices, language support, and pricing.',
  'comparison',
  'Speech Technology',
  ARRAY['tts', 'text-to-speech', 'comparison', 'intermediate'],
  NULL,
  'intermediate',
  true
),
(
  'Accessible Form Design',
  'Best practices for creating accessible web forms',
  'Forms are critical for web interaction. Learn how to design forms that work for everyone with proper labels, error messages, and keyboard support.',
  'guide',
  'Learning Resources',
  ARRAY['forms', 'web', 'ux', 'development', 'intermediate'],
  NULL,
  'intermediate',
  true
),
(
  'Screen Magnification Tools',
  'Tools and techniques for screen magnification',
  'For users with low vision, screen magnification can make content easier to read. This guide covers built-in and third-party magnification solutions.',
  'guide',
  'Visual Aids',
  ARRAY['magnification', 'low-vision', 'zoom', 'beginner'],
  NULL,
  'beginner',
  true
),
(
  'JAWS Screen Reader Guide',
  'Comprehensive guide to using JAWS',
  'JAWS (Job Access With Speech) is one of the most popular screen readers. Learn keyboard commands, customization, and advanced features.',
  'guide',
  'Screen Readers',
  ARRAY['jaws', 'screen-reader', 'windows', 'advanced'],
  'https://www.freedomscientific.com/training/',
  'advanced',
  true
)
ON CONFLICT DO NOTHING;