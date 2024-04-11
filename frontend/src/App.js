import "./App.css"
import AddTaskModal from "./components/Modals/AddTaskModal";

import KanbanBoard from "./pages/KanbanBoard";

import Login from "./pages/Login/Login";
import EditTaskModal from "./components/Modals/EditTaskModal";
import styles from "./index.css"
import { useEffect, useState } from "react";
import Projects from "../src/pages/Projects";
import{BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Header from "./components/Header/Header";
import { useUser } from "./context";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"
import { useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";


const ProtectedRoute = ({ children }) => {
  const navigate=useNavigate();
  
  const { user, setUser } = useUser();
  useEffect(() => {
    const token = Cookies.get('jwt');
    if (!token ) {
      navigate('/login');
    } else if (JSON.stringify(user) === '{}') {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        setUser({});
      }
    }
  }, [user, setUser]);
  if (user.name) {
    return children;
  } else {
    return null;
  }
}

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/projects" />} />
        <Route exact path='/projects' element={<ProtectedRoute> <Projects/> </ProtectedRoute>}/>
        <Route exact path="/kanban/:projectId" element={<ProtectedRoute> <KanbanBoard/> </ProtectedRoute>}/>
      </Routes>
    </Router>

  );
}

export default App;
