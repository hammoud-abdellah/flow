import React, { useState } from 'react'
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FaRegEdit } from "react-icons/fa";
import {Avatar} from "antd";
import EditTaskModal from './Modals/EditTaskModal';

const Container = styled.div`
    border-radius: 10px;
    padding: 8px;
    color: #fff;
    margin-bottom: 8px;
    min-height: 120px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: ${(props) => bgcolorChange(props)};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    
`;

const TextContent = styled.div``;

const Icons = styled.div`
    display: flex;
    justify-content: end;
    padding: 2px;
`;
// ${(props) => bgcolorChange(props)}
function bgcolorChange(props) {
    return props.isDragging
        ? "#242424" : '#4c4c4c'

        // : props.isDraggable
        //     ? props.isBacklog
        //         ? "#F2D7D5"
        //         : "#DCDCDC"
        //     : props.isBacklog
        //         ? "#F2D7D5"
        //         : "#EAF4FC";
}

export default function Task({ task, index }) {

  const [showMyEditModal, setShowMyEditModal] =useState(false);

  
    return (

      <>
      <Draggable draggableId={`${task?._id}`} key={task?._id} index={index}>
        {(provided, snapshot) => (
          <Container
            className='flex overflow-auto'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onClick={() => {setShowMyEditModal(true)}}
          >
            <div  style={{ display: "flex", justifyContent: "start", padding: 2 }}>
              <div className='flex justify-between'>
                <small>
                  {"  "}
                </small>
                <small>
                  <FaRegEdit/>  
                </small>                      
              </div>
            </div>
  
            <div style={{ display: "flex", justifyContent: "center", padding: 2 }}>
              <TextContent>{task?.title}</TextContent>
            </div>  


            <div className='flex justify-between items-end p-2'>
              {/* <a className='text-white' href='#comments'>comments</a> */}
              <Icons>
                <div>
                  <Avatar
                    onClick={() => console.log(task)}
                    src={"https://joesch.moe/api/v1/random?key=" + 1}
                  />
                </div>
              </Icons>
              <a className='text-sm text-slate-300'>comments</a>
            </div>

            {provided.placeholder}
          </Container>
        )}
      </Draggable>

      {showMyEditModal && (
        <EditTaskModal
          task={task}
          visible={showMyEditModal}
          onClose={(e) => {setShowMyEditModal(false)}}
        />
      )}
      </>
    );
  }
  
  
