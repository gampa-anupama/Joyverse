// // // // // import React, { useState, useEffect } from "react";
// // // // // import "bootstrap/dist/css/bootstrap.min.css";
// // // // // import Confetti from "react-confetti";
// // // // // import "../styles/Game_2.css";
// // // // // import { useLocation } from "react-router-dom";
// // // // // import useWebcam from "../hooks/useWebcam";
// // // // // import useSessionId from "../hooks/useSessionID";
// // // // // import useCapture from "../hooks/useCapture";
// // // // // import axios from "axios"; // Import axios to make HTTP requests

// // // // // // Function to handle voice feedback with a check for the speech synthesis
// // // // // const speak = (text) => {
// // // // //   if ("speechSynthesis" in window) {
// // // // //     const synth = window.speechSynthesis;
// // // // //     const utterance = new SpeechSynthesisUtterance(text);

// // // // //     // Ensure speech synthesis is active before speaking
// // // // //     if (synth.speaking) {
// // // // //       synth.cancel(); // Stop any ongoing speech to avoid overlaps
// // // // //     }

// // // // //     // Speak after a short delay to handle any issues with speech initiation
// // // // //     setTimeout(() => {
// // // // //       synth.speak(utterance);
// // // // //     }, 100);
// // // // //   } else {
// // // // //     console.warn("Speech synthesis not supported in this browser.");
// // // // //   }
// // // // // };

// // // // // const Game = ({ gameId }) => {
// // // // //   const [questions, setQuestions] = useState([]);
// // // // //   const [gameStarted, setGameStarted] = useState(false);
// // // // //   const [currentLevel, setCurrentLevel] = useState(0);
// // // // //   const [completedWord, setCompletedWord] = useState("");
// // // // //   const [isCorrect, setIsCorrect] = useState(null);
// // // // //   const [showEndScreen, setShowEndScreen] = useState(false);
// // // // //   const [intervalId, setIntervalId] = useState(null);
// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const location = useLocation();
// // // // //   const { username, gameName } = location.state || {};
// // // // //   const { videoRef, webcamGranted, requestWebcamAccess } = useWebcam();
// // // // //   const { sessionId } = useSessionId();
// // // // //   const { canvasRef, captureImage, captureScreenshot } = useCapture(
// // // // //     videoRef,
// // // // //     sessionId
// // // // //   );

// // // // //   // Debug logs for troubleshooting
// // // // //   console.log("Game 2 Component - Debug Info:", {
// // // // //     questions,
// // // // //     currentLevel,
// // // // //     currentQuestion: questions[currentLevel],
// // // // //   });

// // // // //   // Comprehensive debug logs
// // // // //   console.log("Game 2 Component - Debug Info:", {
// // // // //     fullLocation: location,
// // // // //     locationState: location.state,
// // // // //     extractedUsername: username,
// // // // //     extractedGameName: gameName,
// // // // //   });

// // // // //   useEffect(() => {
// // // // //     const fetchGameQuestions = async () => {
// // // // //       try {
// // // // //         const response = await axios.get(
// // // // //           `${process.env.REACT_APP_BACKEND_URL}/child/game/game-2`
// // // // //         );
// // // // //         setQuestions(response.data || []);
// // // // //         if (response.data.length > 0) {
// // // // //           setCompletedWord(response.data[0]?.word || "");
// // // // //         }
// // // // //         setIsLoading(false); // Set loading to false when data is fetched
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching game questions:", error);
// // // // //         setIsLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchGameQuestions();
// // // // //   }, [gameId]);

// // // // //   useEffect(() => {
// // // // //     return () => clearInterval(intervalId); // Cleanup the interval
// // // // //   }, [intervalId]);

// // // // //   const startGame = () => {
// // // // //     console.log("Game 2 - StartGame Debug Info:", {
// // // // //       sessionId,
// // // // //       username,
// // // // //       gameName,
// // // // //       webcamGranted,
// // // // //     });

// // // // //     setGameStarted(true);
// // // // //     const id = setInterval(() => {
// // // // //       console.log("Game 2 - Capture Interval Debug Info:", {
// // // // //         sessionId,
// // // // //         username,
// // // // //         gameName,
// // // // //       });
// // // // //       captureImage(sessionId, username || `Child_${sessionId}`, gameName);
// // // // //       captureScreenshot(sessionId, username || `Child_${sessionId}`, gameName);
// // // // //     }, 10000);

// // // // //     setIntervalId(id);
// // // // //   };

// // // // //   const handleDrop = (letter) => {
// // // // //     const currentQuestion = questions[currentLevel];
// // // // //     if (!currentQuestion) return;

// // // // //     const { correctLetter, word } = currentQuestion;
// // // // //     if (letter === correctLetter) {
// // // // //       setIsCorrect(true);
// // // // //       setCompletedWord(word.replace("_", letter));
// // // // //       speak("Correct!");

// // // // //       setTimeout(() => {
// // // // //         if (currentLevel < questions.length - 1) {
// // // // //           setCurrentLevel(currentLevel + 1);
// // // // //           setCompletedWord(questions[currentLevel + 1]?.word || "");
// // // // //           setIsCorrect(null);
// // // // //         } else {
// // // // //           clearInterval(intervalId);
// // // // //           setShowEndScreen(true);
// // // // //           stopWebcamStream();
// // // // //         }
// // // // //       }, 1500);
// // // // //     } else {
// // // // //       setIsCorrect(false);
// // // // //       speak("Try again!");
// // // // //     }
// // // // //   };

