// src/pages/Quiz.jsx atau src/components/Quiz.jsx
import { useState } from 'react';
import axios from 'axios'; // Pastikan axios sudah diinstall

const Quiz = () => {
    const [quiz1, setQuiz1] = useState('');
    const [quiz2, setQuiz2] = useState('');
    const [quizScore, setQuizScore] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const calculateQuizScore = async () => {
      let score = 0;
      if (quiz1 === 'V=IR') {
          score++;
      }
      if (quiz2 === 'Decreases') {
          score++;
      }
      setQuizScore(score);
  
      try {
          setLoading(true);
          const token = localStorage.getItem('token');
          
          const response = await axios.patch(
              'api/v1/profile/score',
              { score: score },
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                  },
              }
          );
  
          if (response.data.data) {
              console.log('Score updated successfully:', response.data.data);
          }
      } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
              // Jika error berasal dari Axios
              setError(error.response?.data?.message || 'Failed to update score');
          } else if (error instanceof Error) {
              // Jika error adalah error standar JavaScript
              setError(error.message);
          } else {
              // Fallback untuk jenis error lainnya
              setError('An unknown error occurred');
          }
      } finally {
          setLoading(false);
      }
  };

  return (
      <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-6">Quiz</h3>
          {error && (
              <div className="text-red-500 mb-4 text-lg">
                  {error}
              </div>
          )}
          <div className="space-y-6">
              <div>
                  <h4 className="font-semibold text-xl">What is the formula for Ohm's Law?</h4>
                  <ul className="space-y-3 mt-3">
                      <li>
                          <label className="text-lg">
                              <input 
                                  type="radio" 
                                  name="quiz1" 
                                  value="V=IR" 
                                  checked={quiz1 === 'V=IR'} 
                                  onChange={(e) => setQuiz1(e.target.value)} 
                                  className="mr-2"
                              />
                              V = IR
                          </label>
                      </li>
                      <li>
                          <label className="text-lg">
                              <input 
                                  type="radio" 
                                  name="quiz1" 
                                  value="I=V/R" 
                                  checked={quiz1 === 'I=V/R'} 
                                  onChange={(e) => setQuiz1(e.target.value)} 
                                  className="mr-2"
                              />
                              I = V/R
                          </label>
                      </li>
                      <li>
                          <label className="text-lg">
                              <input 
                                  type="radio" 
                                  name="quiz1" 
                                  value="R=V/I" 
                                  checked={quiz1 === 'R=V/I'} 
                                  onChange={(e) => setQuiz1(e.target.value)} 
                                  className="mr-2"
                              />
                              R = V/I
                          </label>
                      </li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-semibold text-xl">What happens to current in a parallel circuit when resistance increases?</h4>
                  <ul className="space-y-3 mt-3">
                      <li>
                          <label className="text-lg">
                              <input 
                                  type="radio" 
                                  name="quiz2" 
                                  value="Increases" 
                                  checked={quiz2 === 'Increases'} 
                                  onChange={(e) => setQuiz2(e.target.value)} 
                                  className="mr-2"
                              />
                              Increases
                          </label>
                      </li>
                      <li>
                          <label className="text-lg">
                              <input 
                                  type="radio" 
                                  name="quiz2" 
                                  value="Decreases" 
                                  checked={quiz2 === 'Decreases'} 
                                  onChange={(e) => setQuiz2(e.target.value)} 
                                  className="mr-2"
                              />
                              Decreases
                          </label>
                      </li>
                      <li>
                          <label className="text-lg">
                              <input 
                                  type="radio" 
                                  name="quiz2" 
                                  value="Stays the same" 
                                  checked={quiz2 === 'Stays the same'} 
                                  onChange={(e) => setQuiz2(e.target.value)} 
                                  className="mr-2"
                              />
                              Stays the same
                          </label>
                      </li>
                  </ul>
              </div>
              <div className="flex justify-between items-center mt-6">
                  <button
                      className={`px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded hover:bg-green-600 disabled:opacity-50 ${loading ? 'cursor-not-allowed' : ''}`}
                      onClick={calculateQuizScore}
                      disabled={loading}
                  >
                      {loading ? 'Submitting...' : 'Submit Quiz'}
                  </button>
                  <div className="ml-6 text-xl font-semibold text-gray-800">
                      Score: {quizScore}/2
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Quiz;