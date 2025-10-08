const blogContainer = document.getElementById("blog-container");
const HASHNODE_API = "https://gql.hashnode.com";
const PUBLICATION_HOST = "beyonggoodbyes.hashnode.dev"; // fixed typo

const query = `
  query GetPosts($host: String!) {
    publication(host: $host) {
      posts(first: 9) {
        edges {
          node {
            title
            brief
            slug
            coverImage { url }
            content {
              html
            }
          }
        }
      }
    }
  }
`;

fetch(HASHNODE_API, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query, variables: { host: PUBLICATION_HOST } }),
})
  .then((res) => res.json())
  .then((data) => {
    const publication = data?.data?.publication;
    if (!publication) {
      throw new Error("Invalid publication host or no posts found.");
    }

    const posts = publication.posts.edges;

    blogContainer.innerHTML = posts
      .map((post) => {
        const node = post.node;

        // 1️⃣ Prefer the cover image if available
        let imageUrl = node.coverImage?.url;

        // 2️⃣ If not, extract the first image from the blog content
        if (!imageUrl && node.content?.html) {
          const imgMatch = node.content.html.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) imageUrl = imgMatch[1];
        }

        // 3️⃣ If still no image, you can keep a fallback
        if (!imageUrl) {
          imageUrl = "https://via.placeholder.com/600x400?text=Blog+Image";
        }

        return `
          <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <img src="${imageUrl}" alt="${node.title}" class="w-full h-56 object-cover">
            <div class="p-6">
              <h2 class="text-xl font-semibold text-primary mb-3">${node.title}</h2>
              <p class="text-gray-600 mb-4 text-sm leading-relaxed">${node.brief}</p>
              <a href="blog.html?slug=${node.slug}" class="text-primary font-medium hover:underline">Read More →</a>
            </div>
          </div>
        `;
      })
      .join("");
  })
  .catch((err) => {
    console.error(err);
    blogContainer.innerHTML = `<p class="text-red-600 text-center">Failed to load blogs. Please try again later.</p>`;
  });
