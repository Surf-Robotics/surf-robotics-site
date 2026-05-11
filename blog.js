// === SURF ROBOTICS — BLOG JS ===

// --- FILTER ---
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-grid .blog-card');
const featuredPost = document.querySelector('.featured-post');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    blogCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // Show/hide featured post
    if (featuredPost) {
      const featuredCat = featuredPost.dataset.category;
      featuredPost.style.display = (filter === 'all' || featuredCat === filter) ? '' : 'none';
    }
  });
});

// --- POST CONTENT ---
const posts = {
  'post-mecanum': {
    tag: 'Build Season',
    date: 'May 2, 2026',
    author: 'SURF Team',
    readTime: '1 min read',
    title: "Finalizing our name, why we chose SURF.",
    content: `
      <p>Why did we choose SURF?</p>
      <h4>The Problem With Other Names</h4>
      <p>(to continue)
  },
  'post-this is just a template to use for actual stuff': {
    tag: 'Template',
    date: 'Date: Idk',
    author: 'SURF Team',
    readTime: 'quick read',
    title: 'Just a template',
    content: `
      <p> Insert text here.</p>
    `
  
};

// --- MODAL ---
const postModal = document.getElementById('postModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

function openPost(postId) {
  const post = posts[postId];
  if (!post) return;

  modalBody.innerHTML = `
    <span class="blog-tag">${post.tag}</span>
    <h2>${post.title}</h2>
    <div class="post-meta">
      <span>${post.author}</span>
      <span>${post.date}</span>
      <span>${post.readTime}</span>
    </div>
    ${post.content}
  `;
  postModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  postModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', () => openPost(btn.dataset.post));
});

modalClose && modalClose.addEventListener('click', closeModal);
modalOverlay && modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
