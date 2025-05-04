import React, { useState, useEffect } from "react";
import "./index.css";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [toast, setToast] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: "", message: "" }), 3000);
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        "https://ajani-backend-5oot.onrender.com/articles"
      );
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      showToast("error", "Error fetching articles");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);

  const allowedFile = (file) => {
    const allowedExtensions = ["txt", "pdf", "docx", "jpg", "jpeg", "png"];
    const ext = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(ext);
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setAuthor("");
    setFile(null);
    setEditingArticle(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author) {
      showToast("error", "All fields are required");
      return;
    }

    setLoading(true);

    try {
      if (editingArticle) {
        const res = await fetch(
          `https://ajani-backend-5oot.onrender.com/articles/${editingArticle.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, author }),
          }
        );
        if (!res.ok) throw new Error("Failed to update article");

        showToast("success", "Article updated successfully!");
        clearForm();
      } else {
        if (!file) return showToast("error", "Please select a file to upload");

        if (!allowedFile(file)) {
          return showToast("error", "Invalid file type.");
        }

        if (file.size > 10 * 1024 * 1024) {
          return showToast("error", "File size should not exceed 10MB.");
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", author);

        const res = await fetch(
          "https://ajani-backend-5oot.onrender.com/articles",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) throw new Error("Upload failed");

        showToast("success", "Article uploaded successfully!");
        clearForm();
      }

      fetchArticles();
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://ajani-backend-5oot.onrender.com/articles/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Delete failed");

      showToast("success", "Article deleted successfully");
      fetchArticles();
    } catch (err) {
      showToast("error", err.message);
    }
  };

  const startEditing = (article) => {
    setTitle(article.title);
    setContent(article.content);
    setAuthor(article.author);
    setEditingArticle(article);
  };

  const cancelEditing = () => {
    clearForm();
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <>
      <div className="document-upload-container">
        <div className="form-container">
          <h2 className="document-upload-title">
            {editingArticle ? "Edit Article" : "Upload Your Article"}
          </h2>

          {toast.message && (
            <div className={`toast ${toast.type}`}>{toast.message}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">
                Summary
              </label>
              <textarea
                id="content"
                value={content}
                onChange={handleContentChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={handleAuthorChange}
                required
                className="form-input"
              />
            </div>

            {!editingArticle && (
              <div className="form-group">
                <label htmlFor="file" className="form-label">
                  Choose Document
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  required
                  className="form-input"
                />
              </div>
            )}

            <div className="button-group">
              <button type="submit" disabled={loading} className="submit-btn">
                {loading
                  ? "Processing..."
                  : editingArticle
                  ? "Update Article"
                  : "Upload Document"}
              </button>
              {editingArticle && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="cancel-btn"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="document-upload-container">
        <div className="articles-container">
          <h2 className="document-upload-title">Uploaded Articles</h2>
          {currentArticles.length > 0 ? (
            <>
              <div className="cards-wrapper">
                {currentArticles.map((article) => (
                  <div key={article.id} className="article-card">
                    <h4 className="article-title">{article.title}</h4>
                    <p className="article-content">{article.content}</p>
                    <p className="article-author">
                      <em>By: {article.author}</em>
                    </p>
                    <div className="button-group">
                      <button
                        onClick={() => startEditing(article)}
                        className="submit-btn edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="submit-btn delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>No articles uploaded yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DocumentUpload;
