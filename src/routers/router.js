import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "@/views/Home/HomePage.vue";
import ProfilePage from "@/views/Profile/ProfilePage.vue";
import Memberships from "@/views/Profile/profile-pages/Memberships.vue";
import Schedule from "@/views/Profile/profile-pages/Schedule.vue";
import MyNutritionBalance from "@/views/Profile/profile-pages/MyNutritionBalance.vue";
import PurchaseHistory from "@/views/Profile/profile-pages/PurchaseHistory.vue";
import Settings from "@/views/Profile/profile-pages/SettingsPage.vue";
import SchedulePage from "@/views/Shcedule/SchedulePage.vue";
import MembershipsPage from "@/views/Memberships/MembershipsPage.vue";
import ResetPasswordConfirm from "@/views/ResetPasswordConfirm.vue";
import ActivationPage from "@/views/ActivationPage.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import AboutMePage from "@/views/AboutMePage.vue";

const routes = [
    {path: '/', component: HomePage, name: 'home'},
    {path: '/schedule', component: SchedulePage, name: 'schedule'},
    {path: '/memberships', component: MembershipsPage, name: 'memberships'},
    {path: '/password-reset', component: ResetPassword, name: 'reset-password'},
    {path: '/password-reset/confirm/:uid/:token', component: ResetPasswordConfirm, name: 'reset-password-confirm'},
    {path: '/activate/:uid/:token', component: ActivationPage, name: 'activate'},
    {path: '/about', component: AboutMePage, name: 'about'},
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