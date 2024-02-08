import React, { ReactNode, createContext, useContext, useReducer } from "react";

import { useAuthenticator } from "@aws-amplify/ui-react";

interface AppState {
  screen: "Collection" | "Manifest" | "Canvas";
  activeCanvas?: string;
  activeManifest?: string;
  authToken?: string;
  collection?: string;
}

enum ActionTypes {
  SET_SCREEN = "SET_SCREEN",
  SET_ACTIVE_CANVAS = "SET_ACTIVE_CANVAS",
  SET_ACTIVE_MANIFEST = "SET_ACTIVE_MANIFEST",
}

type AppAction =
  | { type: ActionTypes.SET_SCREEN; payload: AppState["screen"] }
  | { type: ActionTypes.SET_ACTIVE_CANVAS; payload: AppState["activeCanvas"] }
  | {
      type: ActionTypes.SET_ACTIVE_MANIFEST;
      payload: AppState["activeManifest"];
    };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
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

const AppContext = createContext<
  | {
      state: AppState;
      dispatch: React.Dispatch<AppAction>;
    }
  | undefined
>(undefined);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    screen: "Collection",
  });

  /**
   * get the authToken from the useAuthenticator() hook
   */
  const { user } = useAuthenticator();
  const authToken = user?.signInUserSession.idToken.jwtToken;

  /**
   * get IIIF base url from vite environment variables
   */
  const iiifBaseUrl = import.meta.env.VITE_IIIF_BASE_URL;
  const collection = `${iiifBaseUrl}/collection.json`;

  return (
    <AppContext.Provider
      value={{ state: { ...state, authToken, collection }, dispatch }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext, ActionTypes };
