import { AppRegistry } from 'react-native'
import './index.css';
import AppStore from './components/AppStore';

// App registration and rendering
AppRegistry.registerComponent('MyApp', () => AppStore)
AppRegistry.runApplication('MyApp', { rootTag: document.getElementById('root') })


/*
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/