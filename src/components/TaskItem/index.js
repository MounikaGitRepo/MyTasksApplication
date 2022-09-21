import './index.css'
import {MdDeleteOutline} from 'react-icons/md'

const TaskItem = props => {
  const {taskDetails, deleteTask, toggleCheckBox} = props
  const {taskLabel, isChecked, completionDate, id} = taskDetails
  const checkedStatus = isChecked ? 'completed' : 'incomplete'
  const checkedStatusClsName = isChecked ? 'completedCls' : 'incompletedCls'

  const onDelete = () => {
    deleteTask(id)
  }
  const onChangeCheckboxStatus = () => {
    toggleCheckBox(id)
  }

  return (
    <li className="label-container ">
      <input
        className="checkbox-input"
        type="checkbox"
        id="inputElement"
        checked={isChecked}
        onChange={onChangeCheckboxStatus}
      />
      <div className="row-container">
        <label className="checkbox-label">{taskLabel}</label>
        <div className="status-delete-container">
          <span className={checkedStatusClsName}>{checkedStatus}</span>
          <span className="date-span">{completionDate}</span>
          <button
            type="button"
            className="delete-icon-container"
            onClick={onDelete}
          >
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TaskItem
