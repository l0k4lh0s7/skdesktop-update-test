import React, { Fragment, useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Realm from "realm";

import TasksScreen from "./Screens/Tasks";

import RoutinesScreen from "./Screens/Routines";
import Community from "./Screens/Routines/Community";

import StudyScreen from "./Screens/Study";
import NotificationsSudyCourses from "./Screens/Study/NotificationsSudy";
import NotificationsSudy from "./Screens/Study/NotificationsSudy/Notifications";
import FlashCardsCourses from "./Screens/Study/FlashCards";
import FlashCards from "./Screens/Study/FlashCards/FlashCards";
import Pomodoros from "./Screens/Study/Pomodoros";
import Exams from "./Screens/Study/Exams";
import Settings from "./Screens/Settings";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faTimes,
  faAnchor,
  faAmbulance,
  faAngleDoubleDown,
  faAllergies,
  faBabyCarriage,
  faAtom,
  faBan,
  faRunning,
  faUtensils,
  faTrashAlt,
  faCheckCircle,
  faFilter,
  faBell,
  faRedo,
  faLongArrowAltRight,
  faSquareRootAlt,
  faDivide,
  faLanguage,
  faFlask,
  faEllipsisV,
  faEllipsisH,
  faChevronLeft,
  faChevronRight,
  faGraduationCap,
  faMinusCircle,
  faClock,
  faCog,
  faCodeBranch,
  faPlus,
  faCheck,
  faTrash,
  faStopwatch,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import { getRealmApp, getRealm } from "./services/realm";
import RealmContext from "./contexts/RealmContext";
library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faTimes,
  faAnchor,
  faAmbulance,
  faAngleDoubleDown,
  faAllergies,
  faBabyCarriage,
  faAtom,
  faBan,
  faRunning,
  faUtensils,
  faTrashAlt,
  faCheckCircle,
  faFilter,
  faBell,
  faRedo,
  faLongArrowAltRight,
  faSquareRootAlt,
  faDivide,
  faLanguage,
  faFlask,
  faEllipsisV,
  faEllipsisH,
  faChevronLeft,
  faChevronRight,
  faGraduationCap,
  faMinusCircle,
  faClock,
  faCog,
  faCodeBranch,
  faPlus,
  faCheck,
  faTrash,
  faStopwatch,
  faBrain
);

const {ipcRenderer} = require('electron');

function App() {
  const [realmApp, setRealmApp] = useState(getRealmApp());
  const [realm, setRealm] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateState, setUpdateState] = useState('');
  

  useEffect(() => {
    const loadRealm = async () => {
      try {
        setRealm(await getRealm());
      } catch (error) {
        console.log('ERR: ', error.message);
      }
    }
    loadRealm();

    ipcRenderer.on('update-message', (_, data) => {
      if (data){
        const {state, message} = data;
        if (state === 'available'){
          setIsUpdating(true);
        }
        setUpdateState(message);
      }
    })

  }, []);
  
  return (
    <RealmContext.Provider value={{realmApp, setRealmApp, realm, setRealm}}>
      {isUpdating ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}>
          <h1>Updating</h1>
          <div>
            <h3>{updateState}</h3>
          </div>
        </div>
      ) : (
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<TasksScreen/>} />
              <Route path="/routines" element={<RoutinesScreen/>} />
              <Route path="/community" element={<Community/>} />
              <Route path="/study" element={<StudyScreen/>} />
              <Route
                path="/notifications-study"
                element={<NotificationsSudyCourses/>}
              />
              <Route
                path="/notifications-study-course/:courseName/:courseId"
                element={<NotificationsSudy/>}
              />
              <Route path="/flash-cards" element={<FlashCardsCourses/>} />
              <Route
                path="/flash-cards-course/:courseName/:courseId"
                element={<FlashCards/>}
              />
              <Route path="/pomodoros" element={<Pomodoros/>} />
              <Route path="/exams" element={<Exams/>} />
              <Route path="/settings" element={<Settings/>} />
            </Routes>
          </div>
        </Router>
      )}
    </RealmContext.Provider>
  );
}

export default App;
