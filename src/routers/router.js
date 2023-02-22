import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";

const routes = [
    {path: '', component: HomePage},
    {path: '/login', component: LoginPage},
    {path: '/profile', component: ProfilePage},
    {path: '/registration', component: RegistrationPage},
]

export const router = createRouter(
    {history: createWebHistory(), routes,}
)