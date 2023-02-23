import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";

const routes = [
    {path: '', component: HomePage, name: 'home'},
    {path: '/login', component: LoginPage, name: 'login'},
    {path: '/profile', component: ProfilePage, name: 'profile'},
    {path: '/registration', component: RegistrationPage, name:'registration'},
]

export const router = createRouter(
    {history: createWebHistory(), routes, }
)