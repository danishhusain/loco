import { ApiRequest } from "./apiRequests";
import { addPageData, setProducts } from "../ReduxToolkit/features/productSlice";
import { setLoadingState } from "../ReduxToolkit/features/loadingSlice";
import { showMessage } from "react-native-flash-message";
import { loginSuccess } from "../ReduxToolkit/features/authSlice";

export const LogInMethod = (data) => async dispatch => {
    console.log("LogInMethod_props", data)

    dispatch(setLoadingState(true));

    try {
        const endUrl = `https://api.apptask.thekaspertech.com/api/users/login`;
        const method = "POST";
        const headers = {
            'Content-Type': 'application/json',
        };
        const body = JSON.stringify(data);


        try {


            const response = await ApiRequest(endUrl, method, headers, body);

            console.log('LogInMethod_resp', response)

            if (response?.token) {
                dispatch(loginSuccess(response));

                return response
            } else {
                showMessage({
                    message: `${response?.error}`,
                    type: "danger",
                })
            }



        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }
};



export const SignInMethod = (data) => async dispatch => {
    console.log("SignInMethod_props", data)

    const formData = new FormData();
    formData.append('name', `${data?.name}`);
    formData.append('email', `${data?.email}`);
    formData.append('password', `${data?.password}`);
    formData.append('age', `${data?.age}`);
    formData.append('profile_picture', data?.profile_picture);

    console.log(">", formData,)


    dispatch(setLoadingState(true));
    try {
        const endUrl = `https://api.apptask.thekaspertech.com/api/users/register`;
        const method = "POST";
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/json; charset=utf-8',
        };
        const body = formData


        try {


            const response = await ApiRequest(endUrl, method, headers, body);

            console.log("SignInMethod_resp", response);


            if (response?.message) {
                showMessage({
                    message: `${response?.message}`,
                    type: "success",
                })

                return response?.message
            } else {
                showMessage({
                    message: `${response?.error}`,
                    type: "danger",
                })
                return response?.error

            }



        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error ",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};
