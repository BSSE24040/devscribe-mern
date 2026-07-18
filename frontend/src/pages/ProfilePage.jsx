import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../components/AuthContext";
import Loader from "../components/Loader";
import "../styles/Profile.css";

const ProfilePage = () => {
  const { id } = useParams();
  const { user, updateUser } = useAuth();

  // If no :id param, we're viewing our own profile
  const isOwnProfile = !id || id === user?._id;
  const profileId = id || user?._id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) return;
      setLoading(true);
      try {
        const { data } = await api.get(`/users/${profileId}`);
        setProfile(data);
        setName(data.name);
        setBio(data.bio || "");
        setPreview(data.avatar?.url || "");
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [profileId]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      if (avatarFile) formData.append("avatar", avatarFile);

      const { data } = await api.put("/users/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      updateUser(data);
      setProfile(data);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!profile) return <p className="empty-state">Profile not found.</p>;

  return (
    <div className="page-container">
      <div className="profile-card">
        {editing ? (
          <form onSubmit={handleSave} className="profile-edit-form">
            <div className="profile-avatar-edit">
              {preview ? (
                <img src={preview} alt={name} className="profile-avatar-large" />
              ) : (
                <div className="profile-avatar-placeholder-large">{name.charAt(0).toUpperCase()}</div>
              )}
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>

            <label>
              Name
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
              Bio
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} maxLength={200} />
            </label>

            {error && <p className="auth-error">{error}</p>}

            <div className="profile-edit-actions">
              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" className="cancel" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            {profile.avatar?.url ? (
              <img src={profile.avatar.url} alt={profile.name} className="profile-avatar-large" />
            ) : (
              <div className="profile-avatar-placeholder-large">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}

            <h1 className="profile-name">{profile.name}</h1>
            {profile.bio && <p className="profile-bio">{profile.bio}</p>}

            {isOwnProfile && (
              <button className="profile-edit-btn" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