// // // // //   // Stop the webcam stream
// // // // //   const stopWebcamStream = () => {
// // // // //     if (videoRef.current && videoRef.current.srcObject) {
// // // // //       const tracks = videoRef.current.srcObject.getTracks();
// // // // //       tracks.forEach((track) => track.stop()); // Stop each track
// // // // //       videoRef.current.srcObject = null; // Clear the srcObject
// // // // //     }
// // // // //   };

// // // // //   const currentQuestion = questions[currentLevel] || {};
// // // // //   const { image = "", options = [] } = currentQuestion;

// // // // //   if (showEndScreen) {
// // // // //     stopWebcamStream(); // Stop the webcam when the game ends
// // // // //     return <EndScreen />;
// // // // //   }

// // // // //   return (
// // // // //     <div className="game-container">
// // // // //       <h3
// // // // //         className="mb-4 display-4"
// // // // //         style={{ fontFamily: "Comic Sans MS, sans-serif",fontSize:"20px" }} 
// // // // //       >
// // // // //         Drag & Spell the word!
// // // // //       </h3>
// // // // //       {!webcamGranted && (
// // // // //         <button className="btn2" onClick={requestWebcamAccess} >
// // // // //           ALLOW ACCESS TO CAMERA
// // // // //         </button>
// // // // //       )}
// // // // //       {webcamGranted && !gameStarted && (
// // // // //         <button className="btn2" onClick={startGame} >
// // // // //           START GAME
// // // // //         </button>
// // // // //       )}

// // // // //       <video
// // // // //         ref={videoRef}
// // // // //         autoPlay
// // // // //         playsInline
// // // // //         style={{ display: "none" }}
// // // // //       ></video>
// // // // //       <canvas
// // // // //         ref={canvasRef}
// // // // //         style={{ display: "none" }}
// // // // //         width="640"
// // // // //         height="480"
// // // // //       ></canvas>
// // // // //       {gameStarted && (
// // // // //         <>
// // // // //           <WordWithImage
// // // // //             word={completedWord}
// // // // //             image={image}
// // // // //             isCorrect={isCorrect}
// // // // //             handleDrop={handleDrop}
            
// // // // //           />
// // // // //           <div className="options d-flex justify-content-center mt-4" >
// // // // //             {options.map((letter, index) => (
// // // // //               <LetterOption key={index} letter={letter} />
// // // // //             ))}
// // // // //           </div>
// // // // //         </>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const WordWithImage = ({ word, image, isCorrect, handleDrop }) => {
// // // // //   const getBackgroundColor = () => {
// // // // //     if (isCorrect === null) return "white";
// // // // //     return isCorrect ? "lightgreen" : "lightcoral";
// // // // //   };

// // // // //   const onDrop = (e) => {
// // // // //     e.preventDefault();
// // // // //     const droppedLetter = e.dataTransfer.getData("letter");
// // // // //     handleDrop(droppedLetter);
// // // // //   };

// // // // //   return (
// // // // //     <div
// // // // //       className="word-container"
// // // // //       style={{
// // // // //         backgroundColor: getBackgroundColor(),
// // // // //         borderRadius: "15px",
// // // // //         transition: "background-color 0.3s ease",
// // // // //         position: "relative",
// // // // //       }}
// // // // //       onDrop={onDrop}
// // // // //       onDragOver={(e) => e.preventDefault()}
// // // // //     >
// // // // //       <img
// // // // //         src={image}
// // // // //         alt="object to guess"
// // // // //         className="img-fluid mb-3 rounded"
// // // // //         style={{ width: "150px" }}
// // // // //       />
// // // // //       <h1
// // // // //         className="display-3 font-weight-bold"
// // // // //         style={{ fontFamily: "Comic Sans MS, sans-serif", color: "#5a189a" }}
// // // // //       >
// // // // //         {word}
// // // // //       </h1>

// // // // //       {/* Show thumbs-up emoji if answer is correct */}
// // // // //       {isCorrect && (
// // // // //         <span
// // // // //           className="thumbs-up"
// // // // //           style={{
// // // // //             fontSize: "3rem",
// // // // //             color: "green",
// // // // //             position: "absolute",
// // // // //             top: "10px",
// // // // //             right: "10px",
// // // // //             transition: "opacity 0.3s ease",
// // // // //           }}
// // // // //         >
// // // // //           👍
// // // // //         </span>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const LetterOption = ({ letter }) => {
// // // // //   const onDragStart = (e) => {
// // // // //     e.dataTransfer.setData("letter", letter);
// // // // //   };

// // // // //   return (
// // // // //     <div
// // // // //       className="letter-option btn btn-warning m-2"
// // // // //       draggable
// // // // //       onDragStart={onDragStart}
// // // // //       style={{
// // // // //         width: "50px",
// // // // //         height: "50px",
// // // // //         fontSize: "1.5rem",
// // // // //         fontFamily: "Comic Sans MS, sans-serif",
// // // // //         color: "#FFFFFF",
// // // // //         borderRadius: "50%",
// // // // //         display: "flex",
// // // // //         alignItems: "center",
// // // // //         justifyContent: "center",
// // // // //         textTransform: "none" 
// // // // //       }}
// // // // //     >
// // // // //       {letter}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // End Screen component with confetti effect
// // // // // const EndScreen = () => {
// // // // //   return (
// // // // //     <div className="end-screen text-center p-5">
// // // // //       <Confetti />
// // // // //       <h1
// // // // //         className="display-2 font-weight-bold"
// // // // //         style={{ fontFamily: "Comic Sans MS, sans-serif", color: "#4CAF50" }}
// // // // //       >
// // // // //         Well Done!
// // // // //       </h1>
// // // // //       <p
// // // // //         className="lead"
// // // // //         style={{ fontFamily: "Comic Sans MS, sans-serif", color: "#555" }}
// // // // //       >
// // // // //         You've completed all the levels.
// // // // //       </p>
// // // // //       <button
// // // // //         className="btn2"
// // // // //         onClick={() => (window.location.href = "/select-game")}
// // // // //       >
// // // // //         Back to Games
// // // // //       </button>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Game;
// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import "bootstrap/dist/css/bootstrap.min.css";
// // // // import Confetti from "react-confetti";
// // // // import "../styles/Game_2.css";
// // // // import { useLocation } from "react-router-dom";
// // // // import useWebcam from "../hooks/useWebcam";
// // // // import useSessionId from "../hooks/useSessionID";
// // // // import useCapture from "../hooks/useCapture";
// // // // import axios from "axios";

