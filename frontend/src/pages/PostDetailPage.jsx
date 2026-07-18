import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../components/AuthContext";
import CommentSection from "../components/CommentSection";
import Loader from "../components/Loader";
import { formatDate } from "../utils/validators";
import "../styles/PostDetail.css";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        console.error("Failed to load post", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!user) return navigate("/login");
    setLiking(true);
    try {
      const { data } = await api.put(`/posts/${id}/like`);
      setPost({ ...post, likes: data.likes });
    } catch (err) {
      console.error("Failed to like post", err);
    } finally {
      setLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;
    try {
      await api.delete(`/posts/${id}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  if (loading) return <Loader />;
  if (!post) return <p className="empty-state">Post not found.</p>;

  const isAuthor = user?._id === post.author?._id;
  const isLiked = post.likes?.includes(user?._id);

  return (
    <div className="page-container post-detail">
      {post.coverImage?.url && (
        <img src={post.coverImage.url} alt={post.title} className="post-detail-cover" />
      )}

      <div className="post-detail-tags">
        {post.tags?.map((tag) => (
          <Link key={tag} to={`/?tag=${tag}`} className="post-card-tag">
            {tag}
          </Link>
        ))}
      </div>

      <h1 className="post-detail-title">{post.title}</h1>

      <div className="post-detail-meta">
        <Link to={`/profile/${post.author?._id}`} className="post-detail-author">
          {post.author?.avatar?.url ? (
            <img src={post.author.avatar.url} alt={post.author.name} className="post-detail-avatar" />
          ) : (
            <div className="post-detail-avatar-placeholder">
              {post.author?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <span>{post.author?.name}</span>
        </Link>
        <span className="post-detail-date">{formatDate(post.createdAt)}</span>
      </div>

      <div className="post-detail-actions">
        <button className={`like-btn ${isLiked ? "liked" : ""}`} onClick={handleLike} disabled={liking}>
          ❤ {post.likes?.length || 0}
        </button>

        {isAuthor && (
          <div className="owner-actions">
            <button onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
            <button className="danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="post-detail-content">
        {post.content.split("\n").map((paragraph, idx) =>
          paragraph.trim() ? <p key={idx}>{paragraph}</p> : null
        )}
      </div>

      <CommentSection postId={post._id} />
    </div>
  );
};

export default PostDetailPage;
