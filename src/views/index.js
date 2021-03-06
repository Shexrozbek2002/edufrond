import Dashboard from './pages/Dashboard';
// import Buttons from './elements/Buttons';
// import Alerts from './elements/Alerts';
// import Grid from './elements/Grid';
// import Typography from './elements/Typography';
// import Cards from './elements/Cards';
// import Tabs from './elements/Tabs';
// import Tables from './elements/Tables';
// import Breadcrumbs from './elements/Breadcrumbs';
// import Forms from './elements/Forms';
// import Loaders from './elements/Loaders';
// import Avatars from './elements/Avatars';
// import Invoice from './pages/Invoice';
// import Analytics from './pages/Analytics';
// import CmsPage from './pages/Cms';
// import Widgets from './pages/Widgets';
// import BlankPage from './pages/BlankPage';
// import SubNav from './pages/SubNav';
// import Feed from './pages/Feed';
// import Modals from './elements/Modals';
// import ProgressBars from './elements/ProgressBars';
// import PaginationPage from './elements/Pagination';
// import ErrorPage from './pages/404';
// import Calculator from './pages/calculation/Calculator';
// import Results from './pages/results/Results';
// import Sample from './pages/results/Sample';
// import ChangePassword from './pages/account/ChangePassword';
//import InstitutionForm from './pages/InstitutionForm/InstitutionForm';
import Pests from './pages/Pests/Pests'
import Pest from './pages/Pests/Pest';
import EditPest from './pages/Pests/EditPest';
import NewTable from './pages/NewTable/NewTable';
 import NewInstitutionFormTeleg from './pages/InstitutionForm/NewInstitutionFormTeleg';
 import InstitutionFormNew from './pages/InstitutionForm/InstitutionFormNew';
 import NewEditPest from './pages/Pests/NewEditPest'
//import InstitutionForm from './pages/InstitutionForm/InstitutionForm';
//import InstitutionForm from './pages/InstitutionForm/InstitutionForm';

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Асосий',
    path: '/home',
    component: Dashboard,
  },
  // {
  //   name: 'Агрокимё калкулятори',
  //   path: '/calculator',
  //   component: Calculator,
  // },
  // {
  //   name: 'Натижалар',
  //   path: '/results',
  //   exact: true,
  //   component: Results,
  // },
  // {
  //   name: 'Натижалар',
  //   path: '/results/:sampleId',
  //   exact: true,
  //   component: Sample,
  // // },
  // {
  //   name: 'Шахсий кабинет',
  //   path: '/account',
  //   exact: true,
  //   component: ChangePassword,
  // },
  {
    name: 'Маълумот киритиш',
    path: '/center',
    exact: true,
    component: InstitutionFormNew,
  },
  {
    name: 'Зарарли организмлар',
    path: '/pests',
    exact: true,
    component: Pests,
  },
  {
    name: 'Зарарли организм',
    path: '/pests/:pestId',
    exact: true,
    component: Pest,
  },
  {
    name: 'Маълумот ўзгартириш',
    path: '/edit/:pestId',
    exact: true,
    component: NewEditPest,
  },
  {
    name: 'Рейтинг дафтарчаси',
    path: '/newtable',
    exact: true,
    component: NewTable,
  },
  // {
  //   name: 'Buttons',
  //   path: '/elements/buttons',
  //   component: Buttons,
  // },
  // {
  //   name: 'Alerts',
  //   path: '/elements/alerts',
  //   component: Alerts,
  // },
  // {
  //   name: 'Grid',
  //   path: '/elements/grid',
  //   component: Grid,
  // },
  // {
  //   name: 'Typography',
  //   path: '/elements/typography',
  //   component: Typography,
  // },
  // {
  //   name: 'Cards',
  //   path: '/elements/cards',
  //   component: Cards,
  // },
  // {
  //   name: 'Tabs',
  //   path: '/elements/tabs',
  //   component: Tabs,
  // },
  // {
  //   name: 'Tables',
  //   path: '/elements/tables',
  //   component: Tables,
  // },
  // {
  //   name: 'Progress Bars',
  //   path: '/elements/progressbars',
  //   component: ProgressBars,
  // },
  // {
  //   name: 'Pagination',
  //   path: '/elements/pagination',
  //   component: PaginationPage,
  // },
  // {
  //   name: 'Modals',
  //   path: '/elements/modals',
  //   component: Modals,
  // },
  // {
  //   name: 'Breadcrumbs',
  //   path: '/elements/breadcrumbs',
  //   component: Breadcrumbs,
  // },
  // {
  //   name: 'Forms',
  //   path: '/elements/forms',
  //   component: Forms,
  // },
  // {
  //   name: 'Loaders',
  //   path: '/elements/loaders',
  //   component: Loaders,
  // },
  // {
  //   name: 'Avatars',
  //   path: '/elements/avatars',
  //   component: Avatars,
  // },
  // {
  //   name: 'Blank',
  //   path: '/pages/blank',
  //   component: BlankPage,
  // },
  // {
  //   name: 'Sub Navigation',
  //   path: '/pages/subnav',
  //   component: SubNav,
  // },
  // {
  //   name: '404',
  //   path: '/pages/404',
  //   component: ErrorPage,
  // },
  // {
  //   name: 'Analytics',
  //   path: '/apps/analytics',
  //   component: Analytics,
  // },
  // {
  //   name: 'Activity Feed',
  //   path: '/apps/feed',
  //   component: Feed,
  // },
  // {
  //   name: 'Invoice',
  //   path: '/apps/invoice',
  //   component: Invoice,
  // },
  // {
  //   name: 'CMS',
  //   path: '/apps/cms',
  //   component: CmsPage,
  // },
  // {
  //   name: 'Widgets',
  //   path: '/widgets',
  //   component: Widgets,
  // },
];

export default pageList;