// // // // // Voice feedback
// // // // const speak = (text) => {
// // // //   if ("speechSynthesis" in window) {
// // // //     const synth = window.speechSynthesis;
// // // //     const utterance = new SpeechSynthesisUtterance(text);
// // // //     if (synth.speaking) synth.cancel();
// // // //     setTimeout(() => synth.speak(utterance), 100);
// // // //   }
// // // // };

// // // // // Helper to convert emotion to RGB (aligned with Game 1)
// // // // const emotionToColor = (emotion) => {
// // // //   const map = {
// // // //     happy: [255, 255, 0],       // yellow
// // // //     sad: [0, 0, 255],           // blue
// // // //     angry: [255, 0, 0],         // red
// // // //     fear: [128, 0, 128],        // purple
// // // //     disgust: [0, 128, 0],       // dark green
// // // //     surprise: [0, 255, 255],    // cyan
// // // //     neutral: [255, 255, 255],   // white
// // // //     calm: [173, 216, 230],      // light blue
// // // //     confused: [255, 165, 0],    // orange
// // // //   };
// // // //   const key = emotion?.toLowerCase().trim();
// // // //   return map[key] || [255, 255, 255];
// // // // };

// // // // // Dim a color by blending toward white to reduce intensity
// // // // const dimColor = (rgb, towardWhiteFactor = 0.6) => {
// // // //   const clampFactor = Math.max(0, Math.min(1, towardWhiteFactor));
// // // //   return [
// // // //     Math.round(lerp(rgb[0], 255, clampFactor)),
// // // //     Math.round(lerp(rgb[1], 255, clampFactor)),
// // // //     Math.round(lerp(rgb[2], 255, clampFactor)),
// // // //   ];
// // // // };

// // // // // Linear interpolation for smooth color change
// // // // const lerp = (a, b, t) => a + (b - a) * t;

// // // // const Game = ({ gameId }) => {
// // // //   const location = useLocation();
// // // //   const { username, gameName } = location.state || {};
// // // //   const { videoRef, webcamGranted, requestWebcamAccess } = useWebcam();
// // // //   const { sessionId } = useSessionId();
// // // //   const { canvasRef, captureImage, captureScreenshot } = useCapture(
// // // //     videoRef,
// // // //     sessionId
// // // //   );

// // // //   const [questions, setQuestions] = useState([]);
// // // //   const [gameStarted, setGameStarted] = useState(false);
// // // //   const [currentLevel, setCurrentLevel] = useState(0);
// // // //   const [completedWord, setCompletedWord] = useState("");
// // // //   const [isCorrect, setIsCorrect] = useState(null);
// // // //   const [showEndScreen, setShowEndScreen] = useState(false);
// // // //   const [intervalId, setIntervalId] = useState(null);
// // // //   const [isLoading, setIsLoading] = useState(true);

// // // //   // Background color states
// // // //   const [currentColor, setCurrentColor] = useState([255, 255, 255]);
// // // //   const [targetColor, setTargetColor] = useState([255, 255, 255]);

// // // //   // Fetch questions
// // // //   useEffect(() => {
// // // //     const fetchGameQuestions = async () => {
// // // //       try {
// // // //         const response = await axios.get(
// // // //           `${process.env.REACT_APP_BACKEND_URL}/child/game/game-2`
// // // //         );
// // // //         setQuestions(response.data || []);
// // // //         if (response.data.length > 0) {
// // // //           setCompletedWord(response.data[0]?.word || "");
// // // //         }
// // // //         setIsLoading(false);
// // // //       } catch (error) {
// // // //         console.error("Error fetching game questions:", error);
// // // //         setIsLoading(false);
// // // //       }
// // // //     };
// // // //     fetchGameQuestions();
// // // //   }, [gameId]);

// // // //   // Animate background color
// // // //   useEffect(() => {
// // // //     let animationFrameId;
// // // //     const animateBackground = () => {
// // // //       setCurrentColor((prevColor) => {
// // // //         const newColor = [
// // // //           lerp(prevColor[0], targetColor[0], 0.04),
// // // //           lerp(prevColor[1], targetColor[1], 0.04),
// // // //           lerp(prevColor[2], targetColor[2], 0.04),
// // // //         ];
// // // //         document.body.style.backgroundColor = `rgb(${newColor
// // // //           .map((c) => Math.round(c))
// // // //           .join(",")})`;
// // // //         return newColor;
// // // //       });
// // // //       animationFrameId = requestAnimationFrame(animateBackground);
// // // //     };
// // // //     animationFrameId = requestAnimationFrame(animateBackground);
// // // //     return () => cancelAnimationFrame(animationFrameId);
// // // //   }, [targetColor]);

// // // //   // Capture base64 for emotion analysis
// // // //   const captureBase64 = () => {
// // // //     if (!canvasRef.current || !videoRef.current) return null;
// // // //     const canvas = canvasRef.current;
// // // //     const ctx = canvas.getContext("2d");
// // // //     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
// // // //     return canvas.toDataURL("image/jpeg", 0.6); // compress image
// // // //   };

