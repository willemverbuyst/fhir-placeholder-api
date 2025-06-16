import {
  GlobalState,
  StateMachineProvider,
  createStore,
} from "little-state-machine";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MULTI, POSITION, ROUTES } from "./constants";
import Home from "./pages/Home";
import TransformAndParse from "./pages/TransformAndParse";
import Result from "./pages/multi/Result";
import Start from "./pages/multi/Start";
import Step1 from "./pages/multi/Step1";
import Step2 from "./pages/multi/Step2";
import Step3 from "./pages/multi/Step3";
import Step4 from "./pages/multi/Step4";
import Multi from "./pages/multi/multi";

function log(store: GlobalState) {
  console.info(JSON.stringify(store));
  return store;
}

createStore(
  {
    data: {
      firstName: "",
      lastName: "",
      bsn: "",
      dateOfBirth: undefined,
      email: "",
      hasPhoneNumber: false,
      phoneNumber: "",
      files: undefined,
      position: POSITION[0],
      skills: [{ value: "" }],
    },
  },
  {
    middleWares: [log],
    persist: "none", // use "action" to persit data
  }
);

function App() {
  return (
    <StateMachineProvider>
      <main className="bg-slate-800 text-slate-100 p-4 h-screen flex justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl py-5">React Form Hook Playground</h1>
          <Router>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.MULTI} element={<Multi />}>
                <Route path={MULTI.START} element={<Start />} />
                <Route path={MULTI.STEP1} element={<Step1 />} />
                <Route path={MULTI.STEP2} element={<Step2 />} />
                <Route path={MULTI.STEP3} element={<Step3 />} />
                <Route path={MULTI.STEP4} element={<Step4 />} />
                <Route path={MULTI.RESULT} element={<Result />} />
              </Route>
              <Route
                path={ROUTES.TRANSFORM_AND_PARSE}
                element={<TransformAndParse />}
              />
            </Routes>
          </Router>
        </div>
      </main>
    </StateMachineProvider>
  );
}

export default App;
