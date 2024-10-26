import React, { useState, useEffect } from 'react';
import image1 from './images/1.png';
import image2 from './images/2.png';
import image3 from './images/3.png';
import image4 from './images/4.png';
import image5 from './images/5.png';
import image6 from './images/6.png';
import image7 from './images/7.png';
import image8 from './images/8.png';

// カテゴリごとにAとBの画像リストを定義
const imageCategories = {
    nature: {
        A: [image1, image2, ],
        B: [image3, image4, ],
    },
    city: {
        A: [image5, image6],
        B: [image7, image8],
    },
};

const categories = Object.keys(imageCategories);

const RandomImageApp = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [currentImages, setCurrentImages] = useState([null, null]); // 初期値はnullの配列
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // カテゴリが変更されるたびに画像を非表示に設定
    useEffect(() => {
        setCurrentImages([null, null]);
    }, [selectedCategory]);

    // ランダムにAとBから1枚ずつ画像を表示する関数
    const showRandomImages = () => {
        const imagesA = imageCategories[selectedCategory].A;
        const imagesB = imageCategories[selectedCategory].B;
        const randomIndexA = Math.floor(Math.random() * imagesA.length);
        const randomIndexB = Math.floor(Math.random() * imagesB.length);
        setCurrentImages([imagesA[randomIndexA], imagesB[randomIndexB]]);
    };

    // カテゴリ選択時の処理
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* カテゴリのプルダウンメニュー */}
            <div className="relative mb-4">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md flex items-center justify-between w-48"
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
                                className="cursor-pointer select-none py-2 px-4 hover:bg-blue-500 hover:text-white text-gray-900"
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 画像の表示 */}
            <div className="flex space-x-4">
                {currentImages[0] && (
                    <div className="transition-opacity duration-500">
                        <img
                            src={currentImages[0]}
                            alt="Random A"
                            className="w-72 h-72 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                )}
                {currentImages[1] && (
                    <div className="transition-opacity duration-500">
                        <img
                            src={currentImages[1]}
                            alt="Random B"
                            className="w-72 h-72 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                )}
            </div>

            {/* ランダム画像表示ボタン */}
            <button
                onClick={showRandomImages}
                className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                たおす！
            </button>
        </div>
    );
};

export default RandomImageApp;
