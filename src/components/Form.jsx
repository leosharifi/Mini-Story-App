import "./Form.css";
import { useState, useEffect } from "react";

export default function Form() {
  <title>Mini-Story</title>;

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");

  const [story, setStory] = useState(() => {
    const saved = localStorage.getItem("story");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("story", JSON.stringify(story));
  }, [story]);

  function generateStory() {
    if (!author.trim() || !title.trim() || !date.trim() || !details.trim())
      return;
    const newEntry = { author, title, date, details };
    setStory([...story, newEntry]);
    setAuthor("");
    setTitle("");
    setDate("");
    setDetails("");
  }

  function edit(index) {
    setEditingIndex(index);
  }

  function deleteStory(index) {
    const newStory = story.filter((_, i) => i !== index);
    setStory(newStory);
  }

  return (
    <div className="form-root">
      <div className="form-card">
        {/* App Name */}
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Mini-Story-App
        </h1>

        {/* Inputs + Generate Button */}
        <div className="form-controls">
          <div className="form-inputs">
            <input
              className="input-main"
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              className="input-main"
              type="text"
              placeholder="Story Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="input-main"
              type="date"
              placeholder="Story Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <textarea
              className="input-main story-detail"
              placeholder="Story Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={generateStory}>
            Generate Story
          </button>
          <button className="btn btn-clear" onClick={() => setStory([])}>
            Clear All
          </button>
        </div>

        {/* Story List */}
        <div className="story-list">
          {story.length === 0 ? (
            <div className="empty-state">
              No stories yet. Add your first one!
            </div>
          ) : (
            story.map((item, index) => (
              <div key={index} className="story-item fade-in">
                {editingIndex === index ? (
                  <div className="form-inputs">
                    <input
                      className="input-edit"
                      type="text"
                      value={item.author}
                      onChange={(e) => {
                        const newStory = [...story];
                        newStory[index].author = e.target.value;
                        setStory(newStory);
                      }}
                    />
                    <input
                      className="input-edit"
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const newStory = [...story];
                        newStory[index].title = e.target.value;
                        setStory(newStory);
                      }}
                    />
                    <input
                      className="input-edit"
                      type="date"
                      value={item.date}
                      onChange={(e) => {
                        const newStory = [...story];
                        newStory[index].date = e.target.value;
                        setStory(newStory);
                      }}
                    />
                    <textarea
                      className="input-edit edit-story-detail"
                      value={item.details}
                      onChange={(e) => {
                        const newStory = [...story];
                        newStory[index].details = e.target.value;
                        setStory(newStory);
                      }}
                    />
                  </div>
                ) : (
                  <div className="story-details">
                    <strong>{item.author}</strong> - {item.title} ({item.date})
                    <textarea
                      className="inputResult"
                      value={item.details}
                      readOnly
                    />
                  </div>
                )}

                <div className="item-controls">
                  {editingIndex === index ? (
                    <button
                      className="btn btn-save"
                      onClick={() => setEditingIndex(null)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost"
                      onClick={() => edit(index)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteStory(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          Built with ❤️ by{" "}
          <a
            href="https://github.com/leosharifi"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2563eb", textDecoration: "none" }}
          >
            @leosharifi
          </a>
        </footer>
      </div>
    </div>
  );
}
