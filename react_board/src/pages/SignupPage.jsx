import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    mid: "",
    mpass: "",
    mname: "",
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
    } else if (formData.mpass.length < 4) {
      newErrors.mpass = "비밀번호는 4자리 이상이어야 합니다.";
    }

    if (!formData.mname.trim()) {
      newErrors.mname = "이름을 입력해주세요.";
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
        "http://localhost:8889/member/",
        formData
      );
      console.log("회원가입 응답:", response.data);

      confirm("회원가입이 완료되었습니다!");
      // 성공 시 로그인 페이지로 이동
      navigate("/login");
      // Navigate to login page or redirect
      setFormData({ mid: "", mpass: "", mname: "" });
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    setFormData({ mid: "", mpass: "", mname: "" });
    setErrors({});
    // Navigate back or to home page
    console.log("취소");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <h1 className="signup-title">회원가입</h1>

          <form onSubmit={handleSubmit} className="signup-form">
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

            <div className="form-group">
              <label htmlFor="name" className="form-label">
                이름 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="mname"
                value={formData.mname}
                onChange={handleChange}
                className={`form-input ${errors.mname ? "error" : ""}`}
                placeholder="이름을 입력하세요"
              />
              {errors.mname && (
                <span className="error-message">{errors.mname}</span>
              )}
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "가입하는 중..." : "가입하기"}
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
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
