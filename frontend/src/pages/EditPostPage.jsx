import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Loader from "../components/Loader";
import "../styles/PostForm.css";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags.join(", "));
        setPreview(data.coverImage?.url || "");
      } catch (err) {
        setError("Failed to load post");
      } finally {
        setFetching(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      return setError("Title and content are required");
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", tags);
      if (coverImage) formData.append("coverImage", coverImage);

      const { data } = await api.put(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Loader />;

  return (
    <div className="page-container">
      <div className="post-form-card">
        <h1>Edit post</h1>

        <form onSubmit={handleSubmit} className="post-form">
          <label>
            Cover Image
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          {preview && <img src={preview} alt="Preview" className="post-form-preview" />}

          <label>
            Title
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <label>
            Tags (comma-separated)
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
          </label>

          <label>
            Content
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={14} />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
