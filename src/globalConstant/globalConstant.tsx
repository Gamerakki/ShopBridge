
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
// for login
export const baseUrl: string = 'https://reqres.in/api/';
//for products
export const productBaseUrl: string = 'https://fakestoreapi.com/';
const Routes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    component: Dashboard
  },
    {
      path: '/productlist',
      sidebarName: 'Product',
      component: Product
    },
   
  ];
  
  export default Routes;