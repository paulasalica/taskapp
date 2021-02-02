import React, { useState, useEffect } from 'react';
import {TaskRow} from './components/TaskRow';
import {TaskBanner} from './components/TaskBanner';
import {TaskCreator} from './components/TaskCreator';
import {VisibilityControl} from './components/VisibilityControl';

function App() {

  const [userName, setUserName] = useState('Paula');
  const [taskItems, settaskItems] = useState([
    {name:'Task One', done:false},
    {name:'Task Two', done:false},
    {name:'Task Three', done:true},
    {name:'Task Four', done:false}
  ]);
  const [showCompleted, setshowCompleted] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data != null) {
      settaskItems(JSON.parse(data));
    } else {
      setUserName('Paula Example');
      settaskItems([
        {name:'Task One Example', done:false},
        {name:'Task Two Example', done:false},
        {name:'Task Three Example', done:true},
        {name:'Task Four Example', done:false}
      ]);
      setshowCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      settaskItems([...taskItems, {name: taskName, done: false}])
    }
  }

  const toggleTask = task => 
    settaskItems(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t)));

  const taskTableRows = (doneValue) => {
    return (
      taskItems
      .filter(task => task.done === doneValue)
      .map(task => (
        <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
      ))
    )
    
  }
    
  return (
    <div>
      <TaskBanner username={userName} taskItems={taskItems} />
      <TaskCreator callback={createNewTask} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>
      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl description="Completed Tasks" isChecked={showCompleted} 
          callback={checked => setshowCompleted(checked)} />
      </div>

      {
        showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }

    </div>
  );
}

export default App;
