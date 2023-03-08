import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import MembershipPage from "@/views/profile-pages/MembershipPage.vue";
import SchedulePage from "@/views/profile-pages/SchedulePage.vue";
import MyNutritionBalance from "@/views/profile-pages/MyNutritionBalancePage.vue";
import PurchaseHistoryPage from "@/views/profile-pages/PurchaseHistoryPage.vue";
import SettingsPage from "@/views/profile-pages/SettingsPage.vue";

const routes = [
    {path: '/', component: HomePage, name: 'home'},
    {path: '/login', component: LoginPage, name: 'login'},
    {path: '/registration', component: RegistrationPage, name: 'registration'},
    {
        path: '/profile', component: ProfilePage, name: 'profile', children: [
            {path: 'memberships', component: MembershipPage, name: 'memberships'},
            {path: 'schedule', component: SchedulePage, name: 'schedule'},
            {path: 'my-nutrition-balance', component: MyNutritionBalance, name: 'my-nutrition-balance'},
            {path: 'purchase-history', component: PurchaseHistoryPage, name: 'purchase-history'},
            {path: 'settings', component: SettingsPage, name: 'settings'},
        ]
    },
]

export const router = createRouter(
    {history: createWebHistory(), routes},
)