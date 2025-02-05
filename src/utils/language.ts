export const detectLanguage = (text: string): 'hebrow' | 'english' => {
  const hebrewRegex = /[\u0590-\u05FF]/;
  const englishRegex = /[a-zA-Z]/;
  if (hebrewRegex.test(text)) {
    return 'hebrow';
  } else if (englishRegex.test(text)) {
    return 'english';
  } else {
    return 'english';
  }
};
