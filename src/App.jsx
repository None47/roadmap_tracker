import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Target, Calendar, Award, BookOpen, Code, Brain, Zap } from 'lucide-react';
import { supabase } from './supabaseClient';

// Complete roadmap data structure based on the uploaded images
const COMPLETE_ROADMAP = {
  python: {
    title: "Python Fundamentals",
    icon: "Code",
    color: "blue",
    weight: 5,
    topics: [
      { id: "py_syntax", name: "Syntax & Variables", hours: 3, points: 0.3 },
      { id: "py_datatypes", name: "Data Types (int, float, str, bool)", hours: 2, points: 0.2 },
      { id: "py_operators", name: "Operators & Expressions", hours: 2, points: 0.2 },
      { id: "py_conditionals", name: "Conditionals (if/else)", hours: 2, points: 0.2 },
      { id: "py_loops", name: "Loops (for, while)", hours: 3, points: 0.3 },
      { id: "py_functions", name: "Functions & Lambda", hours: 4, points: 0.4 },
      { id: "py_lists", name: "Lists & List Comprehensions", hours: 3, points: 0.3 },
      { id: "py_tuples", name: "Tuples", hours: 2, points: 0.2 },
      { id: "py_sets", name: "Sets & Frozensets", hours: 2, points: 0.2 },
      { id: "py_dicts", name: "Dictionaries", hours: 3, points: 0.3 },
      { id: "py_strings", name: "String Methods", hours: 2, points: 0.2 },
      { id: "py_oop_classes", name: "Classes & Objects", hours: 5, points: 0.5 },
      { id: "py_oop_inheritance", name: "Inheritance", hours: 4, points: 0.4 },
      { id: "py_oop_polymorphism", name: "Polymorphism", hours: 3, points: 0.3 },
      { id: "py_exceptions", name: "Exception Handling", hours: 3, points: 0.3 },
      { id: "py_modules", name: "Modules & Packages", hours: 3, points: 0.3 },
      { id: "py_file_io", name: "File I/O", hours: 3, points: 0.3 },
      { id: "py_decorators", name: "Decorators", hours: 4, points: 0.4 },
      { id: "py_generators", name: "Generators & Iterators", hours: 4, points: 0.4 },
      { id: "py_context_managers", name: "Context Managers", hours: 3, points: 0.3 }
    ]
  },

  mathematics: {
    title: "Mathematics",
    icon: "BookOpen",
    color: "purple",
    weight: 4,
    topics: [
      { id: "math_linear_algebra", name: "Linear Algebra (Vectors, Matrices)", hours: 15, points: 1.0 },
      { id: "math_calculus", name: "Calculus (Derivatives, Integrals)", hours: 15, points: 1.0 },
      { id: "math_optimization", name: "Optimization Basics", hours: 10, points: 0.7 },
      { id: "math_eigenvalues", name: "Eigenvalues & Eigenvectors", hours: 8, points: 0.6 },
      { id: "math_gradients", name: "Gradients & Jacobians", hours: 8, points: 0.5 },
      { id: "math_probability", name: "Probability Theory", hours: 10, points: 0.6 }
    ]
  },

  statistics: {
    title: "Statistics & Probability",
    icon: "TrendingUp",
    color: "green",
    weight: 4,
    topics: [
      { id: "stats_descriptive", name: "Descriptive Statistics", hours: 6, points: 0.5 },
      { id: "stats_distributions", name: "Probability Distributions", hours: 8, points: 0.7 },
      { id: "stats_hypothesis", name: "Hypothesis Testing", hours: 8, points: 0.7 },
      { id: "stats_regression", name: "Regression Analysis", hours: 10, points: 0.8 },
      { id: "stats_bayesian", name: "Bayesian Statistics", hours: 12, points: 0.8 },
      { id: "stats_sampling", name: "Sampling Techniques", hours: 5, points: 0.5 }
    ]
  },

  data_science: {
    title: "Data Science Stack",
    icon: "Brain",
    color: "cyan",
    weight: 6,
    topics: [
      { id: "ds_numpy", name: "NumPy (Arrays, Broadcasting, Operations)", hours: 12, points: 0.8 },
      { id: "ds_pandas_basics", name: "Pandas (DataFrames, Series)", hours: 12, points: 0.8 },
      { id: "ds_pandas_adv", name: "Pandas (Groupby, Merge, Pivot)", hours: 10, points: 0.7 },
      { id: "ds_matplotlib", name: "Matplotlib Visualization", hours: 8, points: 0.5 },
      { id: "ds_seaborn", name: "Seaborn Advanced Plots", hours: 6, points: 0.4 },
      { id: "ds_plotly", name: "Plotly Interactive Viz", hours: 6, points: 0.4 },
      { id: "ds_scipy", name: "SciPy Scientific Computing", hours: 8, points: 0.5 },
      { id: "ds_cleaning", name: "Data Cleaning & Preprocessing", hours: 12, points: 0.9 },
      { id: "ds_eda", name: "Exploratory Data Analysis", hours: 10, points: 0.8 },
      { id: "ds_feature_eng", name: "Feature Engineering", hours: 15, points: 1.0 }
    ]
  },

  ml_fundamentals: {
    title: "ML Fundamentals",
    icon: "Brain",
    color: "pink",
    weight: 10,
    topics: [
      { id: "ml_theory_supervised", name: "Supervised Learning Theory", hours: 10, points: 0.8 },
      { id: "ml_theory_unsupervised", name: "Unsupervised Learning Theory", hours: 8, points: 0.6 },
      { id: "ml_linear_reg", name: "Linear Regression", hours: 8, points: 0.6 },
      { id: "ml_logistic_reg", name: "Logistic Regression", hours: 8, points: 0.6 },
      { id: "ml_decision_trees", name: "Decision Trees", hours: 10, points: 0.7 },
      { id: "ml_random_forest", name: "Random Forests", hours: 10, points: 0.7 },
      { id: "ml_svm", name: "Support Vector Machines", hours: 12, points: 0.8 },
      { id: "ml_knn", name: "K-Nearest Neighbors", hours: 6, points: 0.5 },
      { id: "ml_naive_bayes", name: "Naive Bayes", hours: 6, points: 0.5 },
      { id: "ml_kmeans", name: "K-Means Clustering", hours: 8, points: 0.6 },
      { id: "ml_pca", name: "PCA (Dimensionality Reduction)", hours: 10, points: 0.7 },
      { id: "ml_gradient_descent", name: "Gradient Descent Optimization", hours: 10, points: 0.8 },
      { id: "ml_regularization", name: "Regularization (L1, L2)", hours: 8, points: 0.6 },
      { id: "ml_cross_validation", name: "Cross-Validation", hours: 6, points: 0.5 },
      { id: "ml_hyperparameter", name: "Hyperparameter Tuning", hours: 10, points: 0.7 },
      { id: "ml_ensemble", name: "Ensemble Methods", hours: 12, points: 0.8 },
      { id: "ml_sklearn", name: "Scikit-learn Mastery", hours: 15, points: 1.0 }
    ]
  },

  deep_learning: {
    title: "Deep Learning",
    icon: "Zap",
    color: "orange",
    weight: 12,
    topics: [
      { id: "dl_nn_basics", name: "Neural Networks Basics", hours: 12, points: 1.0 },
      { id: "dl_activation", name: "Activation Functions", hours: 6, points: 0.5 },
      { id: "dl_backprop", name: "Backpropagation", hours: 10, points: 0.8 },
      { id: "dl_optimizers", name: "Optimizers (SGD, Adam, RMSprop)", hours: 8, points: 0.6 },
      { id: "dl_loss_functions", name: "Loss Functions", hours: 6, points: 0.5 },
      { id: "dl_cnn", name: "Convolutional Neural Networks", hours: 15, points: 1.2 },
      { id: "dl_rnn", name: "Recurrent Neural Networks", hours: 12, points: 1.0 },
      { id: "dl_lstm", name: "LSTM & GRU", hours: 12, points: 1.0 },
      { id: "dl_dropout", name: "Dropout & Regularization", hours: 6, points: 0.5 },
      { id: "dl_batch_norm", name: "Batch Normalization", hours: 6, points: 0.5 },
      { id: "dl_transfer_learning", name: "Transfer Learning", hours: 10, points: 0.8 },
      { id: "dl_pytorch", name: "PyTorch Framework", hours: 20, points: 1.5 },
      { id: "dl_tensorflow", name: "TensorFlow/Keras", hours: 15, points: 1.2 },
      { id: "dl_gpu", name: "GPU Training & Optimization", hours: 10, points: 0.8 }
    ]
  },

  nlp: {
    title: "Natural Language Processing",
    icon: "BookOpen",
    color: "indigo",
    weight: 8,
    topics: [
      { id: "nlp_text_processing", name: "Text Preprocessing", hours: 8, points: 0.6 },
      { id: "nlp_tokenization", name: "Tokenization", hours: 6, points: 0.5 },
      { id: "nlp_embeddings", name: "Word Embeddings (Word2Vec, GloVe)", hours: 12, points: 1.0 },
      { id: "nlp_sentiment", name: "Sentiment Analysis", hours: 10, points: 0.8 },
      { id: "nlp_ner", name: "Named Entity Recognition", hours: 10, points: 0.8 },
      { id: "nlp_pos", name: "POS Tagging", hours: 6, points: 0.5 },
      { id: "nlp_seq2seq", name: "Seq2Seq Models", hours: 12, points: 1.0 },
      { id: "nlp_attention", name: "Attention Mechanisms", hours: 12, points: 1.0 },
      { id: "nlp_transformers", name: "Transformers Architecture", hours: 15, points: 1.2 },
      { id: "nlp_bert", name: "BERT & Variants", hours: 12, points: 1.0 },
      { id: "nlp_gpt", name: "GPT Models", hours: 12, points: 1.0 }
    ]
  },

  llms: {
    title: "Large Language Models",
    icon: "Brain",
    color: "violet",
    weight: 15,
    topics: [
      { id: "llm_architecture", name: "LLM Architecture (Transformers)", hours: 15, points: 1.2 },
      { id: "llm_pretrain", name: "Pre-training vs Fine-tuning", hours: 10, points: 0.8 },
      { id: "llm_tokenization", name: "Tokenization (BPE, WordPiece)", hours: 8, points: 0.6 },
      { id: "llm_embeddings", name: "Embeddings & Vector Representations", hours: 10, points: 0.8 },
      { id: "llm_huggingface", name: "Hugging Face Transformers", hours: 15, points: 1.2 },
      { id: "llm_prompt_eng", name: "Prompt Engineering", hours: 12, points: 1.0 },
      { id: "llm_few_shot", name: "Few-shot & Zero-shot Learning", hours: 10, points: 0.8 },
      { id: "llm_fine_tuning", name: "Fine-tuning LLMs", hours: 20, points: 1.5 },
      { id: "llm_rlhf", name: "RLHF (Reinforcement Learning from Human Feedback)", hours: 15, points: 1.2 },
      { id: "llm_evaluation", name: "LLM Evaluation Metrics", hours: 8, points: 0.6 },
      { id: "llm_inference", name: "Inference Optimization", hours: 12, points: 1.0 },
      { id: "llm_deployment", name: "LLM Deployment Strategies", hours: 12, points: 1.0 }
    ]
  },

  agentic_ai: {
    title: "Agentic AI (SPECIALIZATION)",
    icon: "Zap",
    color: "emerald",
    weight: 20,
    topics: [
      { id: "agent_foundations", name: "AI Agent Foundations & Theory", hours: 15, points: 1.5 },
      { id: "agent_planning", name: "Planning & Reasoning", hours: 18, points: 1.8 },
      { id: "agent_memory", name: "Memory Systems (Short-term, Long-term)", hours: 15, points: 1.5 },
      { id: "agent_tools", name: "Tool Use & Function Calling", hours: 15, points: 1.5 },
      { id: "agent_react", name: "ReAct (Reasoning + Acting)", hours: 12, points: 1.2 },
      { id: "agent_chain_of_thought", name: "Chain-of-Thought Prompting", hours: 10, points: 1.0 },
      { id: "agent_mcp", name: "Model Context Protocol (MCP)", hours: 15, points: 1.5 },
      { id: "agent_langchain", name: "LangChain Framework", hours: 20, points: 2.0 },
      { id: "agent_langgraph", name: "LangGraph for Workflows", hours: 15, points: 1.5 },
      { id: "agent_autogen", name: "AutoGen Multi-Agent", hours: 15, points: 1.5 },
      { id: "agent_crewai", name: "CrewAI Framework", hours: 12, points: 1.2 },
      { id: "agent_orchestration", name: "Agent Orchestration Patterns", hours: 18, points: 1.8 },
      { id: "agent_multiagent", name: "Multi-Agent Systems", hours: 20, points: 2.0 },
      { id: "agent_collaboration", name: "Agent Collaboration & Communication", hours: 15, points: 1.5 }
    ]
  },

  rag: {
    title: "RAG Systems",
    icon: "Target",
    color: "rose",
    weight: 12,
    topics: [
      { id: "rag_theory", name: "RAG Architecture & Theory", hours: 12, points: 1.0 },
      { id: "rag_embeddings", name: "Embeddings for RAG", hours: 10, points: 0.8 },
      { id: "rag_chunking", name: "Document Chunking Strategies", hours: 10, points: 0.8 },
      { id: "rag_retrieval", name: "Retrieval Algorithms", hours: 12, points: 1.0 },
      { id: "rag_reranking", name: "Re-ranking Techniques", hours: 10, points: 0.8 },
      { id: "rag_vector_db", name: "Vector Databases (Pinecone, Chroma, Weaviate)", hours: 15, points: 1.2 },
      { id: "rag_hybrid", name: "Hybrid Search (Dense + Sparse)", hours: 12, points: 1.0 },
      { id: "rag_evaluation", name: "RAG Evaluation Metrics", hours: 10, points: 0.8 },
      { id: "rag_optimization", name: "RAG Optimization Techniques", hours: 15, points: 1.2 },
      { id: "rag_production", name: "Production RAG Systems", hours: 18, points: 1.4 }
    ]
  },

  mlops: {
    title: "MLOps & LLMOps",
    icon: "Award",
    color: "amber",
    weight: 8,
    topics: [
      { id: "mlops_versioning", name: "Model Versioning (DVC, MLflow)", hours: 10, points: 0.8 },
      { id: "mlops_tracking", name: "Experiment Tracking", hours: 8, points: 0.6 },
      { id: "mlops_deployment", name: "Model Deployment", hours: 12, points: 1.0 },
      { id: "mlops_monitoring", name: "Model Monitoring & Drift", hours: 10, points: 0.8 },
      { id: "mlops_ci_cd", name: "CI/CD for ML", hours: 12, points: 1.0 },
      { id: "mlops_containerization", name: "Docker & Kubernetes", hours: 15, points: 1.2 },
      { id: "mlops_serving", name: "Model Serving (FastAPI, BentoML)", hours: 12, points: 1.0 },
      { id: "mlops_scaling", name: "Scaling ML Systems", hours: 10, points: 0.8 }
    ]
  },

  projects: {
    title: "Projects & Portfolio",
    icon: "Code",
    color: "teal",
    weight: 15,
    topics: [
      { id: "proj_web_scraper", name: "Web Scraper (Deployed)", hours: 12, points: 1.2 },
      { id: "proj_rest_api", name: "REST API (Deployed)", hours: 15, points: 1.5 },
      { id: "proj_cli_tool", name: "CLI Tool (Published)", hours: 13, points: 1.3 },
      { id: "proj_ml_classification", name: "ML Classification Project", hours: 20, points: 2.0 },
      { id: "proj_ml_regression", name: "ML Regression Project", hours: 20, points: 2.0 },
      { id: "proj_rag_system", name: "RAG Q&A System", hours: 35, points: 3.0 },
      { id: "proj_multiagent", name: "Multi-Agent AI System", hours: 45, points: 4.0 },
      { id: "proj_production_ai", name: "Production AI System", hours: 55, points: 4.5 },
      { id: "proj_portfolio", name: "Portfolio Website", hours: 20, points: 1.5 },
      { id: "proj_github", name: "GitHub Professional Cleanup", hours: 15, points: 1.0 }
    ]
  },

  dsa_leetcode: {
    title: "DSA & LeetCode",
    icon: "Code",
    color: "red",
    weight: 20,
    milestones: [
      { count: 50, points: 2, label: "First 50 Easy" },
      { count: 100, points: 3, label: "100 Problems" },
      { count: 200, points: 4, label: "200 Problems" },
      { count: 300, points: 4, label: "300 Problems" },
      { count: 400, points: 5, label: "400 Problems" },
      { count: 500, points: 5, label: "500 Problems" },
      { count: 600, points: 5, label: "600 Problems" },
      { count: 700, points: 5, label: "700 Problems" },
      { count: 750, points: 4, label: "750 Problems" },
      { count: 800, points: 3, label: "800 Problems" },
      { count: 850, points: 5, label: "850 GOAL REACHED!" }
    ]
  },

  interviews: {
    title: "Placement Preparation",
    icon: "Award",
    color: "sky",
    weight: 15,
    topics: [
      { id: "int_applications", name: "Applied to 200+ Companies", hours: 40, points: 5.0 },
      { id: "int_resume", name: "Resume Optimization", hours: 10, points: 1.0 },
      { id: "int_linkedin", name: "LinkedIn Profile", hours: 5, points: 0.5 },
      { id: "int_mock_5", name: "5 Mock Interviews", hours: 15, points: 1.5 },
      { id: "int_mock_10", name: "10 Mock Interviews", hours: 20, points: 2.0 },
      { id: "int_system_design", name: "ML System Design Prep", hours: 25, points: 2.5 },
      { id: "int_behavioral", name: "Behavioral Interview Prep", hours: 10, points: 1.0 },
      { id: "int_communication", name: "Communication & STAR Method", hours: 10, points: 1.0 },
      { id: "int_interviews_5", name: "Completed 5 Real Interviews", hours: 15, points: 1.5 }
    ]
  }
};

export default function App() {
  const [user, setUser] = useState(null);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [leetcodeCount, setLeetcodeCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [view, setView] = useState('grid'); // grid, list, timeline
  const [showCompleted, setShowCompleted] = useState(true);
  const [showIncomplete, setShowIncomplete] = useState(true);
  const [sortBy, setSortBy] = useState('category'); // category, hours, points
  const [loading, setLoading] = useState(true);

  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  async function toggleTopic(topicId) {
    if (!user) return;
    try {

      const isCompleted = completedTopics.includes(topicId);
      
      // Optimistic UI update
      if (isCompleted) {
        setCompletedTopics(prev => prev.filter(id => id !== topicId));
        await supabase
          .from('progress')
          .delete()
          .eq('user_id', user.id)
          .eq('topic_id', topicId);
      } else {
        setCompletedTopics(prev => [...prev, topicId]);
        await supabase
          .from('progress')
          .insert({
            user_id: user.id,
            topic_id: topicId,
            completed: true
          });
      }
    } catch (error) {
      console.error('Toggle error:', error);
      // Revert state if error (optional, but good practice)
      loadProgress();
    }
  }

  useEffect(() => {
    // Check for errors in URL (e.g. OAuth failures)
    const params = new URLSearchParams(window.location.search);
    if (params.get('error')) {
      console.error('Auth error:', params.get('error_description'));
    }

    // Clean up URL parameters after login
    if (window.location.hash || window.location.search.includes('code=')) {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProgress(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProgress(session.user);
      } else {
        setCompletedTopics([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadProgress(currentUser) {
    try {
      const activeUser = currentUser || user;
      if (!activeUser) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('progress')
        .select('topic_id')
        .eq('user_id', activeUser.id);

      if (error) throw error;

      if (data) {
        setCompletedTopics(data.map(item => item.topic_id));
      }

      const lc = await window.storage.get('roadmap_leetcode');
      if (lc?.value) setLeetcodeCount(parseInt(lc.value));
    } catch (error) {
      console.log('Error loading progress:', error);
    }
    setLoading(false);
  }

  async function saveLegacyProgress() {
    try {
      await window.storage.set('roadmap_leetcode', leetcodeCount.toString());
    } catch (error) {
      console.error('Save error:', error);
    }
  }

  useEffect(() => {
    if (!loading) saveLegacyProgress();
  }, [leetcodeCount]);

  const calculateProgress = () => {
    let earnedPoints = 0;
    let totalPoints = 0;
    let earnedHours = 0;
    let totalHours = 0;

    // Calculate for all categories except LeetCode
    Object.entries(COMPLETE_ROADMAP).forEach(([key, category]) => {
      if (key === 'dsa_leetcode') return;

      category.topics?.forEach(topic => {
        totalPoints += topic.points;
        totalHours += topic.hours;
        if (completedTopics.includes(topic.id)) {
          earnedPoints += topic.points;
          earnedHours += topic.hours;
        }
      });
    });

    // Add LeetCode points
    const leetcodeData = COMPLETE_ROADMAP.dsa_leetcode;
    let leetcodePoints = 0;
    leetcodeData.milestones.forEach(milestone => {
      totalPoints += milestone.points;
      if (leetcodeCount >= milestone.count) {
        leetcodePoints += milestone.points;
      }
    });
    earnedPoints += leetcodePoints;

    return {
      earned: earnedPoints.toFixed(1),
      total: totalPoints,
      percentage: Math.round((earnedPoints / totalPoints) * 100),
      earnedHours,
      totalHours,
      leetcodePoints
    };
  };

  const getCategoryProgress = (categoryKey) => {
    const category = COMPLETE_ROADMAP[categoryKey];
    if (!category.topics) return { completed: 0, total: 0, percentage: 0 };

    const completedCount = category.topics.filter(t => completedTopics.includes(t.id)).length;
    return {
      completed: completedCount,
      total: category.topics.length,
      percentage: Math.round((completedCount / category.topics.length) * 100)
    };
  };

  const filterTopics = () => {
    let allTopics = [];

    Object.entries(COMPLETE_ROADMAP).forEach(([catKey, category]) => {
      if (catKey === 'dsa_leetcode' || !category.topics) return;

      category.topics.forEach(topic => {
        const isCompleted = completedTopics.includes(topic.id);
        const matchesSearch = searchQuery === '' ||
          topic.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 ||
          selectedCategories.includes(catKey);
        const matchesFilter = (showCompleted && isCompleted) ||
          (showIncomplete && !isCompleted);

        if (matchesSearch && matchesCategory && matchesFilter) {
          allTopics.push({
            ...topic,
            category: category.title,
            categoryKey: catKey,
            color: category.color,
            isCompleted
          });
        }
      });
    });

    // Sort topics
    if (sortBy === 'hours') {
      allTopics.sort((a, b) => b.hours - a.hours);
    } else if (sortBy === 'points') {
      allTopics.sort((a, b) => b.points - a.points);
    }

    return allTopics;
  };

  const overallProgress = calculateProgress();
  const filteredTopics = filterTopics();

  const colorMap = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
    cyan: 'from-cyan-500 to-teal-500',
    pink: 'from-pink-500 to-rose-500',
    orange: 'from-orange-500 to-red-500',
    indigo: 'from-indigo-500 to-purple-500',
    violet: 'from-violet-500 to-purple-500',
    emerald: 'from-emerald-500 to-green-500',
    rose: 'from-rose-500 to-pink-500',
    amber: 'from-amber-500 to-orange-500',
    teal: 'from-teal-500 to-cyan-500',
    red: 'from-red-500 to-rose-500',
    sky: 'from-sky-500 to-blue-500'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading roadmap...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Login Button */}
      <button
        onClick={login}
        className="fixed top-6 right-6 z-[60] bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg shadow-green-900/20 transition-all active:scale-95 flex items-center gap-2 group"
      >
        <Zap className="w-4 h-4 text-green-300 group-hover:animate-pulse" />
        <span>Login with Google</span>
      </button>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-light tracking-tight mb-1">AI Engineer Roadmap</h1>
            <p className="text-gray-500 text-sm">Complete path to ₹60 LPA • {overallProgress.totalHours}+ hours total</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Overall Progress to ₹60L Goal</span>
              <span className="text-3xl font-light text-green-400">{overallProgress.percentage}%</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${overallProgress.percentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>{overallProgress.earned} / {overallProgress.total} points</span>
              <span>{overallProgress.earnedHours} / {overallProgress.totalHours} hours</span>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-gray-700"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gray-700"
            >
              <option value="category">Sort by Category</option>
              <option value="hours">Sort by Hours</option>
              <option value="points">Sort by Points</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className={`px-4 py-2.5 rounded-lg text-sm transition ${showCompleted ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-900 text-gray-500 border border-gray-800'
                  }`}
              >
                Completed
              </button>
              <button
                onClick={() => setShowIncomplete(!showIncomplete)}
                className={`px-4 py-2.5 rounded-lg text-sm transition ${showIncomplete ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-900 text-gray-500 border border-gray-800'
                  }`}
              >
                Incomplete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {Object.entries(COMPLETE_ROADMAP).filter(([k]) => k !== 'dsa_leetcode').slice(0, 4).map(([key, cat]) => {
            const prog = getCategoryProgress(key);
            return (
              <div key={key} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-2">{cat.title}</div>
                <div className="text-2xl font-light mb-1">{prog.percentage}%</div>
                <div className="text-xs text-gray-600">{prog.completed}/{prog.total} topics</div>
              </div>
            );
          })}
        </div>

        {/* LeetCode Tracker */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800 mb-8">
          <h3 className="text-lg font-light mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" />
            LeetCode Progress
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setLeetcodeCount(Math.max(0, leetcodeCount - 1))}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition"
            >
              −
            </button>
            <input
              type="number"
              value={leetcodeCount}
              onChange={(e) => setLeetcodeCount(Math.min(1000, Math.max(0, parseInt(e.target.value) || 0)))}
              className="bg-gray-800 text-white px-6 py-2 rounded text-center w-32 font-light text-xl border border-gray-700 focus:outline-none focus:border-gray-600"
            />
            <button
              onClick={() => setLeetcodeCount(Math.min(1000, leetcodeCount + 1))}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition"
            >
              +
            </button>
            <span className="text-gray-500">/ 850 target</span>
            <span className="ml-auto text-green-400 font-light">{overallProgress.leetcodePoints} points</span>
          </div>
          <div className="grid grid-cols-11 gap-2">
            {COMPLETE_ROADMAP.dsa_leetcode.milestones.map((milestone) => (
              <div key={milestone.count} className="text-center">
                <div className={`h-2 rounded-full mb-2 transition ${leetcodeCount >= milestone.count ? 'bg-green-500' : 'bg-gray-800'}`} />
                <div className="text-[10px] text-gray-600">{milestone.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Topics List */}
        <div className="space-y-2">
          {filteredTopics.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No topics match your filters
            </div>
          ) : (
            filteredTopics.map((topic) => (
              <label
                key={topic.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-900/30 border border-gray-800 hover:bg-gray-900/50 hover:border-gray-700 cursor-pointer transition group"
              >
                <input
                  type="checkbox"
                  disabled={!user}
                  title={!user ? "Login required to track progress" : ""}
                  checked={completedTopics.includes(topic.id)}
                  onChange={() => toggleTopic(topic.id)}
                  className={`w-5 h-5 rounded bg-gray-800 border-gray-700 ${!user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                />
                <div className="flex-1">
                  <div className={`text-sm ${topic.isCompleted ? 'line-through text-gray-600' : 'text-gray-300'}`}>
                    {topic.name}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{topic.category}</div>
                </div>
                <div className="flex items-center gap-6 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {topic.hours}h
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    +{topic.points}%
                  </div>
                </div>
              </label>
            ))
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg border border-green-800/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-light mb-1">
                {overallProgress.percentage === 0 ? "Begin Your Journey" :
                  overallProgress.percentage < 25 ? "Building Foundation" :
                    overallProgress.percentage < 50 ? "Making Progress!" :
                      overallProgress.percentage < 75 ? "Halfway There!" :
                        overallProgress.percentage < 100 ? "Almost Ready!" :
                          "🎉 Journey Complete!"}
              </h3>
              <p className="text-sm text-gray-400">
                {overallProgress.percentage < 100
                  ? `${100 - overallProgress.percentage}% remaining • Stay consistent and execute daily`
                  : "Ready for ₹60L offers! Time to apply and interview."}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-light text-green-400">{overallProgress.percentage}%</div>
              <div className="text-xs text-gray-500">to ₹60 LPA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
