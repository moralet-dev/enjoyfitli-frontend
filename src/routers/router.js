import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "@/views/HomePage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import Memberships from "@/views/profile-pages/Memberships.vue";
import Schedule from "@/views/profile-pages/Schedule.vue";
import MyNutritionBalance from "@/views/profile-pages/MyNutritionBalance.vue";
import PurchaseHistory from "@/views/profile-pages/PurchaseHistory.vue";
import Settings from "@/views/profile-pages/SettingsPage.vue";
import SchedulePage from "@/views/SchedulePage.vue";
import MembershipsPage from "@/views/MembershipsPage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import ActivationPage from "@/views/ActivationPage.vue";

const routes = [
    {path: '/', component: HomePage, name: 'home'},
    {path: '/schedule', component: SchedulePage, name: 'schedule'},
    {path: '/memberships', component: MembershipsPage, name: 'memberships'},
    {path: '/reset-password', component: ResetPasswordPage, name: 'reset-password'},
    {path: '/activate/:uid/:token', component: ActivationPage, name: 'activate'},
    {
        path: '/profile', component: ProfilePage, name: 'profile', children: [
            {path: 'memberships', component: Memberships, name: 'my-memberships'},
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