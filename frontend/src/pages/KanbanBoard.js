import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from "../components/Column";
import Header from "../components/Header/Header";

function KanbanBoard() {
    const [DONE, setDONE] = useState([]);
    const [TODO, setTODO] = useState([]);
    const [BACKLOG, setBACKLOG] = useState([]);
    const [INREVIEW, setINREVIEW] = useState([]);
    const { projectId } = useParams();


    useEffect(() => {
        fetch(`http://localhost:8080/Project/${projectId}/tasks`,{
            headers: { 'Content-Type': 'application/json' },
            credentials:'include'
        })
        .then((response) => response.json())
        .then((json) => {
            // Filter tasks based on their status
            setTODO(json.filter((task) => task.etatStatus === "TODO"));
            setDONE(json.filter((task) => task.etatStatus === "DONE"));
            setINREVIEW(json.filter((task) => task.etatStatus === "INREVIEW"));
            setBACKLOG(json.filter((task) => task.etatStatus === "BACKLOG"));
        });
    }, []);


    useEffect(() => {
        // Update tasks in the backend when the local state changes
        updateTasks(DONE, "DONE");
        updateTasks(TODO, "TODO");
        updateTasks(BACKLOG, "BACKLOG");
        updateTasks(INREVIEW, "INREVIEW");
    }, [DONE, TODO, BACKLOG, INREVIEW]);

    const updateTasks = (tasks, etatStatus) => {
        tasks.forEach(task => {
            fetch(`http://localhost:8080/tasks/${task._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ etatStatus })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update task');
                }
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
        });
    };

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        const task = findItemById(draggableId);

        // Remove the task from the source column
        deletePreviousState(source.droppableId, draggableId);

        // Add the task to the destination column
        setNewState(destination.droppableId, task);
    }

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setTODO(prevState => removeItemById(taskId, prevState));
                break;
            case "2":
                setDONE(prevState => removeItemById(taskId, prevState));
                break;
            case "3":
                setINREVIEW(prevState => removeItemById(taskId, prevState));
                break;
            case "4":
                setBACKLOG(prevState => removeItemById(taskId, prevState));
                break;
            default:
                break;
        }
    }

    function setNewState(destinationDroppableId, task) {
        switch (destinationDroppableId) {
            case "1":   // TO DO
                setTODO(prevState => [task, ...prevState]);
                break;
            case "2":  // DONE
                setDONE(prevState => [task, ...prevState]);
                break;
            case "3":  // IN REVIEW
                setINREVIEW(prevState => [task, ...prevState]);
                break;
            case "4":  // BACKLOG
                setBACKLOG(prevState => [task, ...prevState]);
                break;
            default:
                break;
        }
    }

    function findItemById(id) {
        return [...TODO, ...DONE, ...INREVIEW, ...BACKLOG].find((item) => item._id === id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item._id !== id);
    }

  return (
        <>
         <Header />
            <DragDropContext onDragEnd={handleDragEnd}>
                <h2 style={{ textAlign: "center", color: "#ffff", margin: "25px" }}>KANBAN BOARD</h2>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: "20px" }}>
                    <Column title={"TO DO"} tasks={TODO} id={"1"} />
                    <Column title={"DONE"} tasks={DONE} id={"2"} />
                    <Column title={"IN REVIEW"} tasks={INREVIEW} id={"3"} />
                    <Column title={"BACKLOG"} tasks={BACKLOG} id={"4"} />
                </div>
            </DragDropContext>
        </>

  )
}


export default KanbanBoard




