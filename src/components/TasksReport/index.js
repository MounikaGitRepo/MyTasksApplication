import './index.css'

const TasksReport = ({progress, height, weekNum}) => {
  //   console.log(progress)
  let getColorProgress
  if (progress <= 30) {
    getColorProgress = 'red'
  } else if (progress <= 50) {
    getColorProgress = 'purple'
  } else if (progress <= 75) {
    getColorProgress = 'yellow'
  } else if (progress <= 100) {
    getColorProgress = 'green'
  }

  let progressNum
  if (progress <= 100) {
    progressNum = `${progress}%`
  } else {
    progressNum = ''
  }

  const Parentdiv = {
    height,
    width: '100%',
    backgroundColor: 'whitesmoke',
    borderRadius: 50,
    margin: 30,
  }

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: getColorProgress,
    borderRadius: 40,
    textAlign: 'right',
  }

  const progresstext = {
    padding: 15,
    color: 'black',
    fontWeight: 1000,
  }

  return (
    <div className="row-container">
      <span className="week-heading">Week{weekNum}</span>
      <div style={Parentdiv}>
        <div style={Childdiv}>
          <span style={progresstext}>{progressNum}</span>
        </div>
      </div>
    </div>
  )
}

export default TasksReport
