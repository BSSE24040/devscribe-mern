import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Loader from "../components/Loader";
import { formatDate } from "../utils/validators";
import "../styles/Dashboard.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const { data } = await api.get("/posts/me/mine");
        setPosts(data);
      } catch (err) {
        console.error("Failed to load your posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post permanently?")) return;
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>My Posts</h1>
        <Link to="/create" className="dashboard-new-btn">
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="empty-state">
          You haven't written anything yet. <Link to="/create">Write your first post</Link>.
        </p>
      ) : (
        <div className="dashboard-list">
          {posts.map((post) => (
            <div key={post._id} className="dashboard-item">
              <div>
                <Link to={`/posts/${post._id}`} className="dashboard-item-title">
                  {post.title}
                </Link>
                <p className="dashboard-item-meta">
                  {formatDate(post.createdAt)} &middot; ❤ {post.likes?.length || 0}
                </p>
              </div>
              <div className="dashboard-item-actions">
                <button onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
                <button className="danger" onClick={() => handleDelete(post._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
