import {
    createRouter,
    createWebHistory
} from 'vue-router';

import HomePage from './pages/HomePage.vue'
import Login from './components/Login.vue';
import EditFlower from './components/EditFlower.vue';
import AddPromo from './components/AddPromo.vue';
import BasketPage from './pages/BasketPage.vue';
import EditPage from './pages/EditPage.vue';
import FlowerPage from './pages/FlowerPage.vue';
import OrderPage from './pages/OrderPage.vue';
import AddPage from './pages/AddPage.vue';
import FlowerInBox from './pages/FlowerInBox.vue';
import FlowerInVase from './pages/FlowerInVase.vue';
import Zima from './pages/Zima.vue';
import Leto from './pages/Leto.vue';
import Osen from './pages/Osen.vue';
import Vesna from './pages/Vesna.vue';
import Happy from './pages/Happy.vue';
import Comnata from './pages/Comnata.vue';
import Mama from './pages/Mama.vue';
import Valentina from './pages/Valentina.vue';
import Mart from './pages/Mart.vue';
import CategoryPage from './pages/CategoryPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            name: '/',
            component: HomePage,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/flowerInbox',
            name: 'flowerInbox',
            component: FlowerInBox,
        },
        {
            path: '/flowervase',
            name: 'flowervase',
            component: FlowerInVase,
        },
        {
            path: '/zima',
            name: 'zima',
            component: Zima,
        },
        {
            path: '/happy',
            name: 'happy',
            component: Happy,
        },
        {
            path: '/Leto',
            name: 'Leto',
            component: Leto,
        },
        {
            path: '/Vesna',
            name: 'Vesna',
            component: Vesna,
        },
        {
            path: '/Osen',
            name: 'Osen',
            component: Osen,
        },


        {
            path: '/Mama',
            name: 'Mama',
            component: Mama,
        },
        {
            path: '/Mart',
            name: 'Mart',
            component: Mart,
        },
        {
            path: '/Comnata',
            name: 'Comnata',
            component: Comnata,
        },
        {
            path: '/Valentina',
            name: 'Valentina',
            component: Valentina,
        },
        {
            path: '/category',
            name: 'category',
            component: CategoryPage,
        },
        {
            path: '/order',
            name: 'order',
            component: OrderPage,
        },
        {
            path: '/add',
            name: 'add',
            component: AddPage,
        },
        {
            path: '/edit-flower/:id',
            name: 'edit-flower/:id',
            component: EditFlower,
        },
        {
            path: '/basket',
            name: 'basket',
            component: BasketPage,
        },
        {
            path: '/edit',
            name: 'edit',
            component: EditPage,
        },
        {
            path: '/AddPromo',
            name: 'AddPromo',
            component: AddPromo,
        },
        {
            path: '/flower-page/:id',
            name: 'flower-page',
            component: FlowerPage,
        }
    ]
})

export default router;