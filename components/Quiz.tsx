import {useState} from 'react';
const Quiz = () =>{
    const [quiz1, setQuiz1] = useState('');
    const [quiz2, setQuiz2] = useState('');
    const [quizScore, setQuizScore] = useState(0);
    
    const calculateQuizScore = () => {
      let score = 0;
      if (quiz1 === 'V=IR') {
        score++;
      }
      if (quiz2 === 'Decreases') {
        score++;
      }
      setQuizScore(score);
    };

    return(
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Quiz</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">What is the formula for Ohm's Law?</h4>
            <ul className="space-y-2">
              <li>
                <label>
                  <input type="radio" name="quiz1" value="V=IR" checked={quiz1 === 'V=IR'} onChange={(e) => setQuiz1(e.target.value)} />
                  V = IR
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="quiz1" value="I=V/R" checked={quiz1 === 'I=V/R'} onChange={(e) => setQuiz1(e.target.value)} />
                  I = V/R
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="quiz1" value="R=V/I" checked={quiz1 === 'R=V/I'} onChange={(e) => setQuiz1(e.target.value)} />
                  R = V/I
                </label>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">What happens to current in a parallel circuit when resistance increases?</h4>
            <ul className="space-y-2">
              <li>
                <label>
                  <input type="radio" name="quiz2" value="Increases" checked={quiz2 === 'Increases'} onChange={(e) => setQuiz2(e.target.value)} />
                  Increases
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="quiz2" value="Decreases" checked={quiz2 === 'Decreases'} onChange={(e) => setQuiz2(e.target.value)} />
                  Decreases
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="quiz2" value="Stays the same" checked={quiz2 === 'Stays the same'} onChange={(e) => setQuiz2(e.target.value)} />
                  Stays the same
                </label>
              </li>
            </ul>
          </div>
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={calculateQuizScore}
            >
              Submit Quiz
            </button>
            <div>
              Score: {quizScore}/2
            </div>
          </div>
        </div>
      </div>
    );
}

export default Quiz;