// // // //   // Emotion analysis
// // // //   const analyzeEmotion = async () => {
// // // //     const base64Image = captureBase64();
// // // //     if (!base64Image) return;

// // // //     try {
// // // //       const response = await axios.post(
// // // //         `${process.env.REACT_APP_BACKEND_URL}/admin/api/analyze`,
// // // //         { image: base64Image }
// // // //       );
// // // //       const emotion = response.data.emotion;
// // // //       const color = emotionToColor(emotion);
// // // //       setTargetColor(dimColor(color, 0.3)); // increase intensity (less blend to white)
// // // //     } catch (err) {
// // // //       console.error("Emotion analysis failed:", err);
// // // //     }
// // // //   };

// // // //   // Start game
// // // //   const startGame = () => {
// // // //     setGameStarted(true);

// // // //     const id = setInterval(() => {
// // // //       // Keep existing functionality
// // // //       captureImage(sessionId, username || `Child_${sessionId}`, gameName);
// // // //       captureScreenshot(sessionId, username || `Child_${sessionId}`, gameName);
// // // //       analyzeEmotion();
// // // //     }, 5000); // every 5 seconds, aligned with Game 1

// // // //     setIntervalId(id);
// // // //   };

// // // //   // Stop webcam stream
// // // //   const stopWebcamStream = () => {
// // // //     if (videoRef.current && videoRef.current.srcObject) {
// // // //       const tracks = videoRef.current.srcObject.getTracks();
// // // //       tracks.forEach((track) => track.stop());
// // // //       videoRef.current.srcObject = null;
// // // //     }
// // // //   };

// // // //   // Handle letter drop
// // // //   const handleDrop = (letter) => {
// // // //     const currentQuestion = questions[currentLevel];
// // // //     if (!currentQuestion) return;

// // // //     const { correctLetter, word } = currentQuestion;
// // // //     if (letter === correctLetter) {
// // // //       setIsCorrect(true);
// // // //       setCompletedWord(word.replace("_", letter));
// // // //       speak("Correct!");

// // // //       setTimeout(() => {
// // // //         if (currentLevel < questions.length - 1) {
// // // //           setCurrentLevel(currentLevel + 1);
// // // //           setCompletedWord(questions[currentLevel + 1]?.word || "");
// // // //           setIsCorrect(null);
// // // //         } else {
// // // //           clearInterval(intervalId);
// // // //           setShowEndScreen(true);
// // // //           stopWebcamStream();
// // // //         }
// // // //       }, 1500);
// // // //     } else {
// // // //       setIsCorrect(false);
// // // //       speak("Try again!");
// // // //     }
// // // //   };

// // // //   // Cleanup interval on unmount
// // // //   useEffect(() => {
// // // //     return () => clearInterval(intervalId);
// // // //   }, [intervalId]);

// // // //   const currentQuestion = questions[currentLevel] || {};
// // // //   const { image = "", options = [] } = currentQuestion;

// // // //   if (showEndScreen) {
// // // //     stopWebcamStream();
// // // //     return <EndScreen />;
// // // //   }

// // // //   return (
// // // //     <div className="game-container">
// // // //       <h3 className="mb-4 display-4" style={{ fontFamily: "Comic Sans MS, sans-serif", fontSize: "20px" }}>
// // // //         Drag & Spell the word!
// // // //       </h3>

// // // //       {!webcamGranted && (
// // // //         <button className="btn2" onClick={requestWebcamAccess}>
// // // //           ALLOW ACCESS TO CAMERA
// // // //         </button>
// // // //       )}

// // // //       {webcamGranted && !gameStarted && (
// // // //         <button className="btn2" onClick={startGame}>
// // // //           START GAME
// // // //         </button>
// // // //       )}

// // // //       <video ref={videoRef} autoPlay playsInline style={{ display: "none" }}></video>
// // // //       <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480"></canvas>

// // // //       {gameStarted && (
// // // //         <>
// // // //           <WordWithImage
// // // //             word={completedWord}
// // // //             image={image}
// // // //             isCorrect={isCorrect}
// // // //             handleDrop={handleDrop}
// // // //           />
// // // //           <div className="options d-flex justify-content-center mt-4">
// // // //             {options.map((letter, index) => (
// // // //               <LetterOption key={index} letter={letter} />
// // // //             ))}
// // // //           </div>
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // // Word + Image Component
// // // // const WordWithImage = ({ word, image, isCorrect, handleDrop }) => {
// // // //   const getBackgroundColor = () => {
// // // //     if (isCorrect === null) return "white";
// // // //     return isCorrect ? "lightgreen" : "lightcoral";
// // // //   };

// // // //   const onDrop = (e) => {
// // // //     e.preventDefault();
// // // //     const droppedLetter = e.dataTransfer.getData("letter");
// // // //     handleDrop(droppedLetter);
// // // //   };

// // // //   return (
// // // //     <div
// // // //       className="word-container"
// // // //       style={{
// // // //         backgroundColor: getBackgroundColor(),
// // // //         borderRadius: "15px",
// // // //         transition: "background-color 0.3s ease",
// // // //         position: "relative",
// // // //       }}
// // // //       onDrop={onDrop}
// // // //       onDragOver={(e) => e.preventDefault()}
// // // //     >
// // // //       <img
// // // //         src={image}
// // // //         alt="object to guess"
// // // //         className="img-fluid mb-3 rounded"
// // // //         style={{ width: "150px" }}
// // // //       />
// // // //       <h1
// // // //         className="display-3 font-weight-bold"
// // // //         style={{ fontFamily: "Comic Sans MS, sans-serif", color: "#5a189a" }}
// // // //       >
// // // //         {word}
// // // //       </h1>
// // // //       {isCorrect && (
// // // //         <span
// // // //           className="thumbs-up"
// // // //           style={{
// // // //             fontSize: "3rem",
// // // //             color: "green",
// // // //             position: "absolute",
// // // //             top: "10px",
// // // //             right: "10px",
// // // //             transition: "opacity 0.3s ease",
// // // //           }}
// // // //         >
// // // //           👍
// // // //         </span>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // // Letter Option Component
// // // // const LetterOption = ({ letter }) => {
// // // //   const onDragStart = (e) => {
// // // //     e.dataTransfer.setData("letter", letter);
// // // //   };

// // // //   return (
// // // //     <div
// // // //       className="letter-option btn btn-warning m-2"
// // // //       draggable
// // // //       onDragStart={onDragStart}
// // // //       style={{
// // // //         width: "50px",
// // // //         height: "50px",
// // // //         fontSize: "1.5rem",
// // // //         fontFamily: "Comic Sans MS, sans-serif",
// // // //         color: "#FFFFFF",
// // // //         borderRadius: "50%",
// // // //         display: "flex",
// // // //         alignItems: "center",
// // // //         justifyContent: "center",
// // // //         textTransform: "none",
// // // //       }}
// // // //     >
// // // //       {letter}
// // // //     </div>
// // // //   );
// // // // };

// // // // // End Screen
// // // // const EndScreen = () => {
// // // //   return (
// // // //     <div className="end-screen text-center p-5">
// // // //       <Confetti />
// // // //       <h1 className="display-2 font-weight-bold" style={{ fontFamily: "Comic Sans MS, sans-serif", color: "#4CAF50" }}>
// // // //         Well Done!
// // // //       </h1>
// // // //       <p className="lead" style={{ fontFamily: "Comic Sans MS, sans-serif", color: "#555" }}>
// // // //         You've completed all the levels.
// // // //       </p>
// // // //       <button className="btn2" onClick={() => (window.location.href = "/select-game")}>
// // // //         Back to Games
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Game;
// import React, { useState, useEffect, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Confetti from "react-confetti";
// import "../styles/Game_2.css";
// import { useLocation } from "react-router-dom";
// import useWebcam from "../hooks/useWebcam";
// import useSessionId from "../hooks/useSessionID";
// import useCapture from "../hooks/useCapture";
// import axios from "axios";

// // Voice feedback
// const speak = (text) => {
//   if ("speechSynthesis" in window) {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(text);
//     if (synth.speaking) synth.cancel();
//     setTimeout(() => synth.speak(utterance), 100);
//   }
// };

// // Map emotion to RGB color
// const emotionToColor = (emotion) => {
//   const map = {
//     happy: [255, 255, 0],
//     sad: [0, 0, 255],
//     angry: [255, 0, 0],
//     fear: [128, 0, 128],
//     disgust: [0, 128, 0],
//     surprise: [0, 255, 255],
//     neutral: [255, 255, 255],
//     calm: [173, 216, 230],
//     confused: [255, 165, 0],
//   };
//   const key = emotion?.toLowerCase().trim();
//   return map[key] || [255, 255, 255];
// };

// // Linear interpolation for smooth background color
// const lerp = (a, b, t) => a + (b - a) * t;
// const dimColor = (rgb, factor = 0.3) => rgb.map((c) => Math.round(lerp(c, 255, factor)));

// const Game = () => {
//   const location = useLocation();
//   const { username, gameName } = location.state || {};
//   const { videoRef, webcamGranted, requestWebcamAccess } = useWebcam();
//   const { sessionId } = useSessionId();
//   const { canvasRef, captureImage, captureScreenshot } = useCapture(videoRef, sessionId);

//   const [levelNumber, setLevelNumber] = useState(1);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [correctStreak, setCorrectStreak] = useState(0);
//   const [isCorrect, setIsCorrect] = useState(null);
//   const [showEndScreen, setShowEndScreen] = useState(false);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [levelMessage, setLevelMessage] = useState("");

//   const [currentColor, setCurrentColor] = useState([255, 255, 255]);
//   const [targetColor, setTargetColor] = useState([255, 255, 255]);

//   // Three levels with sample words and online images
//   const allLevels = [
//     [
//       { word: "cat", options: ["c", "a", "t"], image: "https://i.imgur.com/1sm2vKd.png" },
//       { word: "dog", options: ["d", "o", "g"], image: "https://i.imgur.com/3zK7QXp.png" },
//       { word: "sun", options: ["s", "u", "n"], image: "https://i.imgur.com/f2rk8h1.png" },
//     ],
//     [
//       { word: "fish", options: ["f", "i", "s", "h"], image: "https://i.imgur.com/7wZqJzC.png" },
//       { word: "milk", options: ["m", "i", "l", "k"], image: "https://i.imgur.com/LbXcZrH.png" },
//       { word: "cake", options: ["c", "a", "k", "e"], image: "https://i.imgur.com/TG2pHzz.png" },
//     ],
//     [
//       { word: "apple", options: ["a", "p", "p", "l", "e"], image: "https://i.imgur.com/XjxXg4l.png" },
//       { word: "tree", options: ["t", "r", "e", "e"], image: "https://i.imgur.com/eOeh1mH.png" },
//       { word: "book", options: ["b", "o", "o", "k"], image: "https://i.imgur.com/7Xx9wBP.png" },
//     ],
//   ];

//   const startGame = () => {
//     setGameStarted(true);
//     speak("Let's start the game! Focus and do your best!");
//     setCurrentQuestion(blankLetter(allLevels[levelNumber - 1][questionIndex]));

//     const id = setInterval(() => {
//       captureImage(sessionId, username || `Child_${sessionId}`, gameName);
//       captureScreenshot(sessionId, username || `Child_${sessionId}`, gameName);
//       analyzeEmotion();
//     }, 5000);
//   };

//   // Background animation
//   useEffect(() => {
//     let animationFrame;
//     const animate = () => {
//       setCurrentColor((prev) => {
//         const newColor = [
//           lerp(prev[0], targetColor[0], 0.05),
//           lerp(prev[1], targetColor[1], 0.05),
//           lerp(prev[2], targetColor[2], 0.05),
//         ];
//         document.body.style.backgroundColor = `rgb(${newColor.join(",")})`;
//         return newColor;
//       });
//       animationFrame = requestAnimationFrame(animate);
//     };
//     animationFrame = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationFrame);
//   }, [targetColor]);

//   const captureBase64 = () => {
//     if (!canvasRef.current || !videoRef.current) return null;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     return canvas.toDataURL("image/jpeg", 0.6);
//   };

//   const analyzeEmotion = async () => {
//     const base64Image = captureBase64();
//     if (!base64Image) return;
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/admin/api/analyze`,
//         { image: base64Image }
//       );
//       const emotion = response.data.emotion;
//       setTargetColor(dimColor(emotionToColor(emotion), 0.3));
//     } catch (err) {
//       console.error("Emotion analysis failed:", err);
//     }
//   };
//   // Reset background color on end screen
// useEffect(() => {
//   if (showEndScreen) {
//     document.body.style.backgroundColor = "white"; // or your default color
//   }
// }, [showEndScreen]);


//   // Blank a random letter in the word
//   const blankLetter = (question) => {
//     const idx = Math.floor(Math.random() * question.word.length);
//     const letters = question.word.split("");
//     letters[idx] = "_";
//     return { ...question, word: letters.join(""), missingIndex: idx, originalWord: question.word };
//   };

//   const handleDrop = (letter) => {
//     if (!currentQuestion) return;
//     const correctLetter = currentQuestion.originalWord[currentQuestion.missingIndex];

//     if (letter === correctLetter) {
//       setIsCorrect(true);
//       speak("Correct!");

//       // Show full word immediately
//       setCurrentQuestion((prev) => ({
//         ...prev,
//         word: prev.originalWord,
//       }));

//       setCorrectStreak((prev) => prev + 1);

//       // Wait 2 seconds before next question
//       setTimeout(() => nextQuestion(), 2000);
//     } else {
//       setIsCorrect(false);
//       speak("Try again!");
//     }
//   };

//   const nextQuestion = () => {
//     const level = allLevels[levelNumber - 1];
//     if (questionIndex < level.length - 1) {
//       const nextQ = blankLetter(level[questionIndex + 1]);
//       setQuestionIndex(questionIndex + 1);
//       setCurrentQuestion(nextQ);
//       setIsCorrect(null);
//     } else {
//       // Level completed
//       if (levelNumber < allLevels.length) {
//         const nextLevel = allLevels[levelNumber];
//         setLevelNumber(levelNumber + 1);
//         setQuestionIndex(0);
//         setCurrentQuestion(blankLetter(nextLevel[0]));
//         setIsCorrect(null);

//         const messages = [
//           "Level Up! Great work, keep going!",
//           "Awesome! You’re doing amazing!",
//           "Fantastic! Let’s try the next level!"
//         ];
//         const msg = messages[Math.floor(Math.random() * messages.length)];
//         setLevelMessage(msg);
//         speak(msg);

//         setTimeout(() => setLevelMessage(""), 3000);
//       } else {
//         setShowEndScreen(true);
//       }
//     }
//   };

//   const stopWebcamStream = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//   if (showEndScreen) return <EndScreen />;

//   return (
//     <div className="game-container">
//       <h3 className="mb-4 display-4" style={{ fontFamily: "Comic Sans MS, sans-serif", fontSize: "20px" }}>
//         Level {levelNumber} - Fill in the Blank!
//       </h3>

//       {levelMessage && <h4 style={{ color: "#ff8c00", marginBottom: "20px" }}>{levelMessage}</h4>}

//       {!webcamGranted && (
//         <button className="btn2" onClick={requestWebcamAccess}>
//           ALLOW CAMERA
//         </button>
//       )}
//       {webcamGranted && !gameStarted && (
//         <button className="btn2" onClick={startGame}>
//           START GAME
//         </button>
//       )}

//       <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
//       <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480" />

//       {gameStarted && currentQuestion && (
//         <>
//           <WordWithImage
//             word={currentQuestion.word}
//             image={currentQuestion.image}
//             isCorrect={isCorrect}
//             handleDrop={handleDrop}
//           />
//           <div className="options d-flex justify-content-center mt-4 flex-wrap">
//             {currentQuestion.options.map((letter, i) => (
//               <LetterOption key={i} letter={letter} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const WordWithImage = ({ word, image, isCorrect, handleDrop }) => {
//   const onDrop = (e) => {
//     e.preventDefault();
//     const droppedLetter = e.dataTransfer.getData("letter");
//     handleDrop(droppedLetter);
//   };

//   const getBackgroundColor = () => {
//     if (isCorrect === null) return "white";
//     return isCorrect ? "lightgreen" : "lightcoral";
//   };

//   return (
//     <div
//       className="word-container"
//       style={{ backgroundColor: getBackgroundColor(), borderRadius: "15px", transition: "background-color 0.3s ease", position: "relative" }}
//       onDrop={onDrop}
//       onDragOver={(e) => e.preventDefault()}
//     >
//       <img src={image || "https://via.placeholder.com/150"} alt="object" className="img-fluid mb-3 rounded" style={{ width: "150px" }} />
//       <h1 className="display-3 font-weight-bold" style={{ fontFamily: "Comic Sans MS, sans-serif", color: "#5a189a" }}>
//         {word}
//       </h1>
//       {isCorrect && <span style={{ fontSize: "3rem", color: "green", position: "absolute", top: "10px", right: "10px" }}>👍</span>}
//     </div>
//   );
// };

// const LetterOption = ({ letter }) => {
//   const onDragStart = (e) => e.dataTransfer.setData("letter", letter);
//   return (
//     <div
//       className="letter-option btn btn-warning m-2"
//       draggable
//       onDragStart={onDragStart}
//       style={{ width: "50px", height: "50px", fontSize: "1.5rem", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
//     >
//       {letter}
//     </div>
//   );
// };

// const EndScreen = () => (
//   <div className="end-screen text-center p-5">
//     <Confetti />
//     <h1 className="display-2 font-weight-bold" style={{ color: "#4CAF50", fontFamily: "Comic Sans MS, sans-serif" }}>Well Done!</h1>
//     <p className="lead" style={{ color: "#555", fontFamily: "Comic Sans MS, sans-serif" }}>You've completed all the levels.</p>
//     <button className="btn2" onClick={() => (window.location.href = "/select-game")}>Back to Games</button>
//   </div>
// );

// export default Game;
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Confetti from "react-confetti";
import "../styles/Game_2.css";
import { useLocation } from "react-router-dom";
import useWebcam from "../hooks/useWebcam";
import useSessionId from "../hooks/useSessionID";
import useCapture from "../hooks/useCapture";
import axios from "axios";

// Voice feedback
const speak = (text) => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    if (synth.speaking) synth.cancel();
    setTimeout(() => synth.speak(utterance), 100);
  }
};

// Map emotion to RGB color
const emotionToColor = (emotion) => {
  const map = {
    happy: [255, 255, 0],
    sad: [0, 0, 255],
    angry: [255, 0, 0],
    fear: [128, 0, 128],
    disgust: [0, 128, 0],
    surprise: [0, 255, 255],
    neutral: [255, 255, 255],
    calm: [173, 216, 230],
    confused: [255, 165, 0],
  };
  const key = emotion?.toLowerCase().trim();
  return map[key] || [255, 255, 255];
};

// Linear interpolation for smooth background color
const lerp = (a, b, t) => a + (b - a) * t;
const dimColor = (rgb, factor = 0.3) => rgb.map((c) => Math.round(lerp(c, 255, factor)));

const Game = () => {
  const location = useLocation();
  const { username, gameName } = location.state || {};
  const { videoRef, webcamGranted, requestWebcamAccess } = useWebcam();
  const { sessionId } = useSessionId();
  const { canvasRef, captureImage, captureScreenshot } = useCapture(videoRef, sessionId);

  const [levelNumber, setLevelNumber] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [wrongStreak, setWrongStreak] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [levelMessage, setLevelMessage] = useState("");

  const [currentColor, setCurrentColor] = useState([255, 255, 255]);
  const [targetColor, setTargetColor] = useState([255, 255, 255]);

  // Three levels with sample words & online images
  const allLevels = [
    [
      { word: "cat", options: ["c", "a", "t"], image: "https://i.imgur.com/1sm2vKd.png" },
      { word: "dog", options: ["d", "o", "g"], image: "https://i.imgur.com/3zK7QXp.png" },
      { word: "sun", options: ["s", "u", "n"], image: "https://i.imgur.com/f2rk8h1.png" },
    ],
    [
      { word: "fish", options: ["f", "i", "s", "h"], image: "https://i.imgur.com/7wZqJzC.png" },
      { word: "milk", options: ["m", "i", "l", "k"], image: "https://i.imgur.com/LbXcZrH.png" },
      { word: "cake", options: ["c", "a", "k", "e"], image: "https://i.imgur.com/TG2pHzz.png" },
    ],
    [
      { word: "apple", options: ["a", "p", "p", "l", "e"], image: "https://i.imgur.com/XjxXg4l.png" },
      { word: "tree", options: ["t", "r", "e", "e"], image: "https://i.imgur.com/eOeh1mH.png" },
      { word: "book", options: ["b", "o", "o", "k"], image: "https://i.imgur.com/7Xx9wBP.png" },
    ],
  ];

  // Start Game
  const startGame = () => {
    setGameStarted(true);
    speak("Let's start the game! Focus and do your best!");
    setCurrentQuestion(blankLetter(allLevels[levelNumber - 1][questionIndex]));

    const id = setInterval(() => {
      captureImage(sessionId, username || `Child_${sessionId}`, gameName);
      captureScreenshot(sessionId, username || `Child_${sessionId}`, gameName);
      analyzeEmotion();
    }, 5000);
  };

  // Background animation
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setCurrentColor((prev) => {
        const newColor = [
          lerp(prev[0], targetColor[0], 0.05),
          lerp(prev[1], targetColor[1], 0.05),
          lerp(prev[2], targetColor[2], 0.05),
        ];
        document.body.style.backgroundColor = `rgb(${newColor.join(",")})`;
        return newColor;
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetColor]);

  // Reset background color on end screen
  // Reset background color on end screen
useEffect(() => {
  if (showEndScreen) {
    document.body.style.backgroundColor = "white"; // or your default color
  }
}, [showEndScreen]);



  const captureBase64 = () => {
    if (!canvasRef.current || !videoRef.current) return null;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.6);
  };

  const analyzeEmotion = async () => {
    const base64Image = captureBase64();
    if (!base64Image) return;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/api/analyze`,
        { image: base64Image }
      );
      const emotion = response.data.emotion;
      setTargetColor(dimColor(emotionToColor(emotion), 0.3));
    } catch (err) {
      console.error("Emotion analysis failed:", err);
    }
  };

  // Blank a random letter in the word
  const blankLetter = (question) => {
    const idx = Math.floor(Math.random() * question.word.length);
    const letters = question.word.split("");
    letters[idx] = "_";
    return { ...question, word: letters.join(""), missingIndex: idx, originalWord: question.word };
  };

  // Handle Letter Drop
  const handleDrop = (letter) => {
    if (!currentQuestion) return;
    const correctLetter = currentQuestion.originalWord[currentQuestion.missingIndex];

    if (letter === correctLetter) {
      setIsCorrect(true);
      speak("Correct!");

      // Show full word immediately
      setCurrentQuestion((prev) => ({
        ...prev,
        word: prev.originalWord,
      }));

      setCorrectStreak((prev) => prev + 1);
      setWrongStreak(0); // reset wrong streak

      setTimeout(() => nextQuestion(), 2000);
    } else {
      setIsCorrect(false);
      speak("Try again!");
      setWrongStreak((prev) => prev + 1);

      // Level down if two consecutive wrongs
      if (wrongStreak + 1 >= 2 && levelNumber > 1) {
        const prevLevel = levelNumber - 1;
        setLevelNumber(prevLevel);
        setQuestionIndex(0);
        setCurrentQuestion(blankLetter(allLevels[prevLevel - 1][0]));
        setWrongStreak(0);
        setLevelMessage("Oops! Dropping a level to practice. You got this!");
        setTimeout(() => setLevelMessage(""), 3000);
      }
    }
  };

  // Next question / level up logic
  const nextQuestion = () => {
    const level = allLevels[levelNumber - 1];
    if (questionIndex < level.length - 1) {
      const nextQ = blankLetter(level[questionIndex + 1]);
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestion(nextQ);
      setIsCorrect(null);
    } else {
      // Level completed
      if (levelNumber < allLevels.length) {
        const nextLevel = allLevels[levelNumber];
        setLevelNumber(levelNumber + 1);
        setQuestionIndex(0);
        setCurrentQuestion(blankLetter(nextLevel[0]));
        setIsCorrect(null);

        const messages = [
          "Level Up! Great work, keep going!",
          "Awesome! You’re doing amazing!",
          "Fantastic! Let’s try the next level!"
        ];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        setLevelMessage(msg);
        speak(msg);
        setTimeout(() => setLevelMessage(""), 3000);
      } else {
        setShowEndScreen(true);
        stopWebcamStream();
      }
    }
  };

  const stopWebcamStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  if (showEndScreen) return <EndScreen />;

  return (
    <div className="game-container">
      <h3 className="mb-4 display-4" style={{ fontFamily: "Comic Sans MS, sans-serif", fontSize: "20px" }}>
        Level {levelNumber} - Fill in the Blank!
      </h3>

      {levelMessage && <h4 style={{ color: "#ff8c00", marginBottom: "20px" }}>{levelMessage}</h4>}

      {!webcamGranted && (
        <button className="btn2" onClick={requestWebcamAccess}>ALLOW CAMERA</button>
      )}
      {webcamGranted && !gameStarted && (
        <button className="btn2" onClick={startGame}>START GAME</button>
      )}

      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480" />

      {gameStarted && currentQuestion && (
        <>
          <WordWithImage
            word={currentQuestion.word}
            image={currentQuestion.image}
            isCorrect={isCorrect}
            handleDrop={handleDrop}
          />
          <div className="options d-flex justify-content-center mt-4 flex-wrap">
            {currentQuestion.options.map((letter, i) => (
              <LetterOption key={i} letter={letter} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Word + Image component
const WordWithImage = ({ word, image, isCorrect, handleDrop }) => {
  const onDrop = (e) => {
    e.preventDefault();
    const droppedLetter = e.dataTransfer.getData("letter");
    handleDrop(droppedLetter);
  };

  const getBackgroundColor = () => {
    if (isCorrect === null) return "white";
    return isCorrect ? "lightgreen" : "lightcoral";
  };

  return (
    <div
      className="word-container"
      style={{ backgroundColor: getBackgroundColor(), borderRadius: "15px", transition: "background-color 0.3s ease", position: "relative" }}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <img src={image || "https://via.placeholder.com/150"} alt="object" className="img-fluid mb-3 rounded" style={{ width: "150px" }} />
      <h1 className="display-3 font-weight-bold" style={{ fontFamily: "Comic Sans MS, sans-serif", color: "#5a189a" }}>{word}</h1>
      {isCorrect && <span style={{ fontSize: "3rem", color: "green", position: "absolute", top: "10px", right: "10px" }}>👍</span>}
    </div>
  );
};

// Letter draggable component
const LetterOption = ({ letter }) => {
  const onDragStart = (e) => e.dataTransfer.setData("letter", letter);
  return (
    <div
      className="letter-option btn btn-warning m-2"
      draggable
      onDragStart={onDragStart}
      style={{ width: "50px", height: "50px", fontSize: "1.5rem", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {letter}
    </div>
  );
};

// End Screen
const EndScreen = () => (
  <div className="end-screen text-center p-5">
    <Confetti />
    <h1 className="display-2 font-weight-bold" style={{ color: "#4CAF50", fontFamily: "Comic Sans MS, sans-serif" }}>Well Done!</h1>
    <p className="lead" style={{ color: "#555", fontFamily: "Comic Sans MS, sans-serif" }}>You've completed all the levels.</p>
    <button className="btn2" onClick={() => (window.location.href = "/select-game")}>Back to Games</button>
  </div>
);

export default Game;
