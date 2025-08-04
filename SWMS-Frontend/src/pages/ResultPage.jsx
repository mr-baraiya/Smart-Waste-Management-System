import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftCircle,
  Repeat,
  BookOpenCheck,
  GaugeCircle,
  TimerReset,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";

const ResultPage = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResult = async () => {
    try {
      const res = await fetch(`http://localhost:9705/userQuizResult/${resultId}`);
      const data = await res.json();
      setResult(data.data);
    } catch (err) {
      console.error("Failed to fetch result:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [resultId]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400 border-solid mx-auto mb-4"></div>
          <p className="text-white text-xl font-medium animate-pulse">
            Loading your results...
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center">
        <div className="text-center bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 text-xl font-semibold">Result not found</p>
          <p className="text-red-300/70 mt-2">The quiz result you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/quiz")}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
      
      <div className="relative z-10 px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-xl">
              <GaugeCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text mb-4">
              Quiz Results
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Great job completing the quiz! Here's how you performed.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={() => navigate(`/quiz/${result.quiz._id}/attempt`)}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
            >
              <Repeat className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span className="font-medium">Retake Quiz</span>
            </button>
            <button
              onClick={() => navigate("/quiz")}
              className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
            >
              <BookOpenCheck className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">New Quiz</span>
            </button>
            <button
              onClick={() => navigate("/")}
              className="group bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
            >
              <ArrowLeftCircle className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Dashboard</span>
            </button>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Quiz Info Card */}
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm border border-purple-500/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <BookOpenCheck className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-purple-300">Quiz Title</h3>
              </div>
              <p className="text-white text-xl font-bold">{result.quiz?.title || "Untitled Quiz"}</p>
            </div>

            {/* Attempt Number Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-500/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <TimerReset className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-blue-300">Attempt</h3>
              </div>
              <p className="text-white text-xl font-bold">#{result.attemptNumber}</p>
            </div>

            {/* Score Card */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-500/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <BadgeCheck className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-green-300">Final Score</h3>
              </div>
              <p className="text-white text-xl font-bold">
                {result.score} / {result.totalQuestions}
              </p>
            </div>

            {/* Correct Answers Card */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <BadgeCheck className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-emerald-300">Correct</h3>
              </div>
              <p className="text-white text-xl font-bold">{result.correctAnswers}</p>
            </div>

            {/* Percentage Card */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 backdrop-blur-sm border border-yellow-500/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <GaugeCircle className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-yellow-300">Percentage</h3>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-white text-xl font-bold">
                  {((result.correctAnswers / result.totalQuestions) * 100).toFixed(1)}%
                </p>
                <div className="flex-1 bg-slate-700 rounded-full h-2 ml-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(result.correctAnswers / result.totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Time Spent Card */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 backdrop-blur-sm border border-indigo-500/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <TimerReset className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-indigo-300">Time Taken</h3>
              </div>
              <p className="text-white text-xl font-bold">{formatTime(result.timeSpent || 0)}</p>
            </div>
          </div>

          {/* Question Analysis Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text mb-4">
                Question Analysis
              </h2>
              <p className="text-slate-300">Detailed breakdown of each question and your responses</p>
            </div>

            <div className="space-y-6">
              {result.answers.map((ans, i) => {
                const question = ans.question;
                const options = question?.options || [];
                const correctOption =
                  typeof question?.correctOption === "string"
                    ? options[question.correctOption.charCodeAt(0) - 97]
                    : "Unknown";
                const selectedOption =
                  ans.selectedOptionIndex >= 0
                    ? options[ans.selectedOptionIndex]
                    : "Not Attempted";

                return (
                  <div
                    key={ans._id || i}
                    className={`bg-gradient-to-r ${
                      ans.isCorrect 
                        ? 'from-green-500/10 to-emerald-500/10 border-green-500/30' 
                        : 'from-red-500/10 to-pink-500/10 border-red-500/30'
                    } backdrop-blur-sm border rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        ans.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {i + 1}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          {question?.questionText || "Unknown Question"}
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <BadgeCheck className="w-5 h-5 text-green-400" />
                              <span className="text-green-300 font-medium">Correct Answer:</span>
                            </div>
                            <p className="text-white bg-green-500/20 rounded-lg p-3 border border-green-500/30">
                              {correctOption}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {ans.isCorrect ? (
                                <BadgeCheck className="w-5 h-5 text-green-400" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-red-400" />
                              )}
                              <span className={`font-medium ${ans.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                                Your Answer:
                              </span>
                            </div>
                            <p className={`text-white rounded-lg p-3 border ${
                              ans.isCorrect 
                                ? 'bg-green-500/20 border-green-500/30' 
                                : 'bg-red-500/20 border-red-500/30'
                            }`}>
                              {selectedOption}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                          <div className="flex items-center gap-2">
                            {ans.isCorrect ? (
                              <BadgeCheck className="w-5 h-5 text-green-400" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-red-400" />
                            )}
                            <span className={`font-medium ${ans.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                              {ans.isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GaugeCircle className="w-5 h-5 text-blue-400" />
                            <span className="text-blue-300 font-medium">
                              Marks: {ans.marksAwarded}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30">
            <h3 className="text-xl font-semibold text-center mb-6 text-slate-200">
              What would you like to do next?
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate(`/quiz/${result.quiz._id}/attempt`)}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
              >
                <Repeat className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                <span className="font-medium">Retake This Quiz</span>
              </button>
              <button
                onClick={() => navigate("/quiz")}
                className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
              >
                <BookOpenCheck className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Try Another Quiz</span>
              </button>
              <button
                onClick={() => navigate("/")}
                className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
              >
                <ArrowLeftCircle className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
