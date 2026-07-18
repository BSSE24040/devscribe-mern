import { useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "./AuthContext";
import { formatDate } from "../utils/validators";
import "../styles/CommentSection.css";

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await api.get(`/comments/${postId}`);
        setComments(data);
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);
    setError("");
    try {
      const { data } = await api.post(`/comments/${postId}`, { text });
      setComments([data, ...comments]);
      setText("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <div className="comment-section">
      <h3 className="comment-heading">{comments.length} Comments</h3>

      {user ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
          />
          {error && <p className="comment-error">{error}</p>}
          <button type="submit" disabled={submitting}>
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <p className="comment-login-prompt">Log in to join the discussion.</p>
      )}

      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            {comment.author?.avatar?.url ? (
              <img src={comment.author.avatar.url} alt={comment.author.name} className="comment-avatar" />
            ) : (
              <div className="comment-avatar-placeholder">
                {comment.author?.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}

            <div className="comment-content">
              <div className="comment-meta">
                <span className="comment-author">{comment.author?.name || "Unknown"}</span>
                <span className="comment-date">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="comment-text">{comment.text}</p>

              {user?._id === comment.author?._id && (
                <button className="comment-delete-btn" onClick={() => handleDelete(comment._id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
