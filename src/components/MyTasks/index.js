import {v4 as uuidv4} from 'uuid'

import {Component} from 'react'
import TaskItem from '../TaskItem'
import './index.css'

const getTasksListFromLocalStorage = () => {
  const stringifiedTasksList = localStorage.getItem('tasksList')
  const parsedTasksList = JSON.parse(stringifiedTasksList)
  if (parsedTasksList === null) {
    return []
  }
  return parsedTasksList
}
const tasksList = getTasksListFromLocalStorage()

class MyTasks extends Component {
  state = {
    taskUserInput: '',
    tasks: [],
    completionDate: '',
  }

  componentDidMount() {
    this.setState({tasks: tasksList})
  }

  saveButton = () => {
    const {tasks} = this.state
    localStorage.setItem('tasksList', JSON.stringify(tasks))
  }

  onAddTask = () => {
    const {taskUserInput, completionDate} = this.state
    const newTask = {
      id: uuidv4(),
      completionDate,
      isChecked: false,
      taskLabel: taskUserInput,
    }
    if (taskUserInput === '') {
      alert("task can't be empty ... Pls, create your task!!")
      return
    }
    if (completionDate === '') {
      alert('mention task completion date!!')
      return
    }

    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask],
      taskUserInput: '',
      completionDate: '',
    }))
  }

  deleteTask = id => {
    const {tasks} = this.state
    const filteredTasks = tasks.filter(each => each.id !== id)
    console.log(id)
    this.setState({tasks: filteredTasks})
  }

  onChangeDate = event => {
    this.setState({completionDate: event.target.value})
  }

  onChangeUserTaskInput = event => {
    this.setState({taskUserInput: event.target.value})
  }

  toggleCheckBox = id => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(eachTask => {
        if (id === eachTask.id) {
          return {...eachTask, isChecked: !eachTask.isChecked}
        }
        return eachTask
      }),
    }))
  }

  getStatistics = () => {
    console.log('statistics clicked')
  }

  onLogout = () => {
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {taskUserInput, tasks, completionDate} = this.state

    return (
      <div className="tasks-page-container">
        <button type="button" className="logout-btn" onClick={this.onLogout}>
          Logout
        </button>
        <h1 className="welcome-back-heading">Welcome Back</h1>

        <div>
          <p className="create-task-heading">Create Your Task Here</p>

          <input
            type="text"
            value={taskUserInput}
            className="todo-user-input"
            placeholder="What you want to do?"
            onChange={this.onChangeUserTaskInput}
          />
          <label className="completion-time" htmlFor="date">
            Task completion time :{' '}
          </label>
          <input
            type="date"
            id="date"
            value={completionDate}
            className="date-input"
            onChange={this.onChangeDate}
          />

          <button type="button" className="add-button" onClick={this.onAddTask}>
            Add task
          </button>
          <div className="mytasks-save-btn-container">
            <h1 className="tasks-items-heading">My Tasks</h1>
            <button
              type="button"
              className="save-button"
              onClick={this.saveButton}
            >
              Save Task
            </button>
          </div>
          <ul className="task-items-container" id="todoItemsContainer">
            {tasks.map(eachTask => (
              <TaskItem
                key={eachTask.id}
                taskDetails={eachTask}
                deleteTask={this.deleteTask}
                toggleCheckBox={this.toggleCheckBox}
              />
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="get-statistics"
          onClick={this.getStatistics}
        >
          Show Week Wise Report
        </button>
      </div>
    )
  }
}

export default MyTasks
