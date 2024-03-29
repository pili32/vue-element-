import axios from "axios";
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
console.log(getToken(),'getTokengetTokengetToken');
console.log(process);

const service = axios.create({
    // baseURL: process.env, // url = base url + request url
    // baseURL:  process.env.VUE_APP_API_URL+'http://localhost:8080/api', // url = base url + request url
    baseURL:process.env.NODE_ENV === "development"
    ? "api"                  // ? "http:/localhost:8039"
    :  process.env.VUE_APP_API_URL,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

service.interceptors.request.use(
    config => {
        // if (store.getters.token) {
        // }
        config.headers['Authorization'] = getToken()
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        console.log(response);
        const res = response.data
        if (res.code !== 200) {
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.msg || 'Error'))

        } else {
            return res

        }

    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.msg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
