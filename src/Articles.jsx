import React, { useState } from "react";
import "./index.css"; // Make sure to create and import the CSS file

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    if (!allowedFile(file)) {
      setError(
        "Invalid file type. Only .txt, .pdf, .docx, .jpg, .jpeg, .png are allowed."
      );
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size should not exceed 10MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://ajani-backend-5oot.onrender.com/articles",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("Document uploaded and article created successfully!");
        setTitle("");
        setContent("");
        setAuthor("");
        setFile(null);

        setTimeout(() => setMessage(""), 3000);
      } else {
        throw new Error("Error uploading document. Please try again.");
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const allowedFile = (file) => {
    const allowedExtensions = ["txt", "pdf", "docx", "jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };

  return (
    <div className="document-upload-container">
      <h2 className="document-upload-title">Upload Your Article Here </h2>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

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

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`submit-btn ${loading ? "loading" : ""}`}
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpload;
