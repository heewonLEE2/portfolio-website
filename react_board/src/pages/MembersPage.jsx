import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MembersPage.css";
import axios from "axios";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("http://localhost:8889/member/");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMemberAction = (memberId, mdelyn) => {
    const result = confirm(
      `Are you sure you want to ${
        mdelyn === "N" ? "delete" : "restore"
      } this member?`
    );

    if (result) {
      (async () => {
        try {
          await axios.delete("http://localhost:8889/member/" + memberId);
          // 성공 후 목록 새로고침
          await fetchMembers();
        } catch (error) {
          console.error("Error updating member:", error);
          alert("처리 중 오류가 발생했습니다.");
        }
      })();
    }
  };

  const handleMemberRegistration = () => {
    navigate("/signup");
  };

  if (loading) {
    return (
      <div className="members-page">
        <div className="loading">회원 목록을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="members-page">
      <div className="members-container">
        <div className="members-header">
          <h1>회원 목록</h1>
          <button onClick={handleMemberRegistration} className="register-btn">
            회원 등록
          </button>
        </div>

        <div className="members-table-container">
          <table className="members-table">
            <thead>
              <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>등록일시</th>
                <th>삭제여부</th>
                <th>삭제/복원</th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member) => (
                  <tr key={member.mid} className="member-row">
                    <td className="member-id">{member.mid}</td>
                    <td className="member-name">{member.mname}</td>
                    <td className="member-date">
                      {new Date(parseInt(member.mregdate)).toLocaleString(
                        "ko-KR",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }
                      )}
                    </td>
                    <td className="member-status">
                      <span
                        className={`status-badge ${
                          member.mdelyn === "N" ? "active" : "deleted"
                        }`}
                      >
                        {member.mdelyn}
                      </span>
                    </td>
                    <td className="member-actions">
                      <button
                        onClick={() =>
                          handleMemberAction(member.mid, member.mdelyn)
                        }
                        className={`action-btn ${
                          member.mdelyn === "N" ? "delete-btn" : "restore-btn"
                        }`}
                      >
                        {member.mdelyn === "N" ? "삭제" : "복원"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-members">
                    등록된 회원이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
