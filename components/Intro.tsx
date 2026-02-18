
import React from 'react';

/**
 * 如何更換封面圖片：
 * 1. 找到下方的 COVER_IMAGE_URL 變數。
 * 2. 將括號內的網址替換成您想要的圖片連結。
 * 3. 儲存後即可看到更新。
 */
const COVER_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/3/3e/HAEWONsignature.jpg"; 

interface IntroProps {
  onStart: () => void;
}

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-6 animate-fadeIn">
      <div className="relative">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-100 shadow-lg bg-slate-100">
          <img 
            src={COVER_IMAGE_URL} 
            alt="Oh Haewon Cover" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // 如果圖片連結失效，顯示一個預設的背景
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=NMIXX+HAEWON";
            }}
          />
        </div>
        <span className="absolute -bottom-2 -right-2 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Leader
        </span>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">歡迎來到海嫄大哉問</h2>
        <p className="text-slate-600 max-w-sm">
          這裡有 11 道關於 NMIXX 隊長吳海嫄的趣味題目<br></br>
          一起來測試你對海嫄的了解程度吧！
        </p>
      </div>

      <button 
        onClick={onStart}
        className="w-full sm:w-64 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
      >
        開始測驗！
      </button>

      <p className="text-xs text-slate-400 italic">
        * 小提示：有些答案就藏在海嫄平時的直播裡喔！
      </p>
    </div>
  );
};

export default Intro;
