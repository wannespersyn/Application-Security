import React, { useState } from "react";
import i18n from "i18next";
import { useLanguage } from "./languageProvider";

const LanguageSwitcher: React.FC = () => {
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Selecteer Taal");
  const { setLanguage } = useLanguage();
  
  const lngs: { [key: string]: { nativeName: string } } = {
    en: { nativeName: "English" },
    de: { nativeName: "Deutsch" },
    nl: { nativeName: "Nederlands" },
  };

  const handleLanguageChange = (lng: string, nativeName: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    setShowLanguages(false);
    setSelectedLanguage(nativeName);
  };

  return (
    <div className="relative">
      <div className="inline-block relative">
        <button
          onClick={() => setShowLanguages(!showLanguages)}
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:border-blue-200 transition ease-in-out duration-150"
          style={{ minWidth: "100px" }}
        >
          {selectedLanguage}
        </button>
        {showLanguages && (
          <ul className="absolute z-10 w-max max-w-xs py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg">
            {Object.keys(lngs).map((lng) => (
              <li key={lng}>
                <button
                  onClick={() => handleLanguageChange(lng, lngs[lng].nativeName)}
                  disabled={lng === i18n.resolvedLanguage}
                  className={`block w-full px-4 py-2 text-sm leading-5 text-gray-700 truncate ${
                    lng === i18n.resolvedLanguage
                      ? "bg-gray-200"
                      : "hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {lngs[lng].nativeName}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

};

export default LanguageSwitcher;