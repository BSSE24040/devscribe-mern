import { Link } from "react-router-dom";
import { formatDate, truncateText } from "../utils/validators";
import "../styles/PostCard.css";

const PostCard = ({ post }) => {
  return (
    <Link to={`/posts/${post._id}`} className="post-card">
      {post.coverImage?.url && (
        <img src={post.coverImage.url} alt={post.title} className="post-card-image" />
      )}

      <div className="post-card-body">
        <div className="post-card-tags">
          {post.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="post-card-tag">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{truncateText(post.content.replace(/[#*_`>-]/g, ""), 120)}</p>

        <div className="post-card-footer">
          <span className="post-card-author">{post.author?.name || "Unknown"}</span>
          <span className="post-card-dot">&middot;</span>
          <span className="post-card-date">{formatDate(post.createdAt)}</span>
          <span className="post-card-dot">&middot;</span>
          <span className="post-card-likes">❤ {post.likes?.length || 0}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
