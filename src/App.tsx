import styles from './App.module.scss';
import { CalculatorConstructor } from './components/organism/CalculatorConstructor/CalculatorConstructor';


const App = () => {
  return (
    <div className={styles.app}>
      <CalculatorConstructor />
    </div>
  );
}

export default App;
