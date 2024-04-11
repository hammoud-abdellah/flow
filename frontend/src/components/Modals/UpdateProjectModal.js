import React, { useEffect, useState } from 'react'

function UpdateProjectModal({ project, onSave,visible, onClose }) {
    
    
    const id = project.id;
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.descriptionProjet);
    const [status, setStatus] = useState(project.status);



    // Handle form submission
    const handleSubmit =(e) => {
        e.preventDefault();
        const updatedProject = {
            ...project,
            title,
            description,
            status,
        };
        onSave(updatedProject);
    };

    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    }
  


    if (!visible) return null;

  return (
    <div  
    className='block fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm'
    onClick={handleOnClose}
    >
        <section id='container' className="updateProject flex flex-col justify-center items-center h-screen text-white">
            <div className='bg-black p-9 w-96'>
                <h1 className='text-3xl mt-0 mb-6 pb-3 flex justify-center border-b-2 border-t-gray-400'>Update Project</h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input focus:outline-none mt-1 block w-full border border-gray-400 rounded-md px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-input mt-1 block w-full border border-gray-400 rounded-md px-3 py-2"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-input mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none"
                    >
                         <option value="TODO">To Do</option>
                         <option value="DONE">Done</option>
                         <option value="INREVIEW">In Progress</option>
                    </select>
                </div>
                <div className='flex justify-center'>
                    <button
                        onClick={handleSubmit}
                        className="bg-white hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-md"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default UpdateProjectModal