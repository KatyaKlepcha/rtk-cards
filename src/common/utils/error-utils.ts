import { Dispatch } from "redux";

export const handleServerAppError = <D>(data: any, dispatch: Dispatch, showError: boolean = true) => {
  if (showError) {
    console.log("data.messages[0]", data.messages[0]);
    //dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }
};
