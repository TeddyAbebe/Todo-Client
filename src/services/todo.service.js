import axios from "axios";
import { Constants } from "../utils";


class TodoService {

    async createTodo(formData){
        return axios.post(`${Constants.baseUrl}/todo`, formData);
    }

    async getTodoByCollectionId(id){
        return axios.get(`${Constants.baseUrl}/todo/col/${id}`);
    }

    async getAllTodo(){
        return axios.get(`${Constants.baseUrl}/todo`);
    }

    async getTodoById(id){
        return axios.get(`${Constants.baseUrl}/todo/${id}`);
    }

    async updateTodo(id, formData){
        return axios.put(`${Constants.baseUrl}/todo/${id}`, formData);
    }

    async completeTodo(id, formData){
        return axios.put(`${Constants.baseUrl}/todo/complete/${id}`, formData);
    }

    async deleteTodo(id){
        return axios.put(`${Constants.baseUrl}/todo/${id}`);
    }

}

export default TodoService;