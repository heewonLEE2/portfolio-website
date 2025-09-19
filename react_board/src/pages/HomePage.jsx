import './HomePage.css'

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">SpringBoard V0.1</h1>
          <p className="hero-subtitle">Model: Java / Oracle, View: JSP / Javascript, Controller: Servlet</p>
          <p className="hero-pattern">Pattern: MVC, Service, DAO/DO, singleton</p>
        </div>
      </div>

      <div className="stats-container">
        <div className="stats-grid">
          <div className="stats-card">
            <h3>등록된 게시판 목록</h3>
            <p className="stats-description">등록된 게시판이 없습니다.</p>
            <button className="stats-button">... 전체 보기</button>
          </div>

          <div className="stats-card">
            <h3>최근 게시물(10건)</h3>
            <p className="stats-description">등록된 글이 없습니다.</p>
          </div>

          <div className="stats-card">
            <h3>최근 등록 사진(14건)</h3>
            <p className="stats-description">등록된 사진이 없습니다.</p>
          </div>
        </div>

        <div className="additional-stats">
          <div className="stats-card wide">
            <h3>최근 가입 회원(10건)</h3>
            <p className="stats-description">최근 가입한 회원이 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage