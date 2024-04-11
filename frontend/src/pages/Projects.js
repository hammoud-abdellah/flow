import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import AddProjectModal from '../components/Modals/AddProjectModal';
import Header from '../components/Header/Header';
import { useUser } from '../context';



function Projects() {
    const [showMyAddModal, setShowMyAddModal] =useState(false);

    const [projects, setProjects] = useState([]);
    const { user, setUser } = useUser();

      const [searchInput, setSearchInput] = useState("");

      useEffect(() => {
        // Fonction pour récupérer les projets
        const fetchProjects = async () => {
            try {
                const response = await fetch(`http://localhost:8080/Project/${user?.userId}`,{
                  credentials:"include"
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error(error);
            }
        };

        // Appel de la fonction pour récupérer les projets
        fetchProjects();
    }, []);

      const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
      };

      const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchInput.toLowerCase()) || project.descriptionProjet.toLowerCase().includes(searchInput.toLowerCase())
      );

      const handleDeleteProject =async (targetIndex) => {
        try {
          const response = await fetch(`http://localhost:8080/Project/${targetIndex}`, {
              method: 'DELETE',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
  
          if (response.ok) {
              setProjects(prevProjects => prevProjects.filter((projet, idx) => projet?._id !== targetIndex));
          } else {
              // Récupère les données d'erreur
              const errorData = await response.json();
              throw new Error(errorData.error);
          }
      } catch (error) {
          console.error('Error deleting project:', error);
          // Gérer l'erreur ici
      }
      };
    
      const handleEditProject = (idx) => {
  
      };
    
  return (

    <div>
      <Header/>
      <div className='add-prjctANDsearch w-full pt-6 px-6 m-3 flex justify-between'>
        <div className='search'>
          <form>
                  <input className="searchInput p-2 rounded-lg"
                      placeholder='Search for project'
                      type='text'
                      value={searchInput}
                      onChange={handleSearchChange}
                  />
          </form>
        </div>
        <div className='add-prjct flex justify-center'>
            <button 
                  value="addProject" 
                  onClick={() => {setShowMyAddModal(true)}}
                  className=" bg-white hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-md"
                  >
                  + Add Project
            </button>
        </div>
      </div>
      <div className="table-wrapper w-full p-6 m-3">
        <table className="block overflow-hidden table-fixed border-collapse shadow-lg rounded-lg whitespace-nowrap max-w-full mx-auto overflow-x-auto">
          <thead className="bg-black text-white">
            <tr>
              <th className=''>Name</th>
              <th className="w-full">Description</th>
              <th className=''>Status</th>
              <th className=''>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-gray-200'>
                  <ProjectCard projects={filteredProjects} deleteProject={handleDeleteProject} editProject={handleEditProject}/>
          </tbody>
        </table>
      </div>
      <AddProjectModal onClose={(e) => {setShowMyAddModal(false)}} setProjects={setProjects} visible={showMyAddModal}/>
    </div>
  )
}

  

export default Projects