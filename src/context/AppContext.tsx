import React, { ReactNode, createContext, useContext, useReducer } from "react";

// Define the initial state for your context
interface AppState {
  loggedIn: boolean;
  screen: "Collection" | "Manifest" | "Canvas";
  activeCanvas?: string;
  activeManifest?: string;
}

// Define the actions you can dispatch
enum ActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_SCREEN = "SET_SCREEN",
  SET_ACTIVE_CANVAS = "SET_ACTIVE_CANVAS",
  SET_ACTIVE_MANIFEST = "SET_ACTIVE_MANIFEST",
}

// Define action types
type AppAction =
  | { type: ActionTypes.LOGIN }
  | { type: ActionTypes.LOGOUT }
  | { type: ActionTypes.SET_SCREEN; payload: AppState["screen"] }
  | { type: ActionTypes.SET_ACTIVE_CANVAS; payload: AppState["activeCanvas"] }
  | {
      type: ActionTypes.SET_ACTIVE_MANIFEST;
      payload: AppState["activeManifest"];
    };

// Create a reducer function to handle state changes based on actions
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { ...state, loggedIn: true };
    case ActionTypes.LOGOUT:
      return { ...state, loggedIn: false };
    case ActionTypes.SET_SCREEN:
      return { ...state, screen: action.payload };
    case ActionTypes.SET_ACTIVE_CANVAS:
      return { ...state, activeCanvas: action.payload };
    case ActionTypes.SET_ACTIVE_MANIFEST:
      return { ...state, activeManifest: action.payload };
    default:
      return state;
  }
};

// Create the context
const AppContext = createContext<
  | {
      state: AppState;
      dispatch: React.Dispatch<AppAction>;
    }
  | undefined
>(undefined);

// Create a custom hook for using the context
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Create a context provider component
interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    loggedIn: false,
    screen: "Collection",
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext, ActionTypes };