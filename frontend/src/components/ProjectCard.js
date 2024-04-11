import React, { useState } from 'react'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import UpdateProjectModal from './Modals/UpdateProjectModal';

function ProjectCard({ projects, deleteProject }) {

  const [showMyEditModal, setShowMyEditModal] =useState(false);

  const handleEditProject = (idx) => {
   setShowMyEditModal(true)

  };

  const onSave = (e)=> {

  }


  return (
    <>
    {projects.map((project, idx) => {
        const statusText =
          project.status.charAt(0).toUpperCase() + project.status.slice(1);
        const statusColor = getStatusColor(project.status);

        return (
          <>
          <tr key={project?._id} className="hover:bg-gray-300">
            <td className="p-3"><Link to={`/kanban/${project?._id}`}>{project.title}</Link></td>
            <td className="w-full p-3 overflow-hidden overflow-ellipsis flex justify-center">{project.descriptionProjet}</td>

            <td className="p-3">
              <span className={`label ${statusColor} p-1 rounded-lg`}>{statusText}</span>
            </td>
            <td className="p-3 flex justify-between">
              <BsFillTrashFill
                className="delete-btn cursor-pointer text-red-600"
                onClick={() => deleteProject(project?._id)}
              />
              <BsFillPencilFill
                className="edit-btn cursor-pointer text-blue-600"
                onClick={() => handleEditProject(idx)}
              />
            </td>
          </tr>
          {showMyEditModal && (
                      <UpdateProjectModal 
                      project={project}
                      onSave= {onSave}
                      visible={showMyEditModal}
                      onClose={(e) => {setShowMyEditModal(false)}}
                />
          )}
         </>
        );
        
      })}
    </>
  )
}

function getStatusColor(status) {
  switch (status) {
    case 'INREVIEW':
      return 'bg-Orange';
    case 'DONE':
      return 'bg-green-600';
    case 'TODO':
      return 'bg-blue';
    default:
      return 'bg-blue';
  }
}

export default ProjectCard