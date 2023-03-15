import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import Memberships from "@/views/profile-pages/Memberships.vue";
import Schedule from "@/views/profile-pages/Schedule.vue";
import MyNutritionBalance from "@/views/profile-pages/MyNutritionBalance.vue";
import PurchaseHistory from "@/views/profile-pages/PurchaseHistory.vue";
import Settings from "@/views/profile-pages/SettingsPage.vue";

const routes = [
    {path: '/', component: HomePage, name: 'home'},
    {path: '/login', component: LoginPage, name: 'login'},
    {path: '/registration', component: RegistrationPage, name: 'registration'},
    {path: '/schedule', component: Schedule, name: 'schedule'},

    {
        path: '/profile', component: ProfilePage, name: 'profile', children: [
            {path: 'memberships', component: Memberships, name: 'memberships'},
            {path: 'schedule', component: Schedule, name: 'my-schedule'},
            {path: 'my-nutrition-balance', component: MyNutritionBalance, name: 'my-nutrition-balance'},
            {path: 'purchase-history', component: PurchaseHistory, name: 'purchase-history'},
            {path: 'settings', component: Settings, name: 'settings'},
        ]
    },
]

export const router = createRouter(
    {history: createWebHistory(), routes},
)