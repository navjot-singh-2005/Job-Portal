const App = () => (
  <main className="portal">
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Job Portal home">
        <span className="brand-mark">J</span>
        <span>Job Portal</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#how-it-works">How it works</a>
        <a className="header-link" href="#get-started">Get started</a>
      </nav>
    </header>

    <section className="hero" id="home">
      <span className="eyebrow">Your next opportunity starts here</span>
      <h1>Find work that moves you forward.</h1>
      <p>
        Explore opportunities, discover new career paths, and take the next step
        in your professional journey.
      </p>
      <a className="primary-button" href="#get-started">
        Explore the portal <span aria-hidden="true">→</span>
      </a>
      <div className="hero-decoration" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>

    <section className="steps" id="how-it-works">
      <div className="section-heading">
        <span className="eyebrow">A simpler job search</span>
        <h2>Make your next move with confidence.</h2>
      </div>
      <div className="step-grid">
        <article className="step-card">
          <span className="step-number">01</span>
          <h3>Explore opportunities</h3>
          <p>Find roles and companies that match the direction you want to go.</p>
        </article>
        <article className="step-card">
          <span className="step-number">02</span>
          <h3>Prepare for the role</h3>
          <p>Build your confidence with practical career and interview resources.</p>
        </article>
        <article className="step-card">
          <span className="step-number">03</span>
          <h3>Take the next step</h3>
          <p>Keep your search moving and focus on the opportunities that fit.</p>
        </article>
      </div>
    </section>

    <section className="get-started" id="get-started">
      <div>
        <span className="eyebrow">Ready when you are</span>
        <h2>Your next chapter can start today.</h2>
      </div>
      <span className="get-started-note">
        The Job Portal frontend is running. Connect the project’s API to enable
        live job listings and account features.
      </span>
    </section>

    <footer className="site-footer">
      <span>Job Portal</span>
      <span>Find your way forward.</span>
    </footer>
  </main>
);

export default App;
