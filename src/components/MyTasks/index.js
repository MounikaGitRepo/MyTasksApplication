import {v4 as uuidv4} from 'uuid'

import {Component} from 'react'
import TaskItem from '../TaskItem'
import TasksReport from '../TasksReport'
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

const getWeekCompletionPer = week => {
  const {total, completed, weekNum} = week

  return {weekNum, per: Math.floor((completed / total) * 100)}
}

class MyTasks extends Component {
  state = {
    taskUserInput: '',
    tasks: [],
    completionDate: '',
    showStats: false,
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

  statisticsClicked = () => {
    console.log('statistics clicked')
    this.setState(prev => ({showStats: !prev.showStats}))
  }

  getWeekProgress = () => {
    const {tasks} = this.state
    const arr = [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    ]

    let date

    let week1Count = 0
    let week2Count = 0
    let week3Count = 0
    let week4Count = 0

    let week1Compl = 0
    let week2Compl = 0
    let week3Compl = 0
    let week4Compl = 0

    tasks.map(each => {
      date = new Date(each.completionDate)

      const num = date.getDate()
      if (arr[0].includes(num)) {
        week1Count += 1
        if (each.isChecked) {
          week1Compl += 1
        }
      } else if (arr[1].includes(num)) {
        week2Count += 1
        if (each.isChecked) {
          week2Compl += 1
        }
      } else if (arr[2].includes(num)) {
        week3Count += 1
        if (each.isChecked) {
          week3Compl += 1
        }
      } else if (arr[3].includes(num)) {
        week4Count += 1
        if (each.isChecked) {
          week4Compl += 1
        }
      }
      return {week1Count, week2Count, week3Count, week4Count}
    })

    const weekDetails = [
      {
        weekNum: 1,
        total: week1Count,
        completed: week1Compl,
      },
      {
        weekNum: 2,
        total: week2Count,
        completed: week2Compl,
      },
      {
        weekNum: 3,
        total: week3Count,
        completed: week3Compl,
      },
      {
        weekNum: 4,
        total: week4Count,
        completed: week4Compl,
      },
    ]

    // console.log(weekDetails)
    const weekCompletionPercentages = weekDetails.map(eachWeek =>
      getWeekCompletionPer(eachWeek),
    )

    return (
      <div className="tasks-progress-container">
        {tasks.length === 0 ? (
          <h1>NOTHING TO SHOW!!</h1>
        ) : (
          <>
            <h1 className="task-progress-heading">
              Week Wise Tasks Completion Progress
            </h1>
            {weekCompletionPercentages.map(eachPer => (
              <TasksReport
                progress={eachPer.per}
                height={30}
                weekNum={eachPer.weekNum}
              />
            ))}
          </>
        )}
      </div>
    )
  }

  onLogout = () => {
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {taskUserInput, tasks, completionDate, showStats} = this.state
    const progressBtnText = showStats
      ? 'Hide Progress'
      : 'Show Week Wise Progress'

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
            {tasks.length === 0 ? (
              <p className="no-tasks-msg">No tasks, keep adding new tasks!!</p>
            ) : (
              <>
                {' '}
                {tasks.map(eachTask => (
                  <TaskItem
                    key={eachTask.id}
                    taskDetails={eachTask}
                    deleteTask={this.deleteTask}
                    toggleCheckBox={this.toggleCheckBox}
                  />
                ))}{' '}
              </>
            )}
          </ul>
        </div>
        <button
          type="button"
          className="get-statistics"
          onClick={this.statisticsClicked}
        >
          {progressBtnText}
        </button>

        {showStats && this.getWeekProgress()}
      </div>
    )
  }
}

export default MyTasks
