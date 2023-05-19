import auth from './modules/auth'
import draggable from './modules/draggable'

const directivesList = {
  auth,
  draggable
}

const directives = {
  install: function (app) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
