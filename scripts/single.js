const blogContent = document.getElementById("blog-content");
const HASHNODE_API = "https://gql.hashnode.com";
const PUBLICATION_HOST = "beyonggoodbyes.hashnode.dev"; // change to yours

const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");

if (!slug) {
  blogContent.innerHTML = "<p>Invalid blog post.</p>";
} else {
  const query = `
    query GetPost($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          title
          content { html }
          coverImage { url }
        }
      }
    }
  `;

  fetch(HASHNODE_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { host: PUBLICATION_HOST, slug } }),
  })
    .then((res) => res.json())
    .then((data) => {
      const post = data.data.publication.post;
      blogContent.innerHTML = `
        <h1 class="text-3xl font-bold text-primary mb-6">${post.title}</h1>
        ${
          post.coverImage?.url
            ? `<img src="${post.coverImage.url}" class="w-full rounded-lg mb-8 object-cover" />`
            : ""
        }
        <div class="prose max-w-none text-gray-700 leading-relaxed">${post.content.html}</div>
      `;
    })
    .catch((err) => {
      console.error(err);
      blogContent.innerHTML = `<p class="text-red-600">Failed to load blog.</p>`;
    });
}
