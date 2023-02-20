import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import ProfilePage from "@/views/ProfilePage.vue";

const routes = [
    {path: '', component: HomePage},
    {path: '/login', component: LoginPage},
    {path: '/profile', component: ProfilePage}
]

export const router = createRouter(
    {history: createWebHistory(), routes,}
)