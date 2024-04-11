import React, { useState } from 'react';
import { useUser } from '../../context';

function AddProjectModal({visible, onClose,setProjects}) {
    const { user, setUser } = useUser();
    const [error, setError] = useState(null);

    if (!visible) return null;

    const handleOnClose = (e) => {
      if (e.target.id === "container") onClose();
    }

    const handleSubmit =async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const projectData = {
          title: formData.get('ProjectTitle'),
          descriptionProjet: formData.get('ProjectDesc'),
          status: formData.get('status'),
      };
      console.log('New Project Data:', projectData);

      try {
        const response = await fetch('http://localhost:8080/Project/'+user?.userId , {
            method: 'POST',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        const data=await response.json()
        setProjects(prev=>[...prev,data]);
        onClose(); // Fermer le modal après avoir soumis avec succès
        } catch (error) {
            setError(error.message); // En cas d'erreur, afficher le message d'erreur
        }
    }

    return (
      <div 
        id='container' 
        onClick={handleOnClose}
        className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex flex-col justify-center items-center h-screen text-white"
      >
        <div className='bg-black p-9 rounded-2xl w-96'>
        <h1 className='text-3xl mt-0 mb-6 pb-3 flex justify-center border-b-2 border-t-gray-400'>Add New Project</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
                    name='ProjectTitle'
                    className="form-input mt-1 block w-full border border-gray-400 rounded-md px-3 py-2"
                    type="text"
                    placeholder="Your Project Title"
                    required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
                	name='ProjectDesc'
                    className="form-input mt-1 block w-full border border-gray-400 rounded-md px-3 py-2"               
                    type="text"
                    placeholder="Enter your Project description here"
                    required
            />
          </div>
          <div className="mb-9">
              <label className="block text-sm font-medium">Status</label>
              <select 
                name="status" 
                id="Projects"
                className="form-input mt-1 block w-full border border-gray-400 rounded-md px-3 py-2"
                required
                >
                  <option value="TODO">To Do</option>
                  <option value="DONE">Done</option>
                  <option value="INREVIEW">In Progress</option>
              </select>
          </div>
          <div className='flex justify-center'>
              <button 
                type='submit' 
                value="addProject" 
                className=" bg-white hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-md"
                >
                Add Project
              </button>
          </div>          

          </form>
          </div>            
      </div>
    );
}

export default AddProjectModal;

