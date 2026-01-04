import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';
import Navbar from '../components/Navbar';
import { ChevronRightSvg } from '../components/icons';
import '../styles/QuestionsPage.css';

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('authorization');

  useEffect(() => {
    fetchUser();
    fetchQuestions();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_BASE}/me`, {
        headers: { Authorization: token }
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        // Token invalid, logout
        handleLogout();
      }
    } catch (err) {
      console.error('Failed to fetch user');
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`${API_BASE}/questions`);
      const data = await res.json();
      if (res.ok) setQuestions(data.questions);
    } catch (err) {
      console.error('Failed to fetch questions');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authorization');
    navigate('/login');
  };

  return (
    <div className="questions-container">
      <Navbar user={user} onLogout={handleLogout} showBack={false} />

      <div className="questions-content">
        <h2 className="questions-title">Problems</h2>
        <div className="questions-card">
          <table className="questions-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Acceptance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.questionId} className="questions-table-row">
                  <td>{q.title}</td>
                  <td>
                    <span className={`questions-difficulty questions-difficulty-${q.difficulty.toLowerCase()}`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="questions-acceptance">{q.acceptance}</td>
                  <td className="questions-action">
                    <button
                      onClick={() => navigate(`/question/${q.questionId}`)}
                      className="questions-view-btn"
                    >
                      <ChevronRightSvg />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}