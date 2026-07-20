// Data glosarium skripsi HeCa AI - 122 istilah (auto-generated)
export type GlossaryTerm = {
  name: string;
  english: string;
  category: string;
  source: string;
  seealso: string;
  definition: string;
};

export const glossaryCategories: string[] = [
  "Konsep AI & Machine Learning",
  "Explainable AI (XAI)",
  "Algoritma & Metode Klasifikasi",
  "Pemrosesan Bahasa Alami (NLP)",
  "Ekstraksi Fitur & Representasi Teks",
  "Evaluasi & Metrik",
  "Conformal Prediction & Uncertainty",
  "Implementasi & Tools",
  "Statistik & Matematika",
  "Dataset & Data Management",
];

export const glossary: GlossaryTerm[] = [
  {
    name: "Bias-Variance Trade-off",
    english: "Bias-Variance Trade-off",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (Han et al., 2012)",
    seealso: "Overfitting, Hyperparameter k",
    definition:
      "Dilema fundamental dalam machine learning antara bias (kesalahan akibat asumsi model yang terlalu sederhana) dan variance (sensitivitas model terhadap fluktuasi data training). Nilai k kecil pada KNN/LMPNN → variance tinggi; k besar → bias tinggi.",
  },
  {
    name: "Black Box",
    english: "Black Box",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (Molnar, 2019; Suyanto et al., 2022)",
    seealso: "XAI, Deep Learning, Interpretabilitas",
    definition:
      "Istilah yang menggambarkan model AI yang mekanisme internalnya tidak dapat dipahami atau ditelusuri oleh manusia hanya dengan melihat parameternya. Model memberikan prediksi akurat namun tidak mampu menjelaskan dasar pengambilan keputusannya — menjadi hambatan utama dalam aplikasi sensitif seperti kesehatan.",
  },
  {
    name: "Deep Learning",
    english: "DL",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (J. Russell & Norvig, 2020)",
    seealso: "Black Box, Machine Learning, Neural Network",
    definition:
      "Subfield machine learning yang menggunakan arsitektur jaringan syaraf tiruan dengan banyak lapisan (multi-layer) untuk mempelajari representasi data yang kompleks. Sangat efektif untuk data tidak terstruktur seperti gambar, suara, dan teks, namun cenderung bersifat black box.",
  },
  {
    name: "Generalisasi",
    english: "Generalization",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB IV",
    seealso: "Overfitting, Cross-Validation",
    definition:
      "Kemampuan model yang telah dilatih untuk memberikan performa baik pada data baru yang belum pernah dilihat sebelumnya. Dalam penelitian ini, selisih F1-macro CV (45,74%) vs testing (45,48%) hanya 0,26% — mengonfirmasi generalisasi yang baik.",
  },
  {
    name: "Kecerdasan Buatan",
    english: "Artificial Intelligence, AI",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (J. Russell & Norvig, 2010; Santoso, 2023)",
    seealso: "Machine Learning, Deep Learning, XAI",
    definition:
      "Bidang ilmu komputer yang berfokus pada pengembangan sistem dan agen cerdas yang mampu mempersepsi lingkungannya, melakukan penalaran, dan mengambil tindakan secara rasional untuk mencapai tujuan tertentu — meniru kapasitas kognitif manusia dalam menyelesaikan masalah kompleks.",
  },
  {
    name: "Large Language Model",
    english: "LLM",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (OpenAI et al., 2024)",
    seealso: "Deep Learning, Transformer",
    definition:
      "Model bahasa berskala sangat besar (seperti GPT-4, Gemini, Claude) yang dilatih pada dataset teks raksasa menggunakan arsitektur Transformer. Mampu memproses teks, gambar, video, audio, dan kode dalam satu arsitektur terpadu. Menjadi tren utama AI sejak 2022.",
  },
  {
    name: "Machine Learning",
    english: "ML",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (Andriy Burkov, 2019)",
    seealso: "Supervised Learning, Deep Learning, KNN",
    definition:
      "Subbidang AI yang berfokus pada pengembangan algoritma yang memungkinkan sistem komputer belajar dari data dan membuat prediksi atau pengambilan keputusan tanpa diprogram secara eksplisit. Mengidentifikasi pola dalam data dan menggeneralisasikannya ke data baru.",
  },
  {
    name: "Neural Network",
    english: "Neural Network / Artificial Neural Network",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II",
    seealso: "Deep Learning, Black Box",
    definition:
      "Model komputasi terinspirasi dari struktur otak manusia, terdiri dari lapisan neuron buatan yang saling terhubung. Digunakan sebagai backbone dari Deep Learning. Memiliki kemampuan tinggi namun bersifat black box.",
  },
  {
    name: "Overfitting",
    english: "Overfitting",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB IV",
    seealso: "Underfitting, Generalisasi, Cross-Validation",
    definition:
      "Kondisi ketika model terlalu mempelajari detail dan noise dari data training sehingga performanya sangat baik pada data training namun buruk pada data baru (testing). Indikator: selisih besar antara performa training dan testing.",
  },
  {
    name: "Reinforcement Learning",
    english: "RL",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (Andriy Burkov, 2019; Géron, 2019)",
    seealso: "Machine Learning",
    definition:
      "Cabang machine learning di mana agen belajar mengambil keputusan optimal melalui interaksi berulang dengan lingkungan, berdasarkan sistem umpan balik berupa reward dan punishment. Digunakan untuk masalah yang membutuhkan pengambilan keputusan sekuensial.",
  },
  {
    name: "Responsible AI",
    english: "Responsible AI",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (Arrieta et al., 2020)",
    seealso: "XAI, Trustworthy AI, GDPR",
    definition:
      "Pendekatan pengembangan dan penerapan AI yang mempertimbangkan aspek etika, transparansi, keadilan, dan akuntabilitas. Menekankan bahwa sistem AI harus dapat dipercaya, dijelaskan, dan tidak merugikan manusia — selaras dengan regulasi seperti GDPR right to explanation.",
  },
  {
    name: "Semi-Supervised Learning",
    english: "Semi-Supervised Learning",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (Andriy Burkov, 2019)",
    seealso: "Supervised Learning, Unsupervised Learning",
    definition:
      "Pendekatan machine learning yang menggabungkan sejumlah kecil data berlabel dengan sejumlah besar data tak berlabel. Memanfaatkan struktur data tak berlabel untuk mendukung proses pembelajaran model dan meningkatkan kinerja dibanding supervised learning dengan data berlabel sedikit.",
  },
  {
    name: "Supervised Learning",
    english: "Supervised Learning",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (Géron, 2019)",
    seealso: "Klasifikasi, KNN, LMPNN",
    definition:
      "Metode machine learning di mana dataset memiliki label yang telah ditentukan sebelumnya. Algoritma mempelajari hubungan antara fitur input dan label output untuk memprediksi label pada data baru. Mencakup dua tugas utama: klasifikasi dan regresi.",
  },
  {
    name: "Trustworthy AI",
    english: "Trustworthy AI",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (Arrieta et al., 2020; Saraswat et al., 2022)",
    seealso: "Responsible AI, XAI",
    definition:
      "Konsep AI yang tidak hanya akurat, tetapi juga dapat dipercaya, aman, dan transparan dalam pengambilan keputusannya. Menjadi arah perkembangan teknologi global yang menekankan bahwa sistem AI harus memenuhi standar kepercayaan dari perspektif pengguna dan regulator.",
  },
  {
    name: "Underfitting",
    english: "Underfitting",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (Géron, 2019)",
    seealso: "Overfitting, Bias-Variance Trade-off",
    definition:
      "Kondisi ketika model terlalu sederhana sehingga tidak mampu menangkap pola dalam data training maupun testing — menghasilkan performa buruk di kedua set.",
  },
  {
    name: "Unsupervised Learning",
    english: "Unsupervised Learning",
    category: "Konsep AI & Machine Learning",
    source: "SK BAB II (Andriy Burkov, 2019; Géron, 2019)",
    seealso: "Clustering, PCA",
    definition:
      "Pendekatan machine learning ketika dataset tidak memiliki label, sehingga model harus menemukan pola, struktur, atau representasi tersembunyi secara mandiri. Mencakup clustering, dimensionality reduction, dan anomaly detection.",
  },
  {
    name: "Explainability",
    english: "Explainability",
    category: "Explainable AI (XAI)",
    source: "SK BAB II (Suyanto et al., 2022)",
    seealso: "Interpretabilitas, XAI, Transparent Model",
    definition:
      "Karakteristik AKTIF model — kemampuan model untuk secara proaktif memperjelas atau merinci fungsi internalnya kepada pengguna. Berbeda dengan interpretabilitas yang bersifat pasif.",
  },
  {
    name: "Explainable AI",
    english: "XAI",
    category: "Explainable AI (XAI)",
    source:
      "SK BAB II (Arrieta et al., 2020; Gunning & Aha, 2017; Molnar, 2019)",
    seealso: "Black Box, Interpretabilitas, Conformal Prediction",
    definition:
      "Seperangkat teknik dan metodologi dalam machine learning yang bertujuan membuat perilaku, keputusan, dan mekanisme internal model AI menjadi transparan dan dapat dipahami oleh manusia, tanpa mengorbankan kinerja prediksi. Berfungsi sebagai jembatan antara akurasi dan interpretabilitas pada model black box.",
  },
  {
    name: "Interpretabilitas",
    english: "Interpretability",
    category: "Explainable AI (XAI)",
    source: "SK BAB II (Molnar, 2019; Suyanto et al., 2022)",
    seealso: "Explainability, XAI",
    definition:
      "Karakteristik PASIF model — tingkat di mana model masuk akal bagi pengamat manusia, yaitu kemampuan manusia untuk memahami penyebab dari sebuah keputusan atau secara konsisten memprediksi hasil model.",
  },
  {
    name: "LIME",
    english: "Local Interpretable Model-agnostic Explanations",
    category: "Explainable AI (XAI)",
    source: "SK BAB II (Molnar, 2019)",
    seealso: "SHAP, Post-hoc XAI",
    definition:
      "Teknik post-hoc explainability yang memberikan penjelasan lokal pada prediksi individual dengan membangun model sederhana (interpretable) di sekitar prediksi tersebut. Bersifat model-agnostic (dapat digunakan pada model apa pun).",
  },
  {
    name: "Nearest Neighbors Explanation",
    english: "Nearest Neighbors Interpretation",
    category: "Explainable AI (XAI)",
    source: "SK BAB IV (Suyanto et al., 2022)",
    seealso: "LMPNN, KNN, Transparent Model",
    definition:
      "Mekanisme explainability inheren dari KNN/LMPNN di mana setiap keputusan prediksi dapat dijelaskan langsung melalui daftar tetangga terdekat yang paling berpengaruh beserta label dan jarak masing-masing — tanpa memerlukan teknik interpretasi tambahan.",
  },
  {
    name: "Post-hoc Explainability",
    english: "Post-hoc Explainability",
    category: "Explainable AI (XAI)",
    source: "SK BAB II (Molnar, 2019)",
    seealso: "LIME, SHAP, Transparent Model",
    definition:
      "Pendekatan XAI yang menghasilkan penjelasan untuk model black box menggunakan metode eksternal setelah model dilatih. Memperlakukan model sebagai kotak hitam dan menganalisis pasangan input-output. Contoh: LIME, SHAP.",
  },
  {
    name: "Right to Explanation",
    english: "Right to Explanation (GDPR Art. 22)",
    category: "Explainable AI (XAI)",
    source: "SK BAB I (Custers & Heijne, 2022)",
    seealso: "GDPR, Responsible AI, XAI",
    definition:
      "Hak yang diatur dalam General Data Protection Regulation (GDPR) Eropa yang mengharuskan sistem AI yang mengambil keputusan otomatis untuk dapat memberikan informasi bermakna mengenai logika yang terlibat kepada subjek data. Menjadi regulasi global yang mendorong adopsi XAI.",
  },
  {
    name: "SHAP",
    english: "SHapley Additive exPlanations",
    category: "Explainable AI (XAI)",
    source: "SK BAB II (Molnar, 2019)",
    seealso: "LIME, Post-hoc XAI",
    definition:
      "Teknik post-hoc explainability berbasis teori permainan Shapley untuk menghitung kontribusi setiap fitur terhadap prediksi model. Memberikan penjelasan yang konsisten dan adil secara matematis.",
  },
  {
    name: "Transparent Model",
    english: "Transparent Model / White Box / Glass Box",
    category: "Explainable AI (XAI)",
    source: "SK BAB II (Molnar, 2019; Suyanto et al., 2022)",
    seealso: "KNN, LMPNN, Post-hoc XAI",
    definition:
      "Model AI yang memiliki struktur sederhana sehingga dapat diinterpretasikan secara intrinsik tanpa teknik eksternal tambahan. KNN dan LMPNN termasuk dalam kategori ini karena keputusannya dapat dijelaskan langsung melalui contoh tetangga terdekat.",
  },
  {
    name: "Cross-Validation",
    english: "Cross-Validation / K-Fold CV",
    category: "Algoritma & Metode Klasifikasi",
    source: "SK BAB III & IV (Géron, 2019)",
    seealso: "Grid Search, Overfitting",
    definition:
      "Teknik evaluasi model yang membagi data training menjadi k lipatan (fold), melatih model pada k-1 fold dan mengevaluasinya pada fold yang tersisa, kemudian merotasi proses ini sebanyak k kali. Menghasilkan estimasi performa yang lebih stabil dan tidak bias. Penelitian ini menggunakan 5-fold CV.\nFormula / Notasi:\nF1_CV = (1/k) Σᵢ F1_fold_i",
  },
  {
    name: "Grid Search",
    english: "Grid Search",
    category: "Algoritma & Metode Klasifikasi",
    source: "SK BAB IV",
    seealso: "Cross-Validation, Hyperparameter k",
    definition:
      "Metode pencarian hyperparameter yang sistematis dengan menguji seluruh kombinasi nilai kandidat dari ruang pencarian yang didefinisikan. Dalam penelitian ini, grid search menguji k=1 hingga k=51 (bilangan ganjil, total 26 kandidat) menggunakan 5-fold cross-validation dengan metrik F1-macro.",
  },
  {
    name: "Hyperparameter",
    english: "Hyperparameter",
    category: "Algoritma & Metode Klasifikasi",
    source: "SK BAB III",
    seealso: "Hyperparameter k, Grid Search",
    definition:
      "Parameter konfigurasi model yang ditetapkan sebelum proses training dan tidak dipelajari dari data secara langsung. Pada LMPNN, hyperparameter utama adalah nilai k (jumlah tetangga). Ditentukan melalui grid search + cross-validation.",
  },
  {
    name: "Hyperparameter k",
    english: "Parameter k (jumlah tetangga)",
    category: "Algoritma & Metode Klasifikasi",
    source: "SK BAB II & IV (Han et al., 2012; Suyanto et al., 2022)",
    seealso: "Grid Search, LMPNN, Bias-Variance Trade-off",
    definition:
      "Hyperparameter utama pada KNN dan LMPNN yang menentukan jumlah tetangga terdekat yang dipertimbangkan. Nilai k kecil → variance tinggi (sensitive terhadap noise); k besar → bias tinggi. Penelitian ini memilih k=9 berdasarkan grid search — berada pada awal plateau performa dengan F1-macro CV = 45,74%.",
  },
  {
    name: "K-Nearest Neighbors",
    english: "KNN",
    category: "Algoritma & Metode Klasifikasi",
    source: "SK BAB II (Han et al., 2012; Müller & Guido, 2017)",
    seealso: "LMPNN, Lazy Learner, Majority Voting",
    definition:
      "Algoritma machine learning yang bersifat lazy learner — tidak membangun model eksplisit saat training, melainkan menyimpan seluruh data training dan menunda generalisasi hingga prediksi diperlukan. Mengklasifikasikan data baru berdasarkan majority voting dari k tetangga terdekat di ruang fitur.\nFormula / Notasi:\nPrediksi: ŷ = majority_vote({y_i | x_i ∈ kNN(x_test)})",
  },
  {
    name: "Lazy Learner",
    english: "Lazy Learner / Instance-based Learning",
    category: "Algoritma & Metode Klasifikasi",
    source: "SK BAB II (Han et al., 2012; Suyanto et al., 2022)",
    seealso: "KNN, Instance-based Learning",
    definition:
      "Paradigma machine learning di mana model tidak melakukan proses pelatihan eksplisit untuk membangun model matematis sebelum prediksi. Sebaliknya, seluruh data training disimpan dan digunakan secara langsung saat prediksi. KNN adalah contoh klasik lazy learner.",
  },
  {
    name: "Local Mean-based Pseudo Nearest Neighbor",
    english: "LMPNN",
    category: "Algoritma & Metode Klasifikasi",
    source: "SK BAB II & III (Suyanto et al., 2022)",
    seealso: "KNN, Cosine Distance, Conformal Prediction",
    definition:
      "Varian modern KNN (Suyanto et al., 2022) yang lebih robust terhadap outlier. Cara kerja: untuk setiap kelas, (1) cari k tetangga terdekat sesama kelas per sampel training, (2) hitung local mean vector dari k tetangga tersebut, (3) agregasi menjadi prototipe kelas μc, (4) prediksi berdasarkan argmin cosine distance data uji ke μc. Digunakan sebagai algoritma utama penelitian ini dengan k=9.\nFormula / Notasi:\nμc = (1/|Dc|) Σi (1/k Σj∈Nk(c,i) xj)   |   ŷ = argminc CosDist(x_test, μc)",
  },
  {
    name: "Majority Voting",
    english: "Majority Voting",
    category: "Algoritma & Metode Klasifikasi",
    source: "SK BAB II (Han et al., 2012)",
    seealso: "KNN, LMPNN",
    definition:
      "Mekanisme pengambilan keputusan pada KNN di mana kelas dari data baru ditentukan oleh kelas yang paling dominan (muncul paling sering) di antara k tetangga terdekatnya. LMPNN menggantikan ini dengan perbandingan terhadap prototipe kelas.",
  },
  {
    name: "Stratified Split",
    english: "Stratified Train-Test Split",
    category: "Algoritma & Metode Klasifikasi",
    source: "SK BAB III & IV",
    seealso: "Class Imbalance, Data Splitting",
    definition:
      "Metode pembagian dataset yang memastikan proporsi kelas tetap seimbang di setiap subset (training, calibration, testing). Penting untuk dataset dengan class imbalance. Penelitian ini menggunakan stratified split dengan validasi maksimum perbedaan proporsi < 0,000046.",
  },
  {
    name: "Support Vector Machine",
    english: "SVM",
    category: "Algoritma & Metode Klasifikasi",
    source: "SK BAB II (Géron, 2019)",
    seealso: "Machine Learning, Conformal Prediction",
    definition:
      "Algoritma supervised learning yang mencari hyperplane pemisah optimal antara kelas dengan memaksimalkan margin antara kelas dalam ruang fitur berdimensi tinggi. Disebutkan sebagai salah satu algoritma yang dapat digunakan bersama Conformal Prediction (namun tidak digunakan dalam penelitian ini).",
  },
  {
    name: "Bigram",
    english: "Bigram (n=2)",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB III",
    seealso: "n-gram, Unigram, TF-IDF",
    definition:
      "n-gram dengan n=2 — representasi dua kata berurutan sebagai fitur. Menangkap frasa medis yang bermakna gabungan seperti 'sakit kepala', 'darah tinggi', 'rapid test'.",
  },
  {
    name: "Case Folding",
    english: "Case Folding / Lowercasing",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB II (Sarkar, 2016)",
    seealso: "Preprocessing Pipeline",
    definition:
      "Tahap preprocessing pertama — konversi seluruh karakter teks menjadi huruf kecil (lowercase). Tujuan: menyeragamkan format sehingga 'Kesehatan' dan 'kesehatan' diperlakukan sebagai token identik, mengurangi duplikasi fitur dalam ruang vektor.\nFormula / Notasi:\nstr.lower()",
  },
  {
    name: "Cleaning",
    english: "Text Cleaning / Noise Removal",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB III",
    seealso: "Preprocessing Pipeline, Tokenization",
    definition:
      "Tahap preprocessing kedua — penghapusan elemen teks yang tidak relevan menggunakan Regex (Regular Expression): URL, mention (@), hashtag (#), angka, dan karakter khusus. Dilakukan sebelum tokenisasi agar tokenizer tidak memproses karakter noise.\nFormula / Notasi:\nPython re.sub() module",
  },
  {
    name: "Custom Stopwords",
    english: "Custom Stopwords",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB III",
    seealso: "Stopword Removal, Domain-Specific",
    definition:
      "Daftar kata tambahan yang disesuaikan dengan karakteristik domain spesifik, di luar daftar stopwords bawaan library. Dalam penelitian ini, 45 custom stopwords ditambahkan untuk menghapus kata sapaan dan basa-basi khas konsultasi medis yang tidak diskriminatif antar kelas.",
  },
  {
    name: "Enhanced Confix Stripping",
    english: "ECS Stemmer",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB II (Arifin et al., 2009)",
    seealso: "Stemming, PySastrawi",
    definition:
      "Algoritma stemming khusus bahasa Indonesia pengembangan dari Nazief & Adriani yang mampu menangani confix (gabungan awalan + akhiran) dan menggunakan kamus kata dasar sebagai validasi untuk meminimalkan over-stemming. Contoh: 'mempertanyakan' → 'tanya'. Diimplementasikan dalam library PySastrawi.",
  },
  {
    name: "Klasifikasi Teks",
    english: "Text Classification",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB II (Jurafsky & Martin, 2008)",
    seealso: "NLP, Multiclass Classification, LMPNN",
    definition:
      "Tugas mendasar dalam NLP yang bertujuan menetapkan dokumen dari himpunan dokumen ke dalam satu atau lebih kelas yang telah ditentukan sebelumnya. Penelitian ini mengklasifikasikan pertanyaan kesehatan ke 107 kategori medis menggunakan LMPNN.",
  },
  {
    name: "Multiclass Classification",
    english: "Multiclass Classification",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB II & IV",
    seealso: "Klasifikasi Teks, F1-Macro",
    definition:
      "Tugas klasifikasi dengan lebih dari dua kelas target. Penelitian ini adalah contoh extreme multiclass classification dengan 107 kelas medis — jauh lebih kompleks dari klasifikasi biner atau 10 kelas.",
  },
  {
    name: "n-gram",
    english: "n-gram",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB III",
    seealso: "TF-IDF, Unigram, Bigram",
    definition:
      "Sekuens berurutan dari n item (kata/karakter) dari teks. Unigram (n=1) adalah satu kata tunggal; bigram (n=2) adalah dua kata berurutan. Penelitian ini menggunakan ngram_range (1,2) pada TF-IDF untuk menangkap frasa medis seperti 'sakit kepala', 'demam berdarah'.",
  },
  {
    name: "Natural Language Processing",
    english: "NLP",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB II",
    seealso: "Klasifikasi Teks, Preprocessing, TF-IDF",
    definition:
      "Cabang AI yang berkaitan dengan interaksi antara komputer dan bahasa manusia. Mencakup analisis, pemahaman, dan generasi teks dalam bahasa alami. Dalam penelitian ini diterapkan untuk memproses tanya jawab kesehatan berbahasa Indonesia.",
  },
  {
    name: "Preprocessing Pipeline",
    english: "Text Preprocessing Pipeline",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB II & III (Sarkar, 2016)",
    seealso: "Case Folding, Tokenization, Stemming",
    definition:
      "Rangkaian tahapan berurutan untuk membersihkan dan mentransformasi teks mentah menjadi representasi yang siap diproses model. Dalam penelitian ini terdiri dari 5 tahap: Case Folding → Cleaning → Tokenization → Stopword Removal → Stemming. Berhasil mereduksi token 54,4%.",
  },
  {
    name: "Stemming",
    english: "Stemming",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB II (Jurafsky & Martin, 2008; Arifin et al., 2009)",
    seealso: "Enhanced Confix Stripping, PySastrawi",
    definition:
      "Proses morfologis untuk menghapus imbuhan (afiks) dari kata guna mendapatkan bentuk dasarnya (stem/kata dasar). Dalam penelitian ini menggunakan Enhanced Confix Stripping (ECS) dari library PySastrawi — dirancang khusus untuk morfologi aglutinatif bahasa Indonesia.",
  },
  {
    name: "Stopword Removal",
    english: "Stopword Removal",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB II (Jurafsky & Martin, 2008; Sarkar, 2016)",
    seealso: "Preprocessing Pipeline, Custom Stopwords, PySastrawi",
    definition:
      "Penghapusan kata-kata umum yang tidak memiliki nilai semantik signifikan dan tidak berkontribusi membedakan dokumen satu dengan lainnya (e.g., 'dan', 'yang', 'dari'). Dalam penelitian ini menggunakan 809 kata bawaan Sastrawi ditambah 45 custom stopwords konteks medis seperti 'dok', 'dokter', 'halo'.",
  },
  {
    name: "Token",
    english: "Token",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB II",
    seealso: "Tokenization, Preprocessing",
    definition:
      "Unit individual hasil tokenisasi teks — biasanya berupa satu kata, angka, atau tanda baca. Token menjadi unit dasar pemrosesan dalam NLP. Rata-rata token per dokumen dalam dataset ini berkurang dari 56,6 (sebelum preprocessing) menjadi 25,8 (sesudah preprocessing) — reduksi 54,4%.",
  },
  {
    name: "Tokenization",
    english: "Tokenization",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB II (Jurafsky & Martin, 2008; Sarkar, 2016)",
    seealso: "Preprocessing Pipeline, Stopword Removal",
    definition:
      "Proses segmentasi string teks menjadi unit-unit individu yang disebut token (biasanya kata, angka, atau tanda baca). Merupakan langkah fundamental mengubah teks kontinu menjadi urutan unit diskrit yang dapat dihitung. Dalam penelitian ini menggunakan Python str.split().",
  },
  {
    name: "Unigram",
    english: "Unigram (n=1)",
    category: "Pemrosesan Bahasa Alami (NLP)",
    source: "SK BAB III",
    seealso: "n-gram, Bigram, TF-IDF",
    definition:
      "n-gram dengan n=1 — representasi satu kata tunggal sebagai fitur. Menangkap term medis yang khas secara individual seperti 'cacar', 'HIV', 'diabetes'.",
  },
  {
    name: "Cosine Distance",
    english: "Cosine Distance",
    category: "Ekstraksi Fitur & Representasi Teks",
    source: "SK BAB II Persamaan 2.6 (Han et al., 2012)",
    seealso: "Cosine Similarity, Nonconformity Score",
    definition:
      "Ukuran ketidakmiripan yang diturunkan dari cosine similarity. Digunakan sebagai nonconformity measure dalam Conformal Prediction pada penelitian ini. Nilai 0 = vektor identik; nilai 1 = vektor ortogonal (tidak ada kemiripan).\nFormula / Notasi:\nd_cosine(x,y) = 1 - sim_cosine(x,y) = 1 - (x·y)/(||x||·||y||)",
  },
  {
    name: "Cosine Similarity",
    english: "Cosine Similarity",
    category: "Ekstraksi Fitur & Representasi Teks",
    source: "SK BAB II Persamaan 2.5 (Han et al., 2012)",
    seealso: "Cosine Distance, Euclidean Distance",
    definition:
      "Ukuran kemiripan dua vektor berdasarkan sudut di antara keduanya (bukan besarannya). Sangat efektif untuk sparse vector TF-IDF karena invariant terhadap panjang dokumen dan fokus pada distribusi relatif term. Nilai mendekati 1 = sangat mirip; mendekati 0 = tidak mirip.\nFormula / Notasi:\nsim(x,y) = (x·y) / (||x|| × ||y||)",
  },
  {
    name: "Curse of Dimensionality",
    english: "Curse of Dimensionality",
    category: "Ekstraksi Fitur & Representasi Teks",
    source: "SK BAB II (Han et al., 2012)",
    seealso: "Sparsity, Cosine Distance, Euclidean Distance",
    definition:
      "Fenomena di mana algoritma machine learning berbasis jarak (seperti KNN) kehilangan efektivitasnya pada data berdimensi sangat tinggi karena semua titik cenderung berjarak sama satu sama lain. Euclidean distance sangat rentan terhadap ini, sedangkan cosine distance lebih robust pada data sparse berdimensi tinggi.",
  },
  {
    name: "Euclidean Distance",
    english: "Euclidean Distance",
    category: "Ekstraksi Fitur & Representasi Teks",
    source: "SK BAB II Persamaan 2.1 (Han et al., 2012)",
    seealso: "Cosine Distance, Curse of Dimensionality",
    definition:
      "Metrik jarak yang paling umum — mengukur jarak garis lurus antara dua titik. Tidak efektif untuk sparse vector TF-IDF berdimensi tinggi karena sangat sensitif terhadap panjang dokumen dan rentan terhadap curse of dimensionality.\nFormula / Notasi:\nd_Euclidean(x,y) = √(Σᵢ(xᵢ - yᵢ)²)",
  },
  {
    name: "Inverse Document Frequency",
    english: "IDF",
    category: "Ekstraksi Fitur & Representasi Teks",
    source: "SK BAB II Persamaan 2.9 (Jurafsky & Martin, 2008)",
    seealso: "TF-IDF, Term Frequency",
    definition:
      "Komponen TF-IDF yang mengurangi bobot kata-kata yang terlalu sering muncul di banyak dokumen karena tidak diskriminatif. Semakin jarang kata muncul di seluruh corpus, semakin besar nilai IDF-nya.\nFormula / Notasi:\nidf(t) = log(N / df(t)) — di mana N=total dokumen, df(t)=jumlah dokumen yang mengandung t",
  },
  {
    name: "Manhattan Distance",
    english: "Manhattan Distance / City Block Distance",
    category: "Ekstraksi Fitur & Representasi Teks",
    source: "SK BAB II Persamaan 2.2 (Han et al., 2012)",
    seealso: "Euclidean Distance, Minkowski Distance",
    definition:
      "Metrik jarak yang menghitung jumlah perbedaan absolut koordinat pada setiap dimensi. Lebih robust terhadap outlier dibanding Euclidean karena tidak melibatkan kuadrat. Nama berasal dari analogi jarak blok kota Manhattan.\nFormula / Notasi:\nd_Manhattan(x,y) = Σᵢ|xᵢ - yᵢ|",
  },
  {
    name: "Minkowski Distance",
    english: "Minkowski Distance",
    category: "Ekstraksi Fitur & Representasi Teks",
    source: "SK BAB II Persamaan 2.4 (Han et al., 2012)",
    seealso: "Euclidean Distance, Manhattan Distance",
    definition:
      "Generalisasi dari Euclidean dan Manhattan distance melalui parameter h. Ketika h=1 → Manhattan distance; h=2 → Euclidean distance; h→∞ → Chebyshev distance.\nFormula / Notasi:\nd_Minkowski(x,y) = (Σᵢ|xᵢ - yᵢ|ʰ)^(1/h)",
  },
  {
    name: "Sparse Matrix",
    english: "Sparse Matrix",
    category: "Ekstraksi Fitur & Representasi Teks",
    source: "SK BAB IV",
    seealso: "TF-IDF, Sparsity, CSR Format",
    definition:
      "Matriks di mana sebagian besar elemennya bernilai nol. Representasi TF-IDF menghasilkan sparse matrix karena setiap dokumen hanya mengandung sebagian kecil dari total vocabulary. Dalam penelitian ini: 81.064 × 5.000 dengan sparsity 99,55% (hanya 1.809.324 elemen non-zero).",
  },
  {
    name: "Sparsity",
    english: "Sparsity",
    category: "Ekstraksi Fitur & Representasi Teks",
    source: "SK BAB IV",
    seealso: "Sparse Matrix, Cosine Distance, Curse of Dimensionality",
    definition:
      "Persentase elemen bernilai nol dalam sparse matrix. Sparsity 99,55% dalam penelitian ini berarti 99,55% dari seluruh elemen matriks TF-IDF bernilai nol — hanya 0,45% yang non-zero. Mendukung penggunaan cosine distance dan format penyimpanan CSR.\nFormula / Notasi:\nSparsity = 1 - (non-zero elements / total elements) = 1 - (1.809.324 / 405.320.000) = 99,55%",
  },
  {
    name: "Term Frequency",
    english: "TF",
    category: "Ekstraksi Fitur & Representasi Teks",
    source: "SK BAB II Persamaan 2.8 (Jurafsky & Martin, 2008)",
    seealso: "TF-IDF, IDF",
    definition:
      "Komponen TF-IDF yang mengukur frekuensi kemunculan sebuah term dalam satu dokumen. Semakin sering kata muncul dalam dokumen, semakin penting kata tersebut untuk merepresentasikan isi dokumen tersebut.\nFormula / Notasi:\ntf(t,d) = f(t,d) / Σt' f(t',d)",
  },
  {
    name: "TF-IDF",
    english: "Term Frequency - Inverse Document Frequency",
    category: "Ekstraksi Fitur & Representasi Teks",
    source: "SK BAB II (Jurafsky & Martin, 2008; Sarkar, 2016)",
    seealso: "Term Frequency, IDF, Sparse Matrix",
    definition:
      "Metode pembobotan fitur teks yang menggabungkan TF (frekuensi term dalam dokumen) dan IDF (invers frekuensi dokumen yang memuat term). Memberikan bobot tinggi pada term yang sering muncul dalam dokumen tertentu namun jarang di seluruh corpus. Dalam penelitian ini: max_features=5.000, ngram_range=(1,2).\nFormula / Notasi:\nw(t,d) = tf(t,d) × idf(t) = [f(t,d)/Σf(t',d)] × log(N/df(t))",
  },
  {
    name: "Vector Space Model",
    english: "Vector Space Model",
    category: "Ekstraksi Fitur & Representasi Teks",
    source: "SK BAB II (Sarkar, 2016)",
    seealso: "TF-IDF, Feature Vector",
    definition:
      "Model representasi dokumen di mana setiap dokumen direpresentasikan sebagai vektor dalam ruang fitur multidimensional. Dalam penelitian ini, setiap pertanyaan medis direpresentasikan sebagai vektor berdimensi 5.000 (jumlah fitur TF-IDF).",
  },
  {
    name: "Accuracy",
    english: "Accuracy (Akurasi)",
    category: "Evaluasi & Metrik",
    source: "SK BAB II Persamaan 2.11 (Sarkar, 2016)",
    seealso: "F1-Macro, Class Imbalance, Baseline Acak",
    definition:
      "Metrik evaluasi yang mengukur proporsi prediksi yang benar dari total data yang dievaluasi. Dapat menyesatkan pada dataset dengan class imbalance — misalnya pada 107 kelas, baseline acak hanya 0,93%. Dalam penelitian ini: 44,75% = 48,1× lebih baik dari baseline acak.\nFormula / Notasi:\nAccuracy = (TP + TN) / (TP + FP + FN + TN)",
  },
  {
    name: "Baseline Acak",
    english: "Random Baseline",
    category: "Evaluasi & Metrik",
    source: "SK BAB IV",
    seealso: "Accuracy, Class Imbalance",
    definition:
      "Performa teoritis yang diharapkan dari model yang melakukan prediksi secara acak. Untuk 107 kelas, baseline acak = 1/107 ≈ 0,93%. Model LMPNN mencapai 44,75% accuracy — 48,1× lebih baik dari baseline acak, membuktikan model benar-benar belajar pola bermakna.\nFormula / Notasi:\nBaseline_random = 1/C = 1/107 ≈ 0,93%",
  },
  {
    name: "Class Imbalance",
    english: "Class Imbalance / Distribusi Kelas Tidak Seimbang",
    category: "Evaluasi & Metrik",
    source: "SK BAB I & IV",
    seealso: "F1-Macro, Stratified Split, Baseline Acak",
    definition:
      "Kondisi ketika distribusi sampel antar kelas tidak merata secara signifikan. Dalam penelitian ini: kelas terbesar ('menstruasi') memiliki 5.723 sampel, sementara kelas terkecil ('amandel') hanya 304 sampel. Memengaruhi pilihan metrik evaluasi (F1-macro lebih tepat dari accuracy).",
  },
  {
    name: "Confusion Matrix",
    english: "Confusion Matrix",
    category: "Evaluasi & Metrik",
    source: "SK BAB II Tabel 2.1 (Sarkar, 2016)",
    seealso: "Accuracy, Precision, Recall, F1-Score",
    definition:
      "Tabel yang memvisualisasikan kinerja model klasifikasi dengan membandingkan prediksi terhadap label aktual. Setiap baris = kelas aktual; setiap kolom = kelas prediksi. Elemen diagonal = prediksi benar. Dalam penelitian ini berukuran 107×107 — difokuskan pada 20 kelas terbesar.\nFormula / Notasi:\nMatriks M[i][j] = jumlah sampel kelas i yang diprediksi sebagai kelas j",
  },
  {
    name: "F1-Macro",
    english: "F1-Macro Average",
    category: "Evaluasi & Metrik",
    source: "SK BAB II & IV (Sokolova & Lapalme, 2009)",
    seealso: "F1-Score, F1-Weighted, Class Imbalance",
    definition:
      "Rata-rata aritmetika F1-score per kelas di mana setiap kelas mendapat bobot yang SAMA terlepas dari jumlah sampelnya. Lebih adil untuk dataset imbalanced karena kelas minoritas dievaluasi setara dengan kelas mayoritas. Digunakan sebagai metrik panduan utama dalam penelitian ini (45,48%).\nFormula / Notasi:\nF1_macro = (1/L) Σᵢ F1ᵢ",
  },
  {
    name: "F1-Score",
    english: "F1-Score",
    category: "Evaluasi & Metrik",
    source: "SK BAB II Persamaan 2.14 (Sarkar, 2016)",
    seealso: "Precision, Recall, F1-Macro",
    definition:
      "Harmonic mean dari Precision dan Recall — memberikan keseimbangan antara keduanya. Lebih sensitif terhadap perbedaan antar kelas daripada arithmetic mean. Digunakan sebagai metrik utama karena lebih informatif dari accuracy pada dataset imbalanced.\nFormula / Notasi:\nF1 = 2 × (Precision × Recall) / (Precision + Recall)",
  },
  {
    name: "F1-Weighted",
    english: "F1-Weighted Average",
    category: "Evaluasi & Metrik",
    source: "SK BAB IV (Sokolova & Lapalme, 2009)",
    seealso: "F1-Macro, F1-Score",
    definition:
      "Rata-rata F1-score per kelas dengan bobot PROPORSIONAL terhadap jumlah sampel per kelas. Kelas dengan sampel lebih banyak mendapat bobot lebih besar. Dalam penelitian ini: 44,82% (sedikit lebih rendah dari F1-macro = 45,48%) — mengonfirmasi model sedikit lebih baik pada kelas kecil.\nFormula / Notasi:\nF1_weighted = Σᵢ (nᵢ/N) × F1ᵢ",
  },
  {
    name: "False Negative",
    english: "FN (False Negative / Type II Error)",
    category: "Evaluasi & Metrik",
    source: "SK BAB II (Sarkar, 2016)",
    seealso: "False Positive, Recall",
    definition:
      "Jumlah sampel yang sebenarnya kelas positif NAMUN diprediksi salah sebagai kelas negatif. Disebut juga 'Type II Error' atau 'miss'.",
  },
  {
    name: "False Positive",
    english: "FP (False Positive / Type I Error)",
    category: "Evaluasi & Metrik",
    source: "SK BAB II (Sarkar, 2016)",
    seealso: "False Negative, Precision",
    definition:
      "Jumlah sampel yang sebenarnya kelas negatif NAMUN diprediksi salah sebagai kelas positif. Disebut juga 'Type I Error' atau 'false alarm'.",
  },
  {
    name: "Medically Valid Confusion",
    english: "Medically Valid Confusion Pattern",
    category: "Evaluasi & Metrik",
    source: "SK BAB IV",
    seealso: "Confusion Matrix, TF-IDF",
    definition:
      "Pola kesalahan klasifikasi model yang terjadi secara sistematis pada pasangan kelas yang berkaitan secara klinis, bukan secara acak. Misalnya: 'asam-lambung' salah diklasifikasi sebagai 'gangguan-pencernaan' — keduanya memang berbagi gejala yang serupa. Menunjukkan bahwa model mempelajari representasi medis yang bermakna.",
  },
  {
    name: "Precision",
    english: "Precision (Presisi)",
    category: "Evaluasi & Metrik",
    source: "SK BAB II Persamaan 2.12 (Sarkar, 2016)",
    seealso: "Recall, F1-Score",
    definition:
      "Mengukur seberapa banyak prediksi positif yang benar dari seluruh prediksi positif yang dibuat model. Precision tinggi = model jarang false positive.\nFormula / Notasi:\nPrecision = TP / (TP + FP)",
  },
  {
    name: "Recall",
    english: "Recall (Sensitivitas / Hit Rate)",
    category: "Evaluasi & Metrik",
    source: "SK BAB II Persamaan 2.13 (Sarkar, 2016)",
    seealso: "Precision, F1-Score",
    definition:
      "Mengukur seberapa banyak data aktual positif yang berhasil terdeteksi benar oleh model. Recall tinggi = model jarang melewatkan sampel positif (false negative). Dalam penelitian ini Recall-macro = 48,63%.\nFormula / Notasi:\nRecall = TP / (TP + FN)",
  },
  {
    name: "True Negative",
    english: "TN (True Negative)",
    category: "Evaluasi & Metrik",
    source: "SK BAB II (Sarkar, 2016)",
    seealso: "True Positive, False Positive, False Negative",
    definition:
      "Jumlah sampel yang benar-benar kelas negatif DAN diprediksi benar sebagai kelas negatif oleh model.",
  },
  {
    name: "True Positive",
    english: "TP (True Positive)",
    category: "Evaluasi & Metrik",
    source: "SK BAB II (Sarkar, 2016)",
    seealso: "True Negative, False Positive, False Negative",
    definition:
      "Jumlah sampel yang benar-benar kelas positif DAN diprediksi benar sebagai kelas positif oleh model.",
  },
  {
    name: "Aleatoric Uncertainty",
    english: "Aleatoric Uncertainty",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB II (P. Murphy, 2022)",
    seealso: "Epistemic Uncertainty, Medically Valid Confusion",
    definition:
      "Ketidakpastian yang merupakan variabilitas inheren/stokastik data — tidak dapat dihilangkan meskipun model diperbaiki. Terkait dengan tumpang tindih semantik antar kelas yang tinggi (seperti 'asam-lambung' vs 'gangguan-pencernaan').",
  },
  {
    name: "Calibration Set",
    english: "Calibration Set (X_calib)",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB III & IV (Vovk et al., 2005)",
    seealso: "Nonconformity Score, Exchangeability, Proper Training Set",
    definition:
      "Subset data yang dipisah dari training set dan digunakan KHUSUS untuk menghitung nonconformity scores sebagai referensi distribusi Conformal Prediction. Tidak boleh digunakan dalam training model. Asumsi exchangeability harus terpenuhi. Dalam penelitian ini: 19.456 sampel (24% total dataset).",
  },
  {
    name: "Confidence",
    english: "Confidence Score",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB II & IV (Angelopoulos & Bates, 2022)",
    seealso: "Credibility, P-value CP",
    definition:
      "1 minus P-value TERTINGGI KEDUA — mengukur margin keyakinan antara prediksi terbaik dan kelas pesaing terkuat. Confidence tinggi = kelas terprediksi sangat unggul dari alternatif lain. Dalam penelitian ini selisih confidence antara prediksi benar (0,554) dan salah (0,551) hanya 0,003 — tidak diskriminatif.\nFormula / Notasi:\nConfidence = 1 - p₂  (p₂ = p-value terbesar kedua)  |  rata-rata: 0,5523",
  },
  {
    name: "Conformal Prediction",
    english: "CP / Conformal Prediction",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB II (Vovk et al., 2005; Angelopoulos & Bates, 2022)",
    seealso: "P-value CP, Credibility, Confidence, Coverage Guarantee",
    definition:
      "Kerangka kerja statistik yang menghasilkan prediction set (bukan satu label tunggal) yang dijamin secara matematis mencakup label yang benar dengan tingkat kepercayaan tertentu (1-ε). Bersifat distribution-free dan model-agnostic. Dalam penelitian ini diintegrasikan dengan LMPNN sebagai teknik XAI.\nFormula / Notasi:\nP(Y_test ∈ C(X_test)) ≥ 1 - ε",
  },
  {
    name: "Coverage Guarantee",
    english: "Marginal Coverage Guarantee",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB II & IV (Vovk et al., 2005; Angelopoulos & Bates, 2022)",
    seealso: "Prediction Set, Significance Level, Calibration Set",
    definition:
      "Jaminan formal statistik bahwa prediction set yang dihasilkan akan mencakup label yang benar minimal (1-ε)×100% dari waktu. Bersifat distribution-free — berlaku tanpa asumsi distribusi data. Dalam penelitian ini: coverage empiris 89,61% pada ε=0,10 (target 90%, selisih hanya 0,39%).\nFormula / Notasi:\nP(Y_test ∈ Γ^ε(X_test)) ≥ 1 - ε  [distribution-free guarantee]",
  },
  {
    name: "Credibility",
    english: "Credibility Score",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB II & IV (Suyanto et al., 2022)",
    seealso: "P-value CP, Confidence, Coverage Guarantee",
    definition:
      "P-value TERTINGGI dari seluruh kelas kandidat — mengukur seberapa 'cocok' prediksi terbaik model dengan data kalibrasi. Credibility rendah → data uji kemungkinan outlier, tidak mirip kelas mana pun. Dalam penelitian ini: prediksi benar memiliki credibility rata-rata 0,6750 vs prediksi salah 0,5561 (selisih 0,119).\nFormula / Notasi:\nCredibility = max_y p(y)  |  rata-rata keseluruhan: 0,6093",
  },
  {
    name: "Epistemic Uncertainty",
    english: "Epistemic Uncertainty",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB II (P. Murphy, 2022)",
    seealso: "Aleatoric Uncertainty, Credibility",
    definition:
      "Ketidakpastian yang berasal dari kurangnya pengetahuan model — dapat dikurangi dengan data tambahan. Terkait dengan credibility rendah (model belum 'melihat' contoh serupa). Berbeda dengan aleatoric uncertainty.",
  },
  {
    name: "Exchangeability",
    english: "Exchangeability",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB II (Vovk et al., 2005)",
    seealso: "Coverage Guarantee, Calibration Set",
    definition:
      "Asumsi statistik yang disyaratkan Conformal Prediction agar coverage guarantee berlaku — data training, kalibrasi, dan uji harus dapat dipertukarkan urutannya tanpa mengubah distribusi gabungan (berasal dari distribusi yang sama dan independen). Dipenuhi dengan stratified split pada penelitian ini.",
  },
  {
    name: "Expected Calibration Error",
    english: "ECE",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB IV",
    seealso: "Reliability Diagram, Overconfidence, MCE",
    definition:
      "Metrik yang mengukur gap rata-rata antara probabilitas prediksi model dan akurasi aktual. Dalam penelitian ini ECE=0,2210 menunjukkan kalibrasi moderat — model cenderung overconfident pada credibility tinggi. Tidak membatalkan validitas coverage guarantee CP.",
  },
  {
    name: "Nonconformity Score",
    english: "Nonconformity Score (α)",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB II & III (Suyanto et al., 2022)",
    seealso: "Conformal Prediction, P-value CP, Calibration Set",
    definition:
      "Skor yang mengukur seberapa 'tidak sesuai' atau 'asing' suatu sampel dibandingkan distribusi data yang sudah dipelajari model. Dalam penelitian ini didefinisikan sebagai cosine distance antara sampel dan local mean vector kelasnya: α = CosDist(x, μc). Skor tinggi = sangat tidak sesuai.\nFormula / Notasi:\nα_i = CosDist(x_i, μ_{y_i}) = 1 - sim_cosine(x_i, μ_{y_i})",
  },
  {
    name: "Overconfidence",
    english: "Overconfidence",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB IV",
    seealso: "Reliability Diagram, ECE, Kalibrasi",
    definition:
      "Kondisi ketika model memberikan nilai kepercayaan (credibility/probability) yang lebih tinggi dari akurasi aktualnya. Dalam reliability diagram, titik-titik berada di BAWAH garis diagonal. Karakteristik umum model berbasis KNN.",
  },
  {
    name: "P-value Conformal Prediction",
    english: "p-value (dalam CP)",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB II Persamaan 2.7 (Suyanto et al., 2022; Vovk et al., 2005)",
    seealso: "Nonconformity Score, Credibility, Confidence",
    definition:
      "Ukuran probabilitas empiris yang mengindikasikan seberapa konsisten label kandidat y dengan distribusi data kalibrasi. P-value tinggi = data uji sangat mirip dengan pola kelas y. Digunakan untuk membangun prediction set dan menghitung credibility serta confidence.\nFormula / Notasi:\np(y) = |{i : α_i ≥ α_test}| / |Calibration Set|",
  },
  {
    name: "Prediction Set",
    english: "Prediction Set / Prediction Region (Γε)",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB II (Vovk et al., 2005)",
    seealso: "Coverage Guarantee, Credibility, Significance Level",
    definition:
      "Himpunan label yang dikembalikan Conformal Prediction untuk setiap data uji — berisi seluruh kelas dengan p-value di atas significance level ε. Menjamin coverage ≥ (1-ε). Bervariasi dari singleton (1 kelas) hingga seluruh kelas. Dalam penelitian ini rata-rata 9,5 kelas pada ε=0,10.\nFormula / Notasi:\nΓ^ε(x) = {y : p(y) > ε}",
  },
  {
    name: "Proper Training Set",
    english: "Proper Training Set (X_proper)",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB III",
    seealso: "Calibration Set, Data Splitting",
    definition:
      "Subset data yang digunakan khusus untuk melatih model LMPNN — terpisah dari calibration set dan test set. Dalam penelitian ini: 45.395 sampel (56% total dataset). Pemisahan ini adalah persyaratan fundamental Conformal Prediction.",
  },
  {
    name: "Reliability Diagram",
    english: "Reliability Diagram / Calibration Plot",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB IV",
    seealso: "ECE, MCE, Overconfidence, Kalibrasi",
    definition:
      "Visualisasi yang membandingkan predicted confidence model dengan empirical accuracy aktual. Garis diagonal = perfect calibration. Deviasi ke bawah = overconfident; deviasi ke atas = underconfident. Dalam penelitian ini menunjukkan gejala overconfidence pada rentang credibility tinggi.",
  },
  {
    name: "Significance Level",
    english: "Significance Level (ε / Epsilon)",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB II (Suyanto et al., 2022)",
    seealso: "Coverage Guarantee, Prediction Set",
    definition:
      "Parameter yang ditentukan pengguna yang merepresentasikan batas toleransi kesalahan maksimal yang diizinkan untuk prediction set. Tingkat kepercayaan = (1-ε). Dalam penelitian ini ε=0,10 → kepercayaan 90%. Nilai ε kecil → coverage lebih tinggi tapi prediction set lebih besar.\nFormula / Notasi:\nConfidence Level = 1 - ε  (ε=0,10 → 90% confidence)",
  },
  {
    name: "Singleton Rate",
    english: "Singleton Prediction Rate",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB IV",
    seealso: "Prediction Set, Credibility",
    definition:
      "Persentase prediction set yang hanya berisi satu kelas — menunjukkan prediksi yang paling meyakinkan. Dalam penelitian ini singleton rate = 3,7% pada ε=0,10. Nilai kecil karena extreme multiclass 107 kelas memiliki tingkat ambiguitas tinggi.",
  },
  {
    name: "Uncertainty Quantification",
    english: "UQ / Uncertainty Quantification",
    category: "Conformal Prediction & Uncertainty",
    source: "SK BAB I & II (Suyanto et al., 2022)",
    seealso: "Conformal Prediction, Credibility, Epistemic Uncertainty",
    definition:
      "Kemampuan model untuk mengukur dan mengkomunikasikan tingkat ketidakpastian dalam prediksinya. Dalam penelitian ini diimplementasikan melalui Conformal Prediction yang menghasilkan credibility dan confidence score. Membuat sistem 'aware' terhadap ketidakpastiannya sendiri.",
  },
  {
    name: "CSR Format",
    english: "Compressed Sparse Row (CSR)",
    category: "Implementasi & Tools",
    source: "SK BAB IV (SciPy)",
    seealso: "Sparse Matrix, Sparsity",
    definition:
      "Format penyimpanan sparse matrix yang efisien dengan hanya menyimpan elemen non-zero. Matriks TF-IDF 81.064×5.000 dengan sparsity 99,55% hanya membutuhkan ~7 MB dalam format CSR, dibanding ~3 GB untuk dense matrix.",
  },
  {
    name: "CuPy",
    english: "CuPy",
    category: "Implementasi & Tools",
    source: "SK BAB III",
    seealso: "NumPy, GPU, Tesla T4",
    definition:
      "Library Python yang menyediakan operasi array mirip NumPy namun dieksekusi pada GPU (CUDA). Digunakan sebagai akselerasi GPU untuk perhitungan cosine similarity berskala besar (81.064 × 5.000) pada LMPNN. Optional dengan fallback ke NumPy.",
  },
  {
    name: "JobLib",
    english: "JobLib",
    category: "Implementasi & Tools",
    source: "SK BAB III",
    seealso: "Reproducibility, Pickle",
    definition:
      "Library Python untuk penyimpanan (serialization) objek Python besar secara efisien dalam format .pkl (pickle). Digunakan untuk menyimpan class_means_ LMPNN, TfidfVectorizer, LabelEncoder, dan conformity scores agar dapat digunakan kembali tanpa retraining.",
  },
  {
    name: "Kaggle Notebook",
    english: "Kaggle Notebook",
    category: "Implementasi & Tools",
    source: "SK BAB III",
    seealso: "Tesla T4, Reproducibility, GPU",
    definition:
      "Platform cloud computing berbasis notebook Jupyter yang menyediakan GPU gratis dan terintegrasi dengan dataset Kaggle. Digunakan sebagai lingkungan implementasi penelitian ini dengan spesifikasi: Intel Xeon 2.20GHz, 30 GiB RAM, NVIDIA Tesla T4 ×2, sesi 12 jam.",
  },
  {
    name: "LabelEncoder",
    english: "Label Encoder",
    category: "Implementasi & Tools",
    source: "SK BAB III",
    seealso: "Scikit-learn, JobLib",
    definition:
      "Tool scikit-learn yang mengkonversi label kelas tekstual (e.g., 'cacar-air', 'hiv') menjadi representasi integer (0, 1, 2, ..., 106) untuk pemrosesan model. Disimpan dalam format .pkl untuk konsistensi encoding saat prediksi.",
  },
  {
    name: "NLTK",
    english: "Natural Language Toolkit",
    category: "Implementasi & Tools",
    source: "SK BAB III",
    seealso: "Tokenization, PySastrawi",
    definition:
      "Library Python untuk NLP yang menyediakan tools tokenization, stemming, dan pemrosesan bahasa alami. Dalam penelitian ini digunakan khususnya untuk tokenization (word_tokenize).",
  },
  {
    name: "NumPy",
    english: "NumPy",
    category: "Implementasi & Tools",
    source: "SK BAB III",
    seealso: "CuPy, SciPy, LMPNN",
    definition:
      "Library Python fundamental untuk komputasi numerik dan operasi array/matriks. Digunakan sebagai backbone implementasi LMPNN from scratch untuk operasi matrix multiplication dan cosine similarity computation. Versi: 2.0.2.",
  },
  {
    name: "Pickle",
    english: ".pkl (Pickle Format)",
    category: "Implementasi & Tools",
    source: "SK BAB III",
    seealso: "JobLib, Reproducibility",
    definition:
      "Format serialisasi objek Python yang memungkinkan penyimpanan dan pemulihan objek kompleks (model, vectorizer, dll.) ke/dari disk. Dalam penelitian ini digunakan untuk menyimpan class_means_ LMPNN (prototipe kelas), TF-IDF vectorizer, LabelEncoder, dan nonconformity scores.",
  },
  {
    name: "PySastrawi",
    english: "PySastrawi",
    category: "Implementasi & Tools",
    source: "SK BAB III (Arifin et al., 2009)",
    seealso: "Stemming, Stopword Removal, Enhanced Confix Stripping",
    definition:
      "Library Python open source untuk NLP Bahasa Indonesia, menyediakan implementasi Enhanced Confix Stripping (ECS) stemmer dan daftar stopwords bahasa Indonesia (809 kata). Digunakan dalam pipeline preprocessing penelitian ini.",
  },
  {
    name: "Random State",
    english: "Random State / Random Seed",
    category: "Implementasi & Tools",
    source: "SK BAB III",
    seealso: "Reproducibility, Stratified Split",
    definition:
      "Parameter yang menetapkan 'benih' generator angka acak sehingga hasil proses yang melibatkan randomness (seperti train-test split) menjadi identik setiap kali dijalankan. Penelitian ini menggunakan random_state=42 secara konsisten.\nFormula / Notasi:\nrandom_state = 42",
  },
  {
    name: "Regex",
    english: "Regular Expression (Regex)",
    category: "Implementasi & Tools",
    source: "SK BAB III",
    seealso: "Cleaning, Preprocessing Pipeline",
    definition:
      "Pola teks formal yang digunakan untuk mencari, mencocokkan, dan memanipulasi string. Digunakan dalam tahap cleaning preprocessing untuk menghapus URL, mention (@), hashtag (#), angka, dan karakter khusus dari teks. Implementasi melalui Python re module.",
  },
  {
    name: "Reproducibility",
    english: "Reproducibility",
    category: "Implementasi & Tools",
    source: "SK BAB III",
    seealso: "Open Science, Random State, JobLib",
    definition:
      "Kemampuan penelitian untuk menghasilkan hasil yang identik ketika diulang oleh peneliti lain dengan kondisi yang sama. Dijamin melalui: random_state=42 pada seluruh split, versi library terdokumentasi, notebook publik di Kaggle, dan model tersimpan dalam format .pkl.",
  },
  {
    name: "Scikit-learn",
    english: "scikit-learn (sklearn)",
    category: "Implementasi & Tools",
    source: "SK BAB III",
    seealso: "TF-IDF, Cross-Validation",
    definition:
      "Library machine learning Python paling populer, menyediakan implementasi berbagai algoritma ML, tools preprocessing, evaluasi, dan feature extraction. Dalam penelitian ini digunakan untuk TF-IDF Vectorizer, LabelEncoder, metrik evaluasi, dan cross-validation. Versi: 1.6.1.",
  },
  {
    name: "Tesla T4",
    english: "NVIDIA Tesla T4",
    category: "Implementasi & Tools",
    source: "SK BAB III",
    seealso: "CuPy, Kaggle Notebook, GPU",
    definition:
      "GPU (Graphics Processing Unit) NVIDIA yang digunakan dalam penelitian ini melalui Kaggle Notebook. Memiliki 16 GB VRAM per unit (×2 unit). Digunakan untuk akselerasi perhitungan matrix multiplication cosine similarity pada CuPy.",
  },
  {
    name: "Distribution-free",
    english: "Distribution-free / Non-parametric",
    category: "Statistik & Matematika",
    source: "SK BAB II (Vovk et al., 2005)",
    seealso: "Conformal Prediction, Coverage Guarantee, Exchangeability",
    definition:
      "Sifat metode statistik yang tidak memerlukan asumsi tentang bentuk distribusi data. Conformal Prediction bersifat distribution-free — coverage guarantee berlaku tanpa memandang apakah data terdistribusi normal, skewed, atau bentuk lainnya.",
  },
  {
    name: "Harmonic Mean",
    english: "Harmonic Mean",
    category: "Statistik & Matematika",
    source: "SK BAB II",
    seealso: "F1-Score, Precision, Recall",
    definition:
      "Jenis rata-rata yang dihitung sebagai kebalikan dari rata-rata aritmetika dari kebalikan nilai-nilai. Digunakan dalam F1-score karena lebih sensitif terhadap nilai kecil — jika Precision atau Recall rendah, F1-score juga akan rendah meski yang lain tinggi.\nFormula / Notasi:\nHM = n / Σᵢ(1/xᵢ)",
  },
  {
    name: "KDE",
    english: "Kernel Density Estimation",
    category: "Statistik & Matematika",
    source: "SK BAB IV",
    seealso: "Credibility, Confidence",
    definition:
      "Metode statistik non-parametrik untuk estimasi fungsi kepadatan probabilitas dari data kontinu. Digunakan dalam visualisasi distribusi credibility dan confidence score untuk memperlihatkan perbedaan distribusi antara prediksi benar dan salah.",
  },
  {
    name: "Right-skewed Distribution",
    english: "Right-skewed / Positively Skewed",
    category: "Statistik & Matematika",
    source: "SK BAB IV",
    seealso: "Credibility",
    definition:
      "Distribusi data dengan ekor panjang di sisi kanan — mayoritas data terkonsentrasi di kiri namun ada outlier di kanan. Distribusi credibility untuk prediksi benar menunjukkan pola right-skewed dengan konsentrasi pada rentang 0,7–1,0.",
  },
  {
    name: "Unimodal Distribution",
    english: "Unimodal Distribution",
    category: "Statistik & Matematika",
    source: "SK BAB IV",
    seealso: "Nonconformity Score, Calibration Set",
    definition:
      "Distribusi data yang memiliki satu puncak (modus) tunggal. Distribusi nonconformity scores pada calibration set penelitian ini menunjukkan pola unimodal yang mendekati distribusi normal dengan konsentrasi utama pada rentang 0,6–0,9.",
  },
  {
    name: "Alodokter",
    english: "Alodokter",
    category: "Dataset & Data Management",
    source: "SK BAB III",
    seealso: "Indonesia QnA Health Dataset",
    definition:
      "Platform kesehatan digital Indonesia (alodokter.com) yang menjadi sumber data asli dari Indonesia QnA Health Dataset. Menyediakan layanan tanya jawab antara pengguna dengan dokter terverifikasi, menghasilkan pertanyaan-pertanyaan medis berbahasa Indonesia yang autentik.",
  },
  {
    name: "Data Splitting",
    english: "Data Splitting / Pembagian Data",
    category: "Dataset & Data Management",
    source: "SK BAB III & IV",
    seealso: "Stratified Split, Calibration Set, Proper Training Set",
    definition:
      "Proses pembagian dataset menjadi beberapa subset untuk tujuan berbeda. Penelitian ini menggunakan tiga subset: Proper Training (56%) untuk melatih LMPNN, Calibration (24%) untuk CP, dan Testing (20%) untuk evaluasi akhir. Dilakukan dua tahap dengan stratified split.\nFormula / Notasi:\nSplit 1: 80:20 (train+calib : test) | Split 2: 70:30 (proper_train : calib)",
  },
  {
    name: "Deduplication",
    english: "Deduplication / Drop Duplikat",
    category: "Dataset & Data Management",
    source: "SK BAB IV",
    seealso: "Filtering, Preprocessing",
    definition:
      "Proses penghapusan baris data yang identik berdasarkan kolom tertentu. Dalam penelitian ini, 158 duplikat dihapus berdasarkan kolom TEXT_CLEAN (teks setelah preprocessing) untuk memastikan integritas dataset.",
  },
  {
    name: "Exploratory Data Analysis",
    english: "EDA",
    category: "Dataset & Data Management",
    source: "SK BAB IV",
    seealso: "Dataset, Class Imbalance, Missing Values",
    definition:
      "Tahap analisis awal untuk memahami karakteristik dataset sebelum modeling — meliputi distribusi kelas, statistik deskriptif, analisis missing values, dan distribusi panjang teks. Dalam penelitian ini didokumentasikan di Lampiran E.",
  },
  {
    name: "Filtering",
    english: "Data Filtering",
    category: "Dataset & Data Management",
    source: "SK BAB III",
    seealso: "Class Imbalance, Threshold",
    definition:
      "Proses penyaringan dataset berdasarkan kriteria tertentu. Dalam penelitian ini: hanya kelas dengan minimal 300 sampel yang digunakan (threshold minimum untuk stabilitas LMPNN). Hasilnya: 81.064 sampel dari 107 kelas (28,1% dari data raw).",
  },
  {
    name: "Indonesia QnA Health Dataset",
    english: "Indonesia QnA Health Dataset",
    category: "Dataset & Data Management",
    source: "SK BAB III (Samudra, 2025)",
    seealso: "Filtering, Class Imbalance, Alodokter",
    definition:
      "Dataset publik yang tersedia di platform Kaggle (user: gufranakasamudra) berisi data tanya jawab medis dari platform Alodokter. Statistik: 288.105 baris raw, 46.617 kelas unik, bahasa Indonesia. Setelah filtering ≥300 sampel/kelas: 81.064 sampel, 107 kelas medis, format CSV.",
  },
  {
    name: "KDD Process",
    english: "Knowledge Discovery in Databases (KDD)",
    category: "Dataset & Data Management",
    source: "SK BAB III (Fayyad et al., 1996)",
    seealso: "Preprocessing Pipeline, Metodologi",
    definition:
      "Kerangka metodologi penelitian yang digunakan dalam penelitian ini, terdiri dari tahapan: Data Collection → Data Preprocessing → Feature Extraction → Data Splitting → Model Training → Model Evaluation → Explainability Analysis → Interpretation & Validation → Documentation. Dikembangkan oleh Fayyad et al. (1996).",
  },
  {
    name: "Missing Values",
    english: "Missing Values / Data Hilang",
    category: "Dataset & Data Management",
    source: "SK BAB IV",
    seealso: "EDA, Dataset",
    definition:
      "Elemen data yang tidak tersedia atau tidak tercatat dalam dataset. Analisis EDA pada penelitian ini menunjukkan bahwa dataset Indonesia QnA Health Dataset tidak memiliki missing values pada kolom mana pun (0,0% missing) — dataset bersih.",
  },
  {
    name: "Threshold",
    english: "Threshold / Ambang Batas",
    category: "Dataset & Data Management",
    source: "SK BAB III & V",
    seealso: "Filtering, Significance Level",
    definition:
      "Nilai batas yang digunakan sebagai kriteria keputusan. Dalam penelitian ini memiliki beberapa arti: (1) Threshold 300 sampel/kelas untuk filtering; (2) Threshold ε=0,10 sebagai significance level CP; (3) Credibility threshold 0,3 untuk identifikasi prediksi yang perlu review manual (saran BAB V).",
  },
];
