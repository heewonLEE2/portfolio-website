import { useState, useEffect } from "react";
import "./PostsPage.css";
import axios from "axios";

const PostsPage = () => {
  const [article, setArticle] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("전체 게시판");
  const [currentPage, setCurrentPage] = useState(1);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  // 페이징 관련 상태
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);

  // 검색 관련 상태
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data - replace with actual API call to Spring backend
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    axios.get("http://localhost:8889/article/").then((response) => {
      console.log(response.data);
      setArticle(response.data.articleList);
      setBoards(response.data.boardList);
      // 전체 페이지 수 계산
      setTotalPages(Math.ceil(response.data.articleList.length / itemsPerPage));
      setLoading(false);
    });
  };

  // 현재 표시할 데이터 결정 (검색 중이면 필터링된 데이터, 아니면 전체 데이터)
  const getDisplayData = () => {
    return isSearching ? filteredArticles : article;
  };

  // 현재 페이지에 해당하는 데이터 계산
  const getCurrentPageData = () => {
    const displayData = getDisplayData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return displayData.slice(startIndex, endIndex);
  };

  // 검색 기능 구현
  const performSearch = () => {
    // 검색어도 없고 카테고리도 전체 게시판이면 검색 모드 해제
    if (!searchTerm.trim() && searchCategory === "전체 게시판") {
      setIsSearching(false);
      setFilteredArticles([]);
      setTotalPages(Math.ceil(article.length / itemsPerPage));
      setCurrentPage(1);
      return;
    }

    let results = article;

    // 검색어가 있으면 검색 수행
    if (searchTerm.trim()) {
      results = results.filter((item) => {
        const titleMatch = item.atitle
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const contentMatch =
          item.acontent?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          false;
        const authorMatch = item.mid
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        return titleMatch || contentMatch || authorMatch;
      });
    }

    // 카테고리 필터링 (검색어가 없어도 카테고리만으로 필터링 가능)
    if (searchCategory !== "전체 게시판") {
      results = results.filter((item) => {
        const board = boards.find((board) => board.bid === item.bid);
        return board && board.bname === searchCategory;
      });
    }

    setFilteredArticles(results);
    setIsSearching(true);
    setTotalPages(Math.ceil(results.length / itemsPerPage));
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSearch = () => {
    performSearch();
  };

  // 검색 초기화
  const handleResetSearch = () => {
    setSearchTerm("");
    setSearchCategory("전체 게시판");
    setIsSearching(false);
    setFilteredArticles([]);
    setTotalPages(Math.ceil(article.length / itemsPerPage));
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="posts-page">
        <div className="loading">게시글을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="posts-page">
      <div className="posts-container">
        <div className="posts-header">
          <h1>게시글 목록</h1>

          <div className="search-section">
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="search-select"
            >
              <option value="전체 게시판">전체 게시판</option>
              {boards.map((board) => (
                <option key={board.bid} value={board.bname}>
                  {board.bname}
                </option>
              ))}
            </select>

            <div className="search-input-group">
              <input
                type="text"
                placeholder="검색어를 입력하세요!"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button onClick={handleSearch} className="search-button">
                🔍
              </button>
              <button onClick={handleResetSearch} className="reset-button">
                초기화
              </button>
            </div>
          </div>
        </div>

        <div className="posts-table-container">
          <table className="posts-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>등록 게시판</th>
                <th>제목</th>
                <th>작성자</th>
                <th>등록일시</th>
                <th>댓글수</th>
                <th>첨부파일수</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().length > 0 ? (
                getCurrentPageData().map((article) => (
                  <tr key={article.aid} className="post-row">
                    <td>{article.aid}</td>
                    <td>
                      {boards.find((board) => board.bid === article.bid)?.bname}
                    </td>
                    <td className="post-title">
                      <a href={`/article/${article.aid}`} className="post-link">
                        {article.atitle}
                      </a>
                    </td>
                    <td>{article.mid}</td>
                    <td>
                      {new Date(parseInt(article.aregdate)).toLocaleString(
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
                    <td>{article.acount}</td>
                    <td>{article.afcount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-posts">
                    등록된 게시글이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            [이전]
          </button>

          {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
            const startPage = Math.max(
              1,
              Math.min(currentPage - 5, totalPages - 9)
            );
            const pageNum = startPage + i;
            return pageNum <= totalPages ? (
              <button
                key={pageNum}
                className={`pagination-btn ${
                  currentPage === pageNum ? "active" : ""
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ) : null;
          })}

          <button
            className="pagination-btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            [다음]
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
