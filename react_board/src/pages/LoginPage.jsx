import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mid: "",
    mpass: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.mid.trim()) {
      newErrors.mid = "아이디를 입력해주세요.";
    }

    if (!formData.mpass.trim()) {
      newErrors.mpass = "비밀번호를 입력해주세요.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8889/member/login",
        formData
      );
      console.log("로그인 응답:", response.data);

      if (response.data.status === "success") {
        // AuthContext의 login 함수 사용
        login(response.data.member);
        alert("로그인 성공!");
        // Navigate to home page
        navigate("/");
      } else {
        alert("로그인 실패: 아이디나 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ mid: "", mpass: "" });
    setErrors({});
    // Navigate back or to home page
    console.log("돌아가기");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">로그인</h1>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="userId" className="form-label">
                아이디 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="userId"
                name="mid"
                value={formData.mid}
                onChange={handleChange}
                className={`form-input ${errors.mid ? "error" : ""}`}
                placeholder="아이디를 입력하세요"
              />
              {errors.mid && (
                <span className="error-message">{errors.mid}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                비밀번호 <span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="mpass"
                value={formData.mpass}
                onChange={handleChange}
                className={`form-input ${errors.mpass ? "error" : ""}`}
                placeholder="비밀번호를 입력하세요"
              />
              {errors.mpass && (
                <span className="error-message">{errors.mpass}</span>
              )}
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "로그인 중..." : "로그인"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
                disabled={loading}
              >
                입력 지우기
              </button>
            </div>
          </form>

          <div className="login-footer">
            <p>
              계정이 없으신가요?{" "}
              <a href="/signup" className="signup-link">
                회원가입
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
