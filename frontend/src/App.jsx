import React, { useState, useEffect } from "react";

const BACKEND_URL = "https://job-portal-backend-kw91.onrender.com";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState("connecting");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [appliedJob, setAppliedJob] = useState(null);

  // Fetch jobs from live Backend
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/job`);
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
        setBackendStatus("connected");
      } else {
        setBackendStatus("error");
      }
    } catch (err) {
      console.error("Failed to connect to backend:", err);
      setBackendStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.roleName.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      (job.techStack && job.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase())));
    const matchesCategory =
      selectedCategory === "All" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(jobs.map((j) => j.category).filter(Boolean))];

  return (
    <main className="portal">
      {/* Header */}
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Job Portal home">
          <span className="brand-mark">J</span>
          <span>Job Portal</span>
        </a>

        {/* Live Backend Connection Indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
          {backendStatus === "connected" && (
            <span style={{ color: "#16a34a", background: "#dcfce7", padding: "4px 12px", borderRadius: "999px", fontWeight: "600" }}>
              🟢 Backend Connected ({jobs.length} Live Jobs)
            </span>
          )}
          {backendStatus === "connecting" && (
            <span style={{ color: "#ca8a04", background: "#fef9c3", padding: "4px 12px", borderRadius: "999px", fontWeight: "600" }}>
              🟡 Connecting to Backend...
            </span>
          )}
          {backendStatus === "error" && (
            <span style={{ color: "#dc2626", background: "#fee2e2", padding: "4px 12px", borderRadius: "999px", fontWeight: "600" }}>
              🔴 Connection issue — <button onClick={fetchJobs} style={{ textDecoration: "underline", background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}>Retry</button>
            </span>
          )}
        </div>

        <nav aria-label="Main navigation">
          <a href="#jobs-section">Browse Jobs</a>
          <a href="#how-it-works">How it works</a>
          <a className="header-link" href="#jobs-section">Apply Now</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <span className="eyebrow">Your next opportunity starts here</span>
        <h1>Find work that moves you forward.</h1>
        <p>
          Explore verified openings at top companies, submit your application directly,
          and track your career growth with Job Portal.
        </p>

        {/* Search Bar */}
        <div style={{ display: "flex", gap: "10px", maxWidth: "600px", margin: "24px 0 0" }}>
          <input
            type="text"
            placeholder="Search by role, company, skill (e.g. React, Google, Node.js)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "14px 18px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "15px",
            }}
          />
          <a className="primary-button" href="#jobs-section" style={{ margin: 0 }}>
            Search Jobs
          </a>
        </div>
      </section>

      {/* Live Jobs Section */}
      <section id="jobs-section" style={{ padding: "40px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span className="eyebrow">Direct from API</span>
            <h2 style={{ margin: "4px 0" }}>Explore Live Job Listings</h2>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: "1px solid #cbd5e1",
                  background: selectedCategory === cat ? "#4f46e5" : "#fff",
                  color: selectedCategory === cat ? "#fff" : "#475569",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "13px",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Cards Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
            <h3>⏳ Loading jobs from backend...</h3>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b", background: "#f8fafc", borderRadius: "12px" }}>
            <h3>No jobs found matching your search.</h3>
            <p>Try searching for different keywords or resetting the filter.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
            {filteredJobs.map((job) => (
              <article
                key={job._id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "8px",
                        background: "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        color: "#4f46e5",
                        fontSize: "20px",
                      }}
                    >
                      {job.companyName.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "17px", color: "#0f172a" }}>{job.roleName}</h4>
                      <p style={{ margin: "2px 0 0", color: "#64748b", fontSize: "14px" }}>{job.companyName}</p>
                    </div>
                  </div>

                  <p style={{ color: "#475569", fontSize: "14px", lineHeight: "1.5", margin: "12px 0" }}>
                    {job.overview}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "14px 0" }}>
                    {job.techStack &&
                      job.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: "#eef2ff",
                            color: "#4338ca",
                            fontSize: "12px",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontWeight: "500",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                    <span>📍 {job.location}</span>
                    <span>💰 ₹{job.salary.toLocaleString()}{job.salaryType}</span>
                  </div>
                </div>

                <button
                  onClick={() => setAppliedJob(job)}
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    padding: "10px",
                    background: "#4f46e5",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Apply Now
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Applied Confirmation Modal */}
      {appliedJob && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "32px",
              maxWidth: "450px",
              width: "90%",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
            <h3 style={{ margin: "0 0 8px" }}>Application Submitted!</h3>
            <p style={{ color: "#64748b", margin: "0 0 24px" }}>
              You have successfully applied for <strong>{appliedJob.roleName}</strong> at <strong>{appliedJob.companyName}</strong>.
            </p>
            <button
              onClick={() => setAppliedJob(null)}
              style={{
                padding: "10px 24px",
                background: "#4f46e5",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* How It Works Section */}
      <section className="steps" id="how-it-works">
        <div className="section-heading">
          <span className="eyebrow">A simpler job search</span>
          <h2>Make your next move with confidence.</h2>
        </div>
        <div className="step-grid">
          <article className="step-card">
            <span className="step-number">01</span>
            <h3>Explore opportunities</h3>
            <p>Browse curated listings connected straight to our live backend API.</p>
          </article>
          <article className="step-card">
            <span className="step-number">02</span>
            <h3>Prepare for the role</h3>
            <p>Access interview questions curated specifically by company and role.</p>
          </article>
          <article className="step-card">
            <span className="step-number">03</span>
            <h3>Apply in one click</h3>
            <p>Submit your application and connect directly with hiring managers.</p>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <span>Job Portal &copy; 2026 Navjot Singh</span>
        <span>
          Backend:{" "}
          <a
            href={`${BACKEND_URL}/`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline", color: "#4f46e5" }}
          >
            {BACKEND_URL}
          </a>
        </span>
      </footer>
    </main>
  );
};

export default App;
