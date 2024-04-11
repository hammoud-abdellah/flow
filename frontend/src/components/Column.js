import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './Task';
import AddTaskModal from './Modals/AddTaskModal';

const Container = styled.div`
    background-color: #1c1c1c;
    border-radius: 8px;
    margin: 10px;
    width: 300px;
    height: 500px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border: 1px solid gray;
`;

const Title = styled.h3`
    padding: 8px;
    background-color: pink;
    text-align: center;
`;

const TaskList = styled.div`
    padding: 3px;
    transistion: background-color 0.2s ease;
    background-color: #1c1c1c;
    flex-grow: 1;
    min-height: 100px;
`;

export default function Column({title, tasks, id}) {

    const [showMyAddModal, setShowMyAddModal] =useState(false);

  return (
    
  <>
    <Container className="column">
        <Title
            style={{
                backgroundColor: "#fff",
                position: "sticky",
                top: "0",
            }}>

            {title}
        </Title>
        <Droppable droppableId={id}>
            {(provided, snapshot) => (
                <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    // isdraggingover={snapshot.isDraggingOver}
                    
                >        
                    {tasks.map((task, index) => (
                        <Task key={index} index={index} task={task} />
                    ))} 
                    
                    {provided.placeholder}
                </TaskList>
            )}
        </Droppable>
        <div className='felx justify-center items-center bg-slate-300 text-black rounded-md  m-2 '>
            <button 
                onClick={() => {setShowMyAddModal(true)}}
                className='items-center  px-10 py-1'
            >+ Add Task</button>
        </div>
    </Container>
    <AddTaskModal onClose={(e) => {setShowMyAddModal(false)}} visible={showMyAddModal}/>
  </>   
   

  )
}
