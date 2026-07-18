import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/api";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import "../styles/Home.css";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag") || "";

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeTag) params.tag = activeTag;
        if (searchTerm) params.search = searchTerm;

        const { data } = await api.get("/posts", { params });
        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [activeTag, searchTerm]);

  // Collect the unique tags present across loaded posts for the filter bar
  const allTags = [...new Set(posts.flatMap((p) => p.tags))];

  const clearTagFilter = () => setSearchParams({});

  return (
    <div className="page-container">
      <section className="hero">
        <h1>Share what you build.</h1>
        <p>Read and write articles from developers around the world.</p>
        <input
          type="text"
          className="hero-search"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      {allTags.length > 0 && (
        <div className="tag-filter-bar">
          {activeTag && (
            <button className="tag-pill active" onClick={clearTagFilter}>
              #{activeTag} ✕
            </button>
          )}
          {!activeTag &&
            allTags.slice(0, 8).map((tag) => (
              <button key={tag} className="tag-pill" onClick={() => setSearchParams({ tag })}>
                #{tag}
              </button>
            ))}
        </div>
      )}

      {loading ? (
        <Loader />
      ) : posts.length === 0 ? (
        <p className="empty-state">No posts found. Be the first to write one!</p>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
