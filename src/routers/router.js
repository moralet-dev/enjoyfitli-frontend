import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "@/views/Home/HomePage.vue";
import ProfilePage from "@/views/Profile/ProfilePage.vue";
import Memberships from "@/views/Profile/profile-pages/Memberships.vue";
import Schedule from "@/views/Profile/profile-pages/Schedule.vue";
import MyNutritionBalance from "@/views/Profile/profile-pages/MyNutritionBalance.vue";
import PurchaseHistory from "@/views/Profile/profile-pages/PurchaseHistory.vue";
import Settings from "@/views/Profile/profile-pages/SettingsPage.vue";
import MembershipsPage from "@/views/Memberships/MembershipsPage.vue";
import ResetPasswordConfirm from "@/views/ResetPasswordConfirm.vue";
import ActivationPage from "@/views/ActivationPage.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import AboutMePage from "@/views/AboutMePage.vue";
import SchedulePage from "@/views/Schedule/SchedulePage.vue";

const routes = [
    {path: '/', component: HomePage, name: 'home'},
    {path: '/memberships', component: MembershipsPage, name: 'memberships'},
    {path: '/schedule', component: SchedulePage, name: 'schedule'},
    {path: '/password-reset', component: ResetPassword, name: 'reset-password'},
    {path: '/password-reset/confirm/:uid/:token', component: ResetPasswordConfirm, name: 'reset-password-confirm'},
    {path: '/activate/:uid/:token', component: ActivationPage, name: 'activate'},
    {path: '/about', component: AboutMePage, name: 'about'},
    {
        path: '/profile',
        component: ProfilePage,
        name: 'profile',
        children: [
            {
                path: 'memberships',
                components: {default: Memberships, mob_membership: Memberships},
                name: 'my-memberships'
            },
            {
                path: 'schedule',
                components: {default: Schedule, mob_schedule: Schedule},
                name: 'my-schedule'
            },
            {
                path: 'my-nutrition-balance',
                components: {default: MyNutritionBalance, mob_my_nutrition_balance: MyNutritionBalance},
                name: 'my-nutrition-balance'
            },
            {
                path: 'purchase-history',
                components: {default: PurchaseHistory, mob_purchase_history: PurchaseHistory},
                name: 'purchase-history'
            },
            {
                path: 'settings',
                components: {default: Settings, mob_settings: Settings},
                name: 'settings'
            },
        ]
    },
]

export const router = createRouter(
    {history: createWebHistory(), routes},
)