import { useState, useEffect } from "react";
import "./BoardsPage.css";
import axios from "axios";

const BoardsPage = () => {
  const [boards, setBoards] = useState([]);
  const [activeBoardCount, setActiveBoardCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call to Spring backend
  useEffect(() => {
    fetchBoards();
    setLoading(false);
  }, []);

  const fetchBoards = async () => {
    axios.get("http://localhost:8889/board/").then((response) => {
      //console.log(response.data.boardList);
      setBoards(response.data.boardList);
      setActiveBoardCount(response.data.activeBoardCount);
    });
  };

  const handleBoardAction = (boardId, bdelyn) => {
    const result = confirm(
      `Are you sure you want to ${
        bdelyn === "N" ? "delete" : "restore"
      } this board?`
    );

    if (result) {
      (async () => {
        try {
          await axios.delete("http://localhost:8889/board/" + boardId);
          // 성공 후 목록 새로고침
          await fetchBoards();
        } catch (error) {
          console.error("Error updating board:", error);
          alert("처리 중 오류가 발생했습니다.");
        }
      })();
    }
  };

  const handleCreateBoard = () => {
    console.log("게시판 등록");
    // Navigate to board creation page or implement modal
  };

  if (loading) {
    return (
      <div className="boards-page">
        <div className="loading">게시판 목록을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="boards-page">
      <div className="boards-container">
        <div className="boards-header">
          <h1>개시판 목록</h1>
          <button onClick={handleCreateBoard} className="create-board-btn">
            게시판 등록
          </button>
        </div>

        <div className="boards-stats">
          <p>
            등록된 게시판 수: <strong>{boards.length}</strong>, 등록 게시판 수:{" "}
            <strong>{activeBoardCount}</strong>, 비활성 게시판 수:{" "}
            <strong>{boards.length - activeBoardCount}</strong>
          </p>
        </div>

        <div className="boards-table-container">
          <table className="boards-table">
            <thead>
              <tr>
                <th>아이디</th>
                <th>게시판명</th>
                <th>등록일시</th>
                <th>삭제여부</th>
                <th>삭제/복원</th>
              </tr>
            </thead>
            <tbody>
              {boards.length > 0 ? (
                boards.map((board) => (
                  <tr key={board.bid} className="board-row">
                    <td className="board-id">{board.bid}</td>
                    <td className="board-name">{board.bname}</td>
                    <td className="board-date">
                      {new Date(parseInt(board.bregdate)).toLocaleString(
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
                    <td className="board-status">
                      <span
                        className={`status-badge ${
                          board.bdelyn === "N" ? "active" : "deleted"
                        }`}
                      >
                        {board.bdelyn === "N" ? "N" : "Y"}
                      </span>
                    </td>
                    <td className="board-actions">
                      <button
                        onClick={() =>
                          handleBoardAction(board.bid, board.bdelyn)
                        }
                        className={`action-btn ${
                          board.bdelyn === "N" ? "delete-btn" : "restore-btn"
                        }`}
                      >
                        {board.bdelyn === "N" ? "삭제" : "복원"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-boards">
                    등록된 게시판이 없습니다!
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

export default BoardsPage;
