"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";

const DataPage = () => {
  const router = useRouter();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState("race");
  const [selectedOption, setSelectedOption] = useState(null);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({
    race: null,
    age: null,
    gender: null,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get("data");

    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));
        setApiData(parsedData);
        setLoading(false);
        if (parsedData.data) {
          const initialOptions = {};

          if (parsedData.data.race) {
            const raceEntries = Object.entries(parsedData.data.race);
            const highestRace = raceEntries.reduce((a, b) =>
              a[1] > b[1] ? a : b
            );
            initialOptions.race = highestRace[0];
            setSelectedOption(highestRace[0]);
          }

          if (parsedData.data.age) {
            const ageEntries = Object.entries(parsedData.data.age);
            const highestAge = ageEntries.reduce((a, b) =>
              a[1] > b[1] ? a : b
            );
            initialOptions.age = highestAge[0];
          }

          if (parsedData.data.gender) {
            const genderEntries = Object.entries(parsedData.data.gender);
            const highestGender = genderEntries.reduce((a, b) =>
              a[1] > b[1] ? a : b
            );
            initialOptions.gender = highestGender[0];
          }

          setSelectedOptions(initialOptions);
        }
      } catch (err) {
        setError("Invalid data format");
        setLoading(false);
      }
    } else {
      const storedData = localStorage.getItem("demographicsData");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setApiData(parsedData);
          setLoading(false);
          if (parsedData.data) {
            const initialOptions = {};

            if (parsedData.data.race) {
              const raceEntries = Object.entries(parsedData.data.race);
              const highestRace = raceEntries.reduce((a, b) =>
                a[1] > b[1] ? a : b
              );
              initialOptions.race = highestRace[0];
              setSelectedOption(highestRace[0]);
            }

            if (parsedData.data.age) {
              const ageEntries = Object.entries(parsedData.data.age);
              const highestAge = ageEntries.reduce((a, b) =>
                a[1] > b[1] ? a : b
              );
              initialOptions.age = highestAge[0];
            }

            if (parsedData.data.gender) {
              const genderEntries = Object.entries(parsedData.data.gender);
              const highestGender = genderEntries.reduce((a, b) =>
                a[1] > b[1] ? a : b
              );
              initialOptions.gender = highestGender[0];
            }

            setSelectedOptions(initialOptions);
          }
        } catch (err) {
          setError("Invalid stored data format");
          setLoading(false);
        }
      } else {
        setError(
          "No demographic data available. Please upload an image first."
        );
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const targetPercentage = getSelectedPercentage();
    const duration = 1500;
    const startTime = Date.now();
    const startPercentage = animatedPercentage;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentPercentage =
        startPercentage + (targetPercentage - startPercentage) * easeOutQuart;
      setAnimatedPercentage(currentPercentage);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [selectedOption, selectedSection]);

  const handleBack = () => {
    router.push("/demographics");
  };

  const handleProceed = () => {
    router.push("/");
  };

  const getCurrentData = () => {
    if (!apiData || !apiData.data) return {};
    return apiData.data[selectedSection] || {};
  };

  const getCurrentDataEntries = () => {
    const data = getCurrentData();
    if (selectedSection === "race") {
      return Object.entries(data).sort(([, a], [, b]) => b - a);
    }
    if (selectedSection === "age") {
      const ageOrder = [
        "0-2",
        "3-9",
        "10-19",
        "20-29",
        "30-39",
        "40-49",
        "50-59",
        "60-69",
        "70+",
      ];
      return ageOrder
        .filter((age) => data[age] !== undefined)
        .map((age) => [age, data[age]]);
    }
    return Object.keys(data).map((key) => [key, data[key]]);
  };

  const getMaxPercentage = () => {
    const data = getCurrentData();
    if (Object.keys(data).length === 0) return 0;
    return Math.max(...Object.values(data)) * 100;
  };

  const getSelectedPercentage = () => {
    const data = getCurrentData();
    if (!selectedOption || !data[selectedOption]) return getMaxPercentage();
    return data[selectedOption] * 100;
  };

  const getSectionTitle = () => {
    if (selectedOption) {
      return selectedOption
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    const titles = {
      race: "RACE",
      age: "AGE",
      gender: "GENDER",
    };
    return titles[selectedSection] || "RACE";
  };

  const getSelectedOptionName = () => {
    return "";
  };

  if (loading) {
    return (
      <div className="h-screen bg-white relative">
        <NavBar page="INTRO" />

        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-black font-medium">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-white relative">
        <NavBar page="INTRO" />

        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center">
            <p className="text-red-600 font-medium mb-4">
              Error loading data: {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      <NavBar page="INTRO" />

      <div className="text-left px-8 pt-8">
        <h2 className="text-[16px] font-bold text-black mb-2">A.I. ANALYSIS</h2>
        <p className="text-[60px] text-black font-medium">DEMOGRAPHICS</p>
        <p className="text-sm text-black font-medium">PREDICTED RACE & AGE</p>
      </div>

      <div className="pl-8 pr-0 pt-8 flex flex-col lg:flex-row gap-4 min-h-[600px] pb-32">
        <div className="w-full lg:w-1/8">
          <div className="space-y-4 m-0 flex lg:flex-col">
            {["race", "age", "gender"].map((section) => (
              <div
                key={section}
                className={`w-full lg:w-full border-t-2 border-black px-8 py-20 cursor-pointer transition-colors h-[120px] ${
                  selectedSection === section
                    ? "bg-black"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setSelectedSection(section);

                  if (apiData && apiData.data && apiData.data[section]) {
                    const sectionEntries = Object.entries(
                      apiData.data[section]
                    );
                    const highestOption = sectionEntries.reduce((a, b) =>
                      a[1] > b[1] ? a : b
                    );
                    setSelectedOption(highestOption[0]);
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [section]: highestOption[0],
                    }));
                  } else {
                    setSelectedOption(null);
                  }
                }}
              >
                <div className="relative h-full w-full">
                  <h4
                    className={`absolute bottom-[-75px] left-[-20px] text-[16px] font-bold uppercase ${
                      selectedSection === section ? "text-white" : "text-black"
                    }`}
                  >
                    {section === "gender" ? "SEX" : section}
                  </h4>
                  {apiData && apiData.data && apiData.data[section] && (
                    <div
                      className="absolute top-[-70px] left-[-20px] text-[16px] font-bold"
                      style={{
                        color: selectedSection === section ? "white" : "black",
                      }}
                    >
                      {selectedOptions[section]
                        ? selectedOptions[section]
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")
                        : Object.keys(apiData.data[section])[0]
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ") || ""}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-2/3 border-t-2 border-black bg-gray-100 p-6">
          <h3 className="text-[36px] font-medium text-black mb-6">
            {getSectionTitle()}
          </h3>
          <div className="relative min-h-[500px] w-full flex items-center justify-center">
            <div className="relative">
              <svg width="450" height="450" viewBox="0 0 450 450">
                <circle
                  cx="225"
                  cy="225"
                  r="180"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                />
                <circle
                  cx="225"
                  cy="225"
                  r="180"
                  fill="none"
                  stroke="#000"
                  strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 180}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 180 * (1 - animatedPercentage / 100)
                  }`}
                  transform="rotate(-90 225 225)"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-start justify-center">
                    <span className="text-[36px] font-bold text-black">
                      {Math.round(getSelectedPercentage())}
                    </span>
                    <span className="text-[24px] font-bold text-black ml-1 mt-1">
                      %
                    </span>
                  </div>
                  <div className="text-[12px] text-gray-600">
                    {getSelectedOptionName()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/4 border-t-2 border-black bg-gray-100 p-6 pr-8 mr-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[18px] font-medium text-black">
              {selectedSection === "gender"
                ? "GENDER"
                : selectedSection.toUpperCase()}
            </h3>
            <h3 className="text-[18px] font-medium text-black">
              AI CONFIDENCE
            </h3>
          </div>
          <div className="space-y-3">
            {getCurrentDataEntries().map(([option, value]) => (
              <div
                key={option}
                className={`flex justify-between items-center p-3 cursor-pointer transition-colors ${
                  selectedOption === option
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedOption(option);
                  setSelectedOptions((prev) => ({
                    ...prev,
                    [selectedSection]: option,
                  }));
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 relative">
                    <img
                      src="/rect-outer-line.svg"
                      alt="outer dash"
                      className={`w-3 h-3 absolute inset-0 z-30 ${
                        selectedOption === option ? "brightness-0 invert" : ""
                      }`}
                    />
                    {selectedOption === option && (
                      <img
                        src="/rect-inner-dash.svg"
                        alt="inner dash"
                        className="w-2 h-2 absolute inset-0 z-20"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[14px] capitalize ${
                      selectedOption === option ? "text-white" : "text-black"
                    }`}
                  >
                    {option}
                  </span>
                </div>
                <span
                  className={`text-[14px] font-bold ${
                    selectedOption === option ? "text-white" : "text-black"
                  }`}
                >
                  {Math.round(value * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-10 z-30 flex items-center">
        <div className="flex items-center cursor-pointer" onClick={handleBack}>
          <style>
            {`
                .back-diamond {
                  transition: transform 0.2s ease;
                  transform-origin: 28px 26px;
                  transform: rotate(45deg);
                }
                
                .back-svg:hover .back-diamond {
                  transform: rotate(45deg) scale(1.15);
                }
                
                .back-arrow {
                  transition: transform 0.2s ease;
                  transform-origin: 23.5px 30px;
                }
                
                .back-svg:hover .back-arrow {
                  transform: scale(1.15);
                }
              `}
          </style>
          <svg
            className="back-svg"
            width="150"
            height="52"
            viewBox="0 0 150 52"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="back-diamond"
              x="15"
              y="19"
              width="26"
              height="26"
              fill="none"
              stroke="#1A1B1C"
            />
            <polygon
              className="back-arrow"
              points="27.5,25.5 27.5,34.5 19.5,30"
              fill="#1A1B1C"
            />
            <text
              className="text"
              x="60"
              y="35"
              fontFamily="Roboto, sans-serif"
              fontSize="14"
              fontWeight="bold"
              fill="#000"
              opacity="0.7"
            >
              BACK
            </text>
          </svg>
        </div>
      </div>

      <div className="absolute bottom-8 right-10 z-30 flex items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleProceed}
        >
          <style>
            {`
                .proceed-diamond {
                  transition: transform 0.2s ease;
                  transform-origin: 104.9px 19.9px;
                  transform: rotate(45deg);
                }
                
                .proceed-svg:hover .proceed-diamond {
                  transform: rotate(45deg) scale(1.15);
                }
                
                .proceed-arrow {
                  transition: transform 0.2s ease;
                  transform-origin: 106.5px 28.8px;
                }
                
                .proceed-svg:hover .proceed-arrow {
                  transform: scale(1.15);
                }
              `}
          </style>
          <svg
            className="proceed-svg"
            width="127"
            height="50"
            viewBox="0 0 127 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              className="text"
              x="25"
              y="32"
              fontFamily="Roboto, sans-serif"
              fontSize="14"
              fontWeight="bold"
              fill="#000"
              opacity="0.7"
            >
              HOME
            </text>
            <rect
              className="proceed-diamond"
              x="95"
              y="15"
              width="26"
              height="26"
              fill="none"
              stroke="#1A1B1C"
            />
            <polygon
              className="proceed-arrow"
              points="99.5,23.8 99.5,31.8 107.5,27.8"
              fill="#1A1B1C"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
