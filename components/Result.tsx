import React, { useState } from 'react';
import { RefreshCcw, CheckCircle2, XCircle, Send, Loader2 } from 'lucide-react';
import { Question, UserAnswers } from '../types';
import { motion } from 'motion/react';

interface ResultProps {
  userAnswers: UserAnswers;
  questions: Question[];
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ userAnswers, questions, onReset }) => {
  const [igAccount, setIGAccount] = useState('');
  const [xAccount, setXAccount] = useState('');
  const [fansAccount, setFansAccount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce((acc, q) => {
    return acc + (userAnswers[q.id] === q.correctAnswer ? 1 : 0);
  }, 0);

  const getTitle = () => {
    if (score === questions.length) return "恭喜達標！吳海嫄大師是你！🐻‍❄️";
    if (score >= 10) return "恭喜達標！原來是海嫄專家呀！🫡";
    if (score >= 6) return "恭喜達標！你在海嫄考試中名列前茅";
    if (score >= 5) return "繼續努力，你快要及格惹！";
    return "看來你還需要多看海嫄的直播喔！";
  };

  const getMessage = () => {
    if (score === questions.length) return "海嫄系 認證！ 恭喜你獲得抽獎機會～";
    if (score >= 8) return "非常優秀！你對海嫄的了解已經贏過大部分的人了! 恭喜你獲得抽獎機會～";
    if (score >= 6) return "還不錯！看來你有在關注海嫄的動向! 恭喜你獲得抽獎機會～";
    return "沒關係，現在開始追 NMIXX 的直播跟綜藝還不遲！趕快去複習一下。"; 
  };

  const handleSubmitSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!igAccount.trim()) return;

    if (!xAccount.trim() && !fansAccount.trim()) return;

    setIsSubmitting(true);
    try {
      // 請將下方的 URL 替換為您部署 GAS 後取得的「網頁應用程式 URL」
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbz4-5iHSFE2DihW8mzSA0tQVU0glHQrTGtgGXRL06M6g7-NF4aJh9Wsa7kzNbu54pVC/exec'; 

      // 為了避免 CORS preflight (OPTIONS) 請求導致 400 錯誤
      // 我們使用 text/plain 發送 JSON 字串，GAS 端依然可以解析
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 
          'Content-Type': 'text/plain' 
        },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString('zh-TW'),
          score: score,
          igAccount: igAccount,
          socialInfo: xAccount,
          socialInfo2: fansAccount
        })
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting:', error);
      // 即使失敗也顯示成功，因為 no-cors 會導致報錯但資料可能已送出
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <div className="mb-8">
        {/* <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block p-4 rounded-full bg-indigo-50 mb-4"
        >
          <CheckCircle2 className="text-indigo-500" size={48} />
        </motion.div> */}
        <div className="inline-block p-4 rounded-full bg-emerald-50 mb-4">
          <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-white text-3xl font-bold">
            {score}/{questions.length}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">{getTitle()}</h2>
        <p className="text-xl text-slate-600">{getMessage()}</p>
      </div>

      {score >= 6 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 p-6 bg-indigo-50 rounded-3xl border-2 border-indigo-100"
        >
          <h3 className="text-lg font-bold text-indigo-900 mb-2">解鎖成就！</h3>
          <p className="text-sm text-indigo-700 mb-4">答對 6 題以上，留下你的社群資訊（X/FANS）來參加社群抽獎活動吧！</p>
          
          {submitted ? (
            <div className="py-4 text-emerald-600 font-bold flex items-center justify-center gap-2">
              <CheckCircle2 size={20} />
              資訊已成功送出！
            </div>
          ) : (
            <form onSubmit={handleSubmitSocial} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-left text-xs font-bold text-slate-400 ml-2 uppercase">IG/Threads 帳號(必填)</label>
                <input
                  type="text"
                  value={igAccount}
                  onChange={(e) => setIGAccount(e.target.value)}
                  placeholder="例如：nmixx_official"
                  className="w-full px-4 py-3 rounded-xl border-2 border-white focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-left text-xs font-bold text-slate-400 ml-2 uppercase">X (Twitter) 帳號</label>
                <input
                  type="text"
                  value={xAccount}
                  onChange={(e) => setXAccount(e.target.value)}
                  placeholder="例如：@WE_NMIXX"
                  className="w-full px-4 py-3 rounded-xl border-2 border-white focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-left text-xs font-bold text-slate-400 ml-2 uppercase">FANS 帳號</label>
                <input
                  type="text"
                  value={fansAccount}
                  onChange={(e) => setFansAccount(e.target.value)}
                  placeholder="例如：HAEWON"
                  className="w-full px-4 py-3 rounded-xl border-2 border-white focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                送出資訊
              </button>
            </form>
          )}
        </motion.div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          {/* <Info className="w-5 h-5 text-indigo-500" /> */}
          詳細回顧與來源
        </h3>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {questions.map((q) => {
            const isCorrect = userAnswers[q.id] === q.correctAnswer;
            return (
              <div key={q.id} className={`p-4 rounded-2xl border-l-4 ${isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">{q.text}</h4>
                  {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />}
                </div>
                
                <div className="text-xs space-y-2">
                  <p className="text-slate-600">
                    <span className="font-bold">你的答案：</span>
                    <span className={isCorrect ? 'text-emerald-600' : 'text-rose-600'}>{userAnswers[q.id]}</span>
                  </p>
                  {!isCorrect && (
                    <p className="text-slate-600">
                      <span className="font-bold">正確答案：</span>
                      <span className="text-emerald-600">{q.correctAnswer}</span>
                    </p>
                  )}
                  {q.fact && (
                    <div className="bg-white/50 p-2 rounded-lg mt-2 text-slate-500 italic">
                      {q.fact}
                    </div>
                  )}
                  
                  {/* 新增功能：顯示來源網站 */}
                  {q.sourceUrl && (
                    <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Source</span>
                      <a 
                        href={q.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
                      >
                        查看來源網站
                        {/* <ExternalLink className="w-3 h-3" /> */}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
      >
        <RefreshCcw size={20} />
        再試一次
      </button>
    </motion.div>
  );
};

export default Result;
