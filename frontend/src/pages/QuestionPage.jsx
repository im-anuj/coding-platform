import{ useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';
import Navbar from '../components/Navbar';
import { CodeSvg, CheckCircleSvg, XCircleSvg, ClockSvg } from '../components/icons';
import '../styles/QuestionPage.css';

export default function QuestionPage() {
  const { id } = useParams(); // Get question ID from URL
  const navigate = useNavigate();
  const token = localStorage.getItem('authorization');

  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchQuestion();
    fetchSubmissions();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      const res = await fetch(`${API_BASE}/questions/${id}`);
      const data = await res.json();
      if (res.ok) {
        setQuestion(data.question);
        setCode(data.starterCode || '');
      }
    } catch (err) {
      console.error('Failed to fetch question');
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await fetch(`${API_BASE}/submissions/${id}`, {
        headers: { Authorization: token }
      });
      const data = await res.json();
      if (res.ok) setSubmissions(data.submissions);
      console.log('Submissions data:', data);
    } catch (err) {
      console.error('Failed to fetch submissions');
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      setMessage('Please write some code before submitting');
      return;
    }

    setSubmitting(true);
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({ questionId: id, code })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        const status = data.submission.status.toLowerCase();
        if (status === 'accepted') {
          setMessage('✓ Submission Accepted!');
        } else {
          setMessage('✗ Submission Rejected');
        }
        fetchSubmissions();
      } else {
        setMessage(data.message || 'Submission failed');
      }
    } catch (err) {
      setMessage('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authorization');
    navigate('/login');
  };

  if (!question) return <div className="loading">Loading...</div>;

  return (
    <div className="question-container">
      <Navbar 
        user={null} 
        onLogout={handleLogout} 
        showBack={true} 
        onBack={() => navigate('/questions')} 
      />

      <div className="question-content">
        <div className="question-layout">
          <div className="question-card">
            <h2 className="question-title">{question.title}</h2>
            <div className="question-header">
              <span className={`question-difficulty-badge question-difficulty-${question.difficulty.toLowerCase()}`}>
                {question.difficulty}
              </span>
            </div>
            <div className="question-description">
              <p>{question.description}</p>
            </div>
          </div>

          <div className="question-editor-section">
            <div className="question-editor-card">
              <div className="question-editor-header">
                <CodeSvg />
                <h3>Code Editor</h3>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="question-code-editor"
                placeholder="Write your code here..."
              />
              <div className="question-submit-section">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="question-submit-btn"
                >
                  {submitting ? 'Submitting...' : 'Submit Code'}
                </button>
                {message && (
                  <div className={`question-message ${message.includes('Accepted') ? 'question-message-success' : 'question-message-error'}`}>
                    {message}
                  </div>
                )}
              </div>
            </div>

            <div className="question-submissions-card">
              <h3 className="question-submissions-title">Your Submissions</h3>
              {submissions.length === 0 ? (
                <p className="question-submissions-empty">No submissions yet</p>
              ) : (
                <div className="question-submissions-list">
                  {submissions.map((sub, idx) => (
                    <div key={idx} className="question-submission-item">
                      <div className="question-submission-header">
                        <div className="question-submission-status">
                          {sub.status === 'accepted' ? <CheckCircleSvg /> : <XCircleSvg />}
                          <span className={`question-submission-status-text ${sub.status === 'accepted' ? 'question-submission-accepted' : 'question-submission-rejected'}`}>
                            {sub.status}
                          </span>
                        </div>
                        <div className="question-submission-time">
                          <ClockSvg />
                          {new Date(sub.submittedAt).toLocaleString()}
                        </div>
                      </div>
                      <pre className="question-submission-code">{sub.code}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}