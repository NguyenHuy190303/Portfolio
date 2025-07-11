export interface Certificate {
  id: string;
  filename: string;
  title: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  category: string;
  issuer: {
    en: string;
    vi: string;
  };
  date: string;
  skills: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  credentialUrl?: string;
}

export const certificates: Certificate[] = [
  {
    id: 'nasa',
    filename: 'Nasa.png',
    title: {
      en: 'NASA Certificate',
      vi: 'Chứng chỉ NASA'
    },
    description: {
      en: 'Certificate from NASA for outstanding achievement in space technology and research',
      vi: 'Chứng chỉ từ NASA cho thành tích xuất sắc trong công nghệ và nghiên cứu vũ trụ'
    },
    category: 'Space Technology',
    issuer: {
      en: 'NASA - National Aeronautics and Space Administration',
      vi: 'NASA - Cơ quan Hàng không Vũ trụ Quốc gia Mỹ'
    },
    date: '2024',
    skills: ['Space Technology', 'Research', 'Innovation'],
    level: 'Advanced'
  },
  {
    id: 'machine-learning',
    filename: 'Machine Learning.png',
    title: {
      en: 'Machine Learning Specialization',
      vi: 'Chuyên ngành Học Máy'
    },
    description: {
      en: 'Comprehensive certification in machine learning algorithms, supervised and unsupervised learning',
      vi: 'Chứng chỉ toàn diện về thuật toán học máy, học có giám sát và không giám sát'
    },
    category: 'Machine Learning',
    issuer: {
      en: 'Stanford University / Coursera',
      vi: 'Đại học Stanford / Coursera'
    },
    date: '2023',
    skills: ['Python', 'Scikit-learn', 'Algorithms', 'Data Analysis'],
    level: 'Intermediate'
  },
  {
    id: 'deep-learning',
    filename: 'Deep Learning.png',
    title: {
      en: 'Deep Learning Specialization',
      vi: 'Chuyên ngành Học Sâu'
    },
    description: {
      en: 'Advanced deep learning concepts including neural networks, CNNs, RNNs, and transformers',
      vi: 'Các khái niệm học sâu nâng cao bao gồm mạng nơ-ron, CNN, RNN và transformer'
    },
    category: 'Deep Learning',
    issuer: {
      en: 'deeplearning.ai / Coursera',
      vi: 'deeplearning.ai / Coursera'
    },
    date: '2023',
    skills: ['TensorFlow', 'PyTorch', 'Neural Networks', 'Computer Vision'],
    level: 'Advanced'
  },
  {
    id: 'basic-deep-learning',
    filename: 'Basic Deep Learning.png',
    title: {
      en: 'Introduction to Deep Learning',
      vi: 'Giới thiệu về Học Sâu'
    },
    description: {
      en: 'Foundational course covering basic deep learning concepts and neural network fundamentals',
      vi: 'Khóa học nền tảng về các khái niệm cơ bản của học sâu và mạng nơ-ron'
    },
    category: 'Deep Learning',
    issuer: {
      en: 'Coursera',
      vi: 'Coursera'
    },
    date: '2022',
    skills: ['Python', 'Neural Networks', 'Backpropagation'],
    level: 'Beginner'
  },
  {
    id: 'deep-neural-network',
    filename: 'Deep Neural Network.png',
    title: {
      en: 'Deep Neural Networks',
      vi: 'Mạng Nơ-ron Sâu'
    },
    description: {
      en: 'Advanced course on deep neural network architectures and optimization techniques',
      vi: 'Khóa học nâng cao về kiến trúc mạng nơ-ron sâu và kỹ thuật tối ưu hóa'
    },
    category: 'Neural Networks',
    issuer: {
      en: 'deeplearning.ai',
      vi: 'deeplearning.ai'
    },
    date: '2023',
    skills: ['Deep Learning', 'Optimization', 'Regularization'],
    level: 'Advanced'
  },
  {
    id: 'cv-nlp',
    filename: 'CV and NLP.png',
    title: {
      en: 'Computer Vision and NLP',
      vi: 'Thị giác Máy tính và Xử lý Ngôn ngữ Tự nhiên'
    },
    description: {
      en: 'Comprehensive certification in computer vision and natural language processing applications',
      vi: 'Chứng chỉ toàn diện về ứng dụng thị giác máy tính và xử lý ngôn ngữ tự nhiên'
    },
    category: 'AI Applications',
    issuer: {
      en: 'Coursera Specialization',
      vi: 'Chuyên ngành Coursera'
    },
    date: '2023',
    skills: ['OpenCV', 'NLTK', 'Transformers', 'Image Processing'],
    level: 'Advanced'
  },
  {
    id: 'basic-cv-nlp',
    filename: 'Basic CV and NLP.png',
    title: {
      en: 'Introduction to CV and NLP',
      vi: 'Giới thiệu về CV và NLP'
    },
    description: {
      en: 'Foundational course in computer vision and natural language processing basics',
      vi: 'Khóa học nền tảng về cơ bản thị giác máy tính và xử lý ngôn ngữ tự nhiên'
    },
    category: 'AI Applications',
    issuer: {
      en: 'Online Course Platform',
      vi: 'Nền tảng Khóa học Trực tuyến'
    },
    date: '2022',
    skills: ['Python', 'OpenCV', 'Basic NLP'],
    level: 'Beginner'
  },
  {
    id: 'genai-llms',
    filename: 'GenAI and LLMS.png',
    title: {
      en: 'Generative AI and Large Language Models',
      vi: 'AI Tạo sinh và Mô hình Ngôn ngữ Lớn'
    },
    description: {
      en: 'Cutting-edge certification in generative AI, GPT models, and large language model applications',
      vi: 'Chứng chỉ tiên tiến về AI tạo sinh, mô hình GPT và ứng dụng mô hình ngôn ngữ lớn'
    },
    category: 'Generative AI',
    issuer: {
      en: 'AI Research Institute',
      vi: 'Viện Nghiên cứu AI'
    },
    date: '2024',
    skills: ['GPT', 'LLMs', 'Prompt Engineering', 'Fine-tuning'],
    level: 'Advanced'
  },
  {
    id: 'math-programming-data',
    filename: 'Math, Programming, and Data Science.png',
    title: {
      en: 'Mathematics, Programming & Data Science',
      vi: 'Toán học, Lập trình & Khoa học Dữ liệu'
    },
    description: {
      en: 'Comprehensive foundation in mathematical concepts, programming skills, and data science methodologies',
      vi: 'Nền tảng toàn diện về các khái niệm toán học, kỹ năng lập trình và phương pháp khoa học dữ liệu'
    },
    category: 'Data Science',
    issuer: {
      en: 'University Program',
      vi: 'Chương trình Đại học'
    },
    date: '2022',
    skills: ['Mathematics', 'Python', 'Statistics', 'Data Analysis'],
    level: 'Intermediate'
  }
];

export const certificateCategories = [
  { id: 'all', label: { en: 'All Certificates', vi: 'Tất cả Chứng chỉ' } },
  { id: 'Machine Learning', label: { en: 'Machine Learning', vi: 'Học Máy' } },
  { id: 'Deep Learning', label: { en: 'Deep Learning', vi: 'Học Sâu' } },
  { id: 'Neural Networks', label: { en: 'Neural Networks', vi: 'Mạng Nơ-ron' } },
  { id: 'AI Applications', label: { en: 'AI Applications', vi: 'Ứng dụng AI' } },
  { id: 'Generative AI', label: { en: 'Generative AI', vi: 'AI Tạo sinh' } },
  { id: 'Data Science', label: { en: 'Data Science', vi: 'Khoa học Dữ liệu' } },
  { id: 'Space Technology', label: { en: 'Space Technology', vi: 'Công nghệ Vũ trụ' } }
];
