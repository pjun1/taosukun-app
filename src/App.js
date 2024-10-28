import React, { useState, useEffect } from 'react';

// フォルダ内の画像を読み込む関数
const importAll = (r) => r.keys().map(r);

// カテゴリごとの画像、カウントダウン秒数、およびメモを定義
const images = {
    "時間停止": {
        A: importAll(require.context('./images/時間停止/me', false, /\.(png|jpe?g|svg)$/)),
        B: importAll(require.context('./images/時間停止/stage', false, /\.(png|jpe?g|svg)$/)),
        countdown: 6,
        memo:""
    },
    "時空潜行のマーチ": {
        A: importAll(require.context('./images/時空潜行のマーチ/me', false, /\.(png|jpe?g|svg)$/)),
        B: importAll(require.context('./images/時空潜行のマーチ/stage', false, /\.(png|jpe?g|svg)$/)),
        countdown: 5, 
        memo:"あなたは表示されたロールが自分だと思って動いてね。"
    },
    "時空潜行のマーチ2": {
        A: importAll(require.context('./images/時空潜行のマーチ2/me', false, /\.(png|jpe?g|svg)$/)),
        B: importAll(require.context('./images/時空潜行のマーチ2/stage', false, /\.(png|jpe?g|svg)$/)),
        countdown: 5, 
        memo:""
    },
    "次元断絶のマーチ": {
        A: importAll(require.context('./images/次元断絶のマーチ/me', false, /\.(png|jpe?g|svg)$/)),
        B: importAll(require.context('./images/次元断絶のマーチ/stage', false, /\.(png|jpe?g|svg)$/)),
        countdown: 3, 
        memo:""
    },
    "確定判決": {
        A: importAll(require.context('./images/確定判決/me', false, /\.(png|jpe?g|svg)$/)),
        B: importAll(require.context('./images/確定判決/stage', false, /\.(png|jpe?g|svg)$/)),
        countdown: 3, 
        memo:""
    },
    "未来観測α": {
        A: importAll(require.context('./images/未来観測α/me', false, /\.(png|jpe?g|svg)$/)),
        B: importAll(require.context('./images/未来観測α/stage', false, /\.(png|jpe?g|svg)$/)),
        countdown: 6, 
        memo:""
    },
    "未来観測β": {
        A: importAll(require.context('./images/未来観測β/me', false, /\.(png|jpe?g|svg)$/)),
        B: importAll(require.context('./images/未来観測β/stage', false, /\.(png|jpe?g|svg)$/)),
        countdown: 6, 
        memo:""
    },
};

const categories = Object.keys(images);

const RandomImageApp = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [currentImages, setCurrentImages] = useState([null, null]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [initialCountdown, setInitialCountdown] = useState(images[selectedCategory].countdown);
    const [memo, setMemo] = useState(images[selectedCategory].memo || "");

    const startCountdownAndShowImages = () => {
        setCountdown(initialCountdown);
        showRandomImages();
    };

    useEffect(() => {
        if (countdown === null || countdown === 0) return;

        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    useEffect(() => {
        setCurrentImages([null, null]);
        setCountdown(null);
        setInitialCountdown(images[selectedCategory].countdown);
        setMemo(images[selectedCategory].memo || ""); 
    }, [selectedCategory]);

    const showRandomImages = () => {
        const imagesA = images[selectedCategory].A;
        const imagesB = images[selectedCategory].B;
        const randomIndexA = Math.floor(Math.random() * imagesA.length);
        const randomIndexB = Math.floor(Math.random() * imagesB.length);
        setCurrentImages([imagesA[randomIndexA], imagesB[randomIndexB]]);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="relative mb-6 mt-3">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="px-4 py-2 bg-orange-400 text-white rounded-md shadow-md flex items-center justify-between w-48"
                >
                    {selectedCategory}
                    <span className={`ml-2 transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
                        ▼
                    </span>
                </button>
                {isDropdownOpen && (
                    <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg w-48 mt-2 z-10">
                        {categories.map((category) => (
                            <div
                                key={category}
                                onClick={() => handleCategorySelect(category)}
                                className="cursor-pointer select-none py-2 px-4 hover:bg-orange-500 hover:text-white text-gray-900"
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {memo && (
                <div className="text-sm  mb-4  p-2 rounded-md ">
                    {memo}
                </div>
            )}

            <div className="flex flex-col items-center space-y-4">
                {currentImages[0] && (
                    <div className="transition-opacity duration-500">
                        <img
                            src={currentImages[0]}
                            alt="Random A"
                            className="object-cover rounded-lg shadow-lg"
                        />
                    </div>
                )}
                {currentImages[1] && (
                    <div className="transition-opacity duration-500">
                        <img
                            src={currentImages[1]}
                            alt="Random B"
                            className="w-96 h-96 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                )}
            </div>
            {countdown !== null && (
                <div className="text-4xl font-bold">{countdown}</div>
            )}
            <div className="pb-4">
                <button
                    onClick={startCountdownAndShowImages}
                    className="mt-3 px-6 py-2 bg-orange-400 text-white font-semibold rounded-md shadow-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    たおす！
                </button>
            </div>
        </div>
    );
};

export default RandomImageApp;
