import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청
      await axios.post("http://localhost:8889/member/logout");

      // AuthContext의 logout 함수 호출
      logout();

      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 오류:", error);
      // 서버 요청이 실패해도 클라이언트에서는 로그아웃 처리
      logout();
      alert("로그아웃 되었습니다.");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            SpringBoard
          </Link>
          <div className="navbar-menu">
            <Link to="/boards" className="navbar-item">
              개시판목록
            </Link>
            <Link to="/posts" className="navbar-item">
              게시글목록
            </Link>
            <Link to="/members" className="navbar-item">
              회원목록
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <span className="user-info">안녕하세요, {user?.mname}님</span>
              <button className="navbar-btn logout-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="navbar-btn signup-btn">
                회원가입
              </Link>
              <Link to="/login" className="navbar-btn login-btn">
                로그인
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
