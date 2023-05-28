import React from 'react';

const data = [
    {
        id:1,
        name: "Cloturer les taches Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias autem est molestiae porro. Est, ullam recusandae sit dignissimos quasi perferendis!" ,
        projet :"Projets test"
    },
    {
        id:2,
        name: "Envoyer le mail ",
        projet :"Projets test2"
    },
    {
        id:3,
        name: "Voir le comptable",
        projet :"Projets test3"
    },
    {
        id:4,
        name: "Deployer",
        projet :"Projets test4"
    },
    {
        id:5,
        name: "Deployer",
        projet :"Projets test4"
    },
    {
        id:6,
        name: "Deployer",
        projet :"Projets test4"
    },
    {
        id:7,
        name: "Deployer",
        projet :"Projets test4"
    },
    {
        id:8,
        name: "Deployer",
        projet :"Projets test4"
    },
]


function List({ data }) {
    return (
      <div>
        {data.map((item, index) => (
            <div className='uscflt-tasks' key={index}>
                
                <div className="uscflt-tasks-check">
                        <input type="checkbox" id={`myCheckbox${item.id}`} />
                        <label htmlFor={`myCheckbox${item.id}`}>
                            <span>&#10003;</span>
                        </label>
                </div>
                <div className="uscflt-tasks-name" >{item.name}</div>
                <div className="uscflt-tasks-chevron"><span>&#10148;</span></div>
                
            </div>
            
        
        ))}
      </div>
    );
  }

const Tasks = () => {
    
    return (        
            <List data={data} />
    );
};

export default Tasks